import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaArrowRight,
  FaFlag,
  FaRedo,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useQuiz } from "../hooks/useQuiz";
import { useLanguage } from "../context/LanguageContext";
import MiniProgress from "../components/MiniProgress";
import styles from "./QuizPage.module.css";

const QuizPage = () => {
  const navigate = useNavigate();

  const handleQuizComplete = (result) => {
    console.log("🚀 Callback navigasi dipanggil dengan result:", result);
    navigate("/result", {
      state: { result: result },
      replace: true,
    });
  };

  const quiz = useQuiz(handleQuizComplete);
  const { t } = useLanguage();
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    return () => {
      if (quiz.quizStarted && !quiz.quizFinished && quiz.questions.length > 0) {
        console.log("💾 Menyimpan state sebelum pindah halaman");

        import("../utils/storage").then(({ storage }) => {
          storage.updateQuizState({
            questions: quiz.questions,
            currentIndex: quiz.currentIndex,
            answers: quiz.answers,
            timeLeft: quiz.timer.timeLeft,
            timestamp: Date.now(),
          });
        });
      }
    };
  }, [
    quiz.quizStarted,
    quiz.quizFinished,
    quiz.questions,
    quiz.currentIndex,
    quiz.answers,
    quiz.timer.timeLeft,
  ]);
  useEffect(() => {
    console.log("🔍 COMPONENT MOUNT - Memeriksa saved state");

    const savedRaw = localStorage.getItem("quizapp_quiz_state");
    console.log("📦 Raw localStorage:", savedRaw);

    if (savedRaw) {
      try {
        const savedData = JSON.parse(savedRaw);
        console.log("📊 Parsed saved data:", savedData);

        const hasValidState =
          savedData.questions &&
          savedData.questions.length > 0 &&
          savedData.expiresAt > Date.now();

        if (hasValidState && !quiz.quizStarted && !quiz.quizFinished) {
          console.log("✅ MENAMPILKAN MODAL RESUME");
          setShowResumeModal(true);
        }
      } catch (e) {
        console.error("❌ Error parsing saved state:", e);
      }
    }

    setInitialCheckDone(true);
  }, []);

  useEffect(() => {
    if (!initialCheckDone) return;

    const hasSaved = quiz.checkSavedState();

    if (
      hasSaved &&
      !quiz.quizStarted &&
      !quiz.quizFinished &&
      !showResumeModal
    ) {
      setShowResumeModal(true);
    }
  }, [
    initialCheckDone,
    quiz.quizStarted,
    quiz.quizFinished,
    quiz.hasSavedState,
  ]);

  useEffect(() => {
    if (quiz.timer.timeLeft === 0 && quiz.quizStarted) {
      console.log("⏰ Timer habis, menyelesaikan quiz...");
      quiz.finishQuiz();
    }
  }, [quiz.timer.timeLeft, quiz.quizStarted, quiz]);

  const handleResume = () => {
    console.log("🔄 Mencoba melanjutkan quiz...");
    const success = quiz.resumeQuiz();
    if (success) {
      console.log("✅ Quiz berhasil dilanjutkan");
      setShowResumeModal(false);
    } else {
      console.log("❌ Gagal melanjutkan quiz");
      quiz.clearSavedState();
      setShowResumeModal(false);
    }
  };

  const handleStartNew = () => {
    console.log("🆕 Memulai quiz baru");
    setShowResumeModal(false);
    quiz.clearSavedState();
    quiz.resetQuiz();
    setTimeout(() => {
      quiz.startQuiz();
    }, 300);
  };

  const handleFinishQuiz = () => {
    console.log("🏁 Manual finish dipanggil");
    quiz.finishQuiz();
  };

  const handleRetry = () => {
    quiz.resetQuiz();
    setTimeout(() => {
      quiz.startQuiz();
    }, 500);
  };

  const handleSelectAnswer = (questionId, option) => {
    quiz.selectAnswer(questionId, option);

    if (quiz.isLastQuestion()) {
      setTimeout(() => {
        if (quiz.answers[questionId] !== undefined) {
          quiz.finishQuiz();
        } else {
          quiz.selectAnswer(questionId, option);
          setTimeout(() => {
            quiz.finishQuiz();
          }, 500);
        }
      }, 1000);
    } else {
      setTimeout(() => {
        quiz.nextQuestion();
      }, 500);
    }
  };

  if (quiz.loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <h2 className={styles.loadingTitle}>{t("loadingWorld")}</h2>
        <p className={styles.loadingSubtitle}>{t("miningQuestions")}</p>
        <div className={styles.miningAnimation}>
          <span className={styles.miningEmoji}>🪵</span>
          <span className={styles.miningEmoji}>🌿</span>
          <span className={styles.miningEmoji}>🪨</span>
        </div>
      </div>
    );
  }

  if (quiz.error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIconMinecraft}>⛏️</div>
          <h2 className={styles.errorTitle}>{t("minecraftError")}</h2>

          <div className={styles.errorMessage}>
            <FaExclamationTriangle className={styles.errorIcon} />
            <p>{quiz.error}</p>
          </div>

          <div className={styles.errorActions}>
            <button onClick={handleRetry} className={styles.retryButton}>
              <FaRedo /> {t("tryAgain")}
            </button>
            <button onClick={() => navigate("/")} className={styles.homeButton}>
              🏠 {t("backToHome")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz.quizStarted && !quiz.loading && !quiz.error) {
    return (
      <div className={styles.setupContainer}>
        <div className={styles.setupCard}>
          <div className={styles.setupIcon}>🌱</div>
          <h1 className={styles.setupTitle}>{t("readyForAdventure")}</h1>
          <p className={styles.setupDescription}>
            {t("exploreKnowledge")} {quiz.quizConfig.amount || 5}{" "}
            {t("knowledgeRooms")} ⚔️
          </p>

          <div className={styles.setupOptions}>
            <div className={styles.setupOption}>
              <label htmlFor="amountSelect">{t("numberOfQuestions")}</label>
              <select
                id="amountSelect"
                name="amount"
                value={quiz.quizConfig.amount}
                onChange={(e) =>
                  quiz.updateConfig({ amount: parseInt(e.target.value) })
                }
                className={styles.setupSelect}
              >
                <option value="5">5 {t("questions")} 🌱</option>
                <option value="10">10 {t("questions")} 🌿</option>
                <option value="15">15 {t("questions")} 🌳</option>
              </select>
            </div>

            <div className={styles.setupOption}>
              <label htmlFor="difficultySelect">{t("difficultyLevel")}</label>
              <select
                id="difficultySelect"
                name="difficulty"
                value={quiz.quizConfig.difficulty}
                onChange={(e) =>
                  quiz.updateConfig({ difficulty: e.target.value })
                }
                className={styles.setupSelect}
              >
                <option value="">{t("allLevels")} 🎮</option>
                <option value="easy">{t("easy")} ⭐</option>
                <option value="medium">{t("medium")} ⭐⭐</option>
                <option value="hard">{t("hard")} ⭐⭐⭐</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => quiz.startQuiz()}
            className={styles.startButton}
          >
            ⚔️ {t("startAdventure")}
          </button>
        </div>
      </div>
    );
  }

  if (!quiz.currentQuestion) {
    return null;
  }

  const currentQ = quiz.currentQuestion;
  const isAnswered = quiz.answers[quiz.currentIndex] !== undefined;
  const selectedAnswer = quiz.answers[quiz.currentIndex];

  return (
    <div className={styles.quizContainer}>
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <FaClock className={styles.modalIcon} />
              <h2 className={styles.modalTitle}>{t("continueAdventure")}</h2>
              <p className={styles.modalDescription}>
                {t("unfinishedDungeon")}
              </p>
              <div className={styles.modalActions}>
                <button onClick={handleResume} className={styles.resumeButton}>
                  ⚔️ {t("continue")}
                </button>
                <button onClick={handleStartNew} className={styles.newButton}>
                  🆕 {t("newGame")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.quizHeader}>
        <div className={styles.quizInfo}>
          <div className={styles.questionCount}>
            <span className={styles.currentCount}>{quiz.currentIndex + 1}</span>
            <span className={styles.totalCount}>/{quiz.questions.length}</span>
          </div>

          <div className={styles.timerContainer}>
            <div className={styles.timerWrapper}>
              <FaClock
                className={`${styles.timerIcon} ${styles[quiz.timer.status]}`}
              />
              <span
                className={`${styles.timerText} ${styles[quiz.timer.status]}`}
              >
                {quiz.timer.formattedTime}
              </span>
            </div>
            <div className={styles.timerProgress}>
              <div
                className={`${styles.timerProgressFill} ${styles[quiz.timer.status]}`}
                style={{ width: quiz.timer.progress + "%" }}
              ></div>
            </div>
          </div>
        </div>

        <button
          onClick={handleFinishQuiz}
          className={styles.flagButton}
          title={t("finishQuiz")}
        >
          <FaFlag />
        </button>
      </div>

      <MiniProgress
        current={quiz.currentIndex + 1}
        total={quiz.questions.length}
        answered={Object.keys(quiz.answers).map(Number)}
        timeLeft={quiz.timer.timeLeft}
      />

      <motion.div
        className={styles.questionCard}
        key={quiz.currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.questionHeader}>
          <span className={styles.questionBadge}>
            🎯 {t("question")} {quiz.currentIndex + 1}
          </span>
          {currentQ.difficulty && (
            <span
              className={`${styles.difficultyBadge} ${styles[currentQ.difficulty]}`}
            >
              {currentQ.difficulty === "easy"
                ? t("easy")
                : currentQ.difficulty === "medium"
                  ? t("medium")
                  : t("hard")}
            </span>
          )}
        </div>

        <h2 className={styles.questionText}>{currentQ.question}</h2>

        <div className={styles.optionsContainer}>
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQ.correctAnswer;

            let optionClass = styles.option;
            if (isAnswered) {
              if (isSelected && isCorrect)
                optionClass = `${styles.option} ${styles.correct}`;
              else if (isSelected && !isCorrect)
                optionClass = `${styles.option} ${styles.incorrect}`;
              else if (isCorrect)
                optionClass = `${styles.option} ${styles.correctAnswer}`;
            } else {
              if (isSelected)
                optionClass = `${styles.option} ${styles.selected}`;
            }

            return (
              <motion.button
                key={index}
                className={optionClass}
                onClick={() => handleSelectAnswer(quiz.currentIndex, option)}
                disabled={isAnswered}
                whileHover={!isAnswered ? { y: 4 } : {}}
                whileTap={!isAnswered ? { y: 8 } : {}}
              >
                <span className={styles.optionLabel}>
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className={styles.optionText}>{option}</span>
                {isAnswered && isCorrect && (
                  <FaCheckCircle className={styles.optionIconCorrect} />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <FaTimesCircle className={styles.optionIconIncorrect} />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <div className={styles.navigation}>
        <button
          onClick={quiz.prevQuestion}
          disabled={quiz.isFirstQuestion()}
          className={`${styles.navButton} ${styles.prevButton}`}
        >
          <FaArrowLeft /> {t("previous")}
        </button>

        <div className={styles.progressIndicator}>
          {quiz.questions.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressDot} ${
                index === quiz.currentIndex ? styles.active : ""
              } ${quiz.answers[index] ? styles.answered : ""}`}
              onClick={() => {
                if (index !== quiz.currentIndex) {
                  quiz.setCurrentIndex(index);
                }
              }}
            />
          ))}
        </div>

        {quiz.isLastQuestion() ? (
          <button
            onClick={() => {
              console.log("🏁 Tombol Selesai diklik");
              quiz.finishQuiz();
            }}
            className={`${styles.navButton} ${styles.finishButton}`}
          >
            {t("finish")} <FaFlag />
          </button>
        ) : (
          <button
            onClick={quiz.nextQuestion}
            className={`${styles.navButton} ${styles.nextButton}`}
          >
            {t("next")} <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
