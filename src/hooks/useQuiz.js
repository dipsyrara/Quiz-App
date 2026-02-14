import { useState, useEffect, useCallback, useRef } from "react";
import quizService from "../services/quizService";
import storage from "../utils/storage";

export const useQuiz = (onQuizComplete) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizConfig, setQuizConfig] = useState({
    amount: 5,
    category: "",
    difficulty: "",
    type: "",
  });
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [hasSavedState, setHasSavedState] = useState(false);

  // TIMER SUPER SEDERHANA
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);

  // EFFECT UNTUK TIMER - INI YANG AKTIF
  useEffect(() => {
    console.log(
      "🔥 useEffect timer dipanggil, timerActive:",
      timerActive,
      "timeLeft:",
      timeLeft,
    );

    if (!timerActive) {
      console.log("⏸️ Timer tidak aktif");
      return;
    }

    if (timeLeft <= 0) {
      console.log("⏰ Timer sudah habis");
      setTimerActive(false);
      return;
    }

    console.log("▶️ Membuat interval baru");
    const interval = setInterval(() => {
      console.log("⏱️ Interval jalan, timeLeft saat ini:", timeLeft);
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        console.log("⏱️ TimeLeft baru:", newTime);

        if (newTime <= 0) {
          console.log("⏰ Timer habis!");
          clearInterval(interval);
          setTimerActive(false);

          const result = {
            total: questions.length,
            correct: 0,
            incorrect: 0,
            unanswered: 0,
            score: 0,
            timeSpent: 300 - 0,
            date: new Date().toISOString(),
          };

          setQuizFinished(true);
          setQuizStarted(false);
          setQuizResult(result);

          storage.saveQuizResult({
            ...result,
            timeUp: true,
          });

          storage.clearQuizState();
          setHasSavedState(false);

          if (onQuizComplete) {
            onQuizComplete(result);
          }

          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => {
      console.log("🧹 Cleanup interval");
      clearInterval(interval);
    };
  }, [timerActive]);
  const answersRef = useRef({});

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const fetchQuestions = useCallback(
    async (config = null) => {
      setLoading(true);
      setError(null);

      try {
        const finalConfig = config || quizConfig;
        const data = await quizService.getQuestions(
          finalConfig.amount,
          finalConfig.category,
          finalConfig.difficulty,
          finalConfig.type,
        );

        if (!data || data.length === 0) {
          throw new Error("Tidak ada soal yang diterima dari server");
        }

        const processedQuestions = data.map((q, index) => ({
          id: index,
          question: quizService.decodeHtml(q.question),
          correctAnswer: quizService.decodeHtml(q.correct_answer),
          incorrectAnswers: q.incorrect_answers.map((a) =>
            quizService.decodeHtml(a),
          ),
          options: quizService.formatOptions(
            quizService.decodeHtml(q.correct_answer),
            q.incorrect_answers.map((a) => quizService.decodeHtml(a)),
          ),
          category: q.category,
          difficulty: q.difficulty || "medium",
          type: q.type,
        }));

        setQuestions(processedQuestions);
        return processedQuestions;
      } catch (err) {
        console.error("Error fetching questions:", err);
        let errorMessage = "Gagal memuat soal. ";

        if (err.message.includes("429")) {
          errorMessage +=
            "Terlalu banyak request. Tunggu 5 detik dan coba lagi! ⏳";
        } else {
          errorMessage += err.message || "Coba lagi nanti!";
        }

        setError(errorMessage);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [quizConfig],
  );

  const startQuiz = useCallback(
    async (config = null) => {
      const questionsData = await fetchQuestions(config);

      if (questionsData.length > 0) {
        answersRef.current = {};

        setQuizStarted(true);
        setQuizFinished(false);
        setQuizResult(null);
        setCurrentIndex(0);
        setAnswers({});
        setSelectedOption(null);
        setHasSavedState(false);

        console.log("🚀 startQuiz: reset timer ke 300 dan aktifkan");
        setTimeLeft(300);
        setTimerActive(true);

        storage.saveQuizState({
          questions: questionsData,
          currentIndex: 0,
          answers: {},
          timeLeft: 300,
          config: config || quizConfig,
          timestamp: Date.now(),
        });
      }
    },
    [fetchQuestions, quizConfig],
  );

  const resumeQuiz = useCallback(() => {
    console.log("🔄 Mencoba resume quiz...");
    const savedState = storage.loadQuizState();

    if (savedState && savedState.questions && savedState.questions.length > 0) {
      console.log("✅ Ditemukan saved state, melanjutkan quiz");

      setQuestions(savedState.questions);
      setCurrentIndex(savedState.currentIndex || 0);
      setAnswers(savedState.answers || {});
      answersRef.current = savedState.answers || {};
      setQuizStarted(true);
      setQuizFinished(false);
      setQuizResult(null);
      setHasSavedState(true);

      if (savedState.timeLeft) {
        console.log(`⏰ Set timer ke ${savedState.timeLeft} detik`);
        setTimeLeft(savedState.timeLeft);
      }

      console.log("▶️ resumeQuiz: aktifkan timer");
      setTimerActive(true);

      return true;
    }
    console.log("❌ Tidak ada saved state yang valid");
    return false;
  }, []);

  const checkSavedState = useCallback(() => {
    try {
      const saved = localStorage.getItem("quizapp_quiz_state");

      if (!saved) {
        setHasSavedState(false);
        return false;
      }

      const data = JSON.parse(saved);

      const isValid =
        data.questions &&
        data.questions.length > 0 &&
        data.expiresAt > Date.now();

      setHasSavedState(isValid);
      return isValid;
    } catch (error) {
      console.error("❌ Error cek saved state:", error);
      setHasSavedState(false);
      return false;
    }
  }, []);

  const clearSavedState = useCallback(() => {
    storage.clearQuizState();
    setHasSavedState(false);
    console.log("🗑️ Saved state dihapus");
  }, []);

  const selectAnswer = useCallback(
    (questionId, answer) => {
      console.log(`📝 Menjawab soal INDEX ${questionId}: ${answer}`);

      setSelectedOption(answer);

      setAnswers((prev) => {
        const newAnswers = {
          ...prev,
          [questionId]: answer,
        };

        answersRef.current = newAnswers;

        storage.updateQuizState({
          answers: newAnswers,
          timeLeft: timeLeft,
          currentIndex: currentIndex,
        });

        return newAnswers;
      });
    },
    [timeLeft, currentIndex],
  );

  const nextQuestion = useCallback(() => {
    setSelectedOption(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => {
        const newIndex = prev + 1;

        storage.updateQuizState({
          currentIndex: newIndex,
          timeLeft: timeLeft,
          answers: answersRef.current,
        });

        return newIndex;
      });
    }
  }, [currentIndex, questions.length, timeLeft]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedOption(answersRef.current[currentIndex - 1] || null);
      setCurrentIndex((prev) => {
        const newIndex = prev - 1;

        storage.updateQuizState({
          currentIndex: newIndex,
          timeLeft: timeLeft,
          answers: answersRef.current,
        });

        return newIndex;
      });
    }
  }, [currentIndex, timeLeft]);

  const calculateResult = useCallback(() => {
    const currentAnswers = answersRef.current;

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const userAnswer = currentAnswers[i];

      if (userAnswer === undefined || userAnswer === null) {
        unanswered++;
      } else if (userAnswer === q.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    }

    const total = questions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const timeSpent = 300 - timeLeft;

    return {
      total,
      correct,
      incorrect,
      unanswered,
      score,
      timeSpent: timeSpent > 0 ? timeSpent : 0,
      date: new Date().toISOString(),
    };
  }, [questions, timeLeft]);

  const finishQuiz = useCallback(() => {
    console.log("🏁 Menyelesaikan quiz...");

    setTimerActive(false);
    const result = calculateResult();

    setQuizFinished(true);
    setQuizStarted(false);
    setQuizResult(result);

    storage.saveQuizResult(result);
    storage.clearQuizState();
    setHasSavedState(false);

    if (onQuizComplete) {
      onQuizComplete(result);
    }

    return result;
  }, [calculateResult, onQuizComplete]);

  const handleTimeUp = useCallback(() => {
    console.log("⏰ Waktu habis!");
    finishQuiz();
  }, [finishQuiz]);

  const getCurrentQuestion = useCallback(() => {
    return questions[currentIndex] || null;
  }, [questions, currentIndex]);

  const hasAnswer = useCallback((questionId) => {
    return answersRef.current[questionId] !== undefined;
  }, []);

  const isLastQuestion = useCallback(() => {
    return currentIndex === questions.length - 1;
  }, [currentIndex, questions.length]);

  const isFirstQuestion = useCallback(() => {
    return currentIndex === 0;
  }, [currentIndex]);

  const updateConfig = useCallback((newConfig) => {
    setQuizConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    answersRef.current = {};
    setSelectedOption(null);
    setQuizStarted(false);
    setQuizFinished(false);
    setQuizResult(null);
    setError(null);
    setHasSavedState(false);
    setTimerActive(false);
    setTimeLeft(300);
    storage.clearQuizState();
    console.log("🔄 Quiz direset");
  }, []);

  const setCurrentIndexManually = useCallback(
    (index) => {
      if (index >= 0 && index < questions.length) {
        setCurrentIndex(index);
        setSelectedOption(answersRef.current[index] || null);

        storage.updateQuizState({
          currentIndex: index,
          timeLeft: timeLeft,
          answers: answersRef.current,
        });
      }
    },
    [questions.length, timeLeft],
  );

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins + ":" + secs.toString().padStart(2, "0");
  };

  return {
    questions,
    currentIndex,
    currentQuestion: getCurrentQuestion(),
    answers: answersRef.current,
    selectedOption,
    loading,
    error,
    quizConfig,
    quizStarted,
    quizFinished,
    quizResult,
    hasSavedState,
    timer: {
      timeLeft,
      formattedTime: formatTime(timeLeft),
      progress: (timeLeft / 300) * 100,
      status:
        timeLeft <= 60 ? "danger" : timeLeft <= 120 ? "warning" : "normal",
      isActive: timerActive,
      pause: () => {
        console.log("⏸️ Manual pause");
        setTimerActive(false);
      },
      start: () => {
        console.log("▶️ Manual start");
        setTimerActive(true);
      },
      setTime: (newTime) => {
        console.log("🎯 Manual set time:", newTime);
        setTimeLeft(newTime);
      },
    },
    fetchQuestions,
    startQuiz,
    resumeQuiz,
    checkSavedState,
    clearSavedState,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    finishQuiz,
    resetQuiz,
    updateConfig,
    getCurrentQuestion,
    hasAnswer,
    isLastQuestion,
    isFirstQuestion,
    calculateResult,
    setCurrentIndex: setCurrentIndexManually,
  };
};

export default useQuiz;
