import React, { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  id: {
    // Global
    appName: "QuizApp",
    loading: "Memuat...",
    save: "Simpan",
    cancel: "Batal",
    edit: "Ubah",
    delete: "Hapus",

    // Header
    home: "Beranda",
    dashboard: "Dashboard",
    quiz: "Quiz",
    profile: "Profil",
    login: "Masuk",
    register: "Daftar",
    logout: "Keluar",

    // Login & Register Page
    welcomeBack: "Selamat Datang Kembali!",
    loginToContinue: "Masuk untuk melanjutkan quiz",
    emailPasswordRequired: "Email dan password wajib diisi",
    loggingIn: "Memasuki...",
    noAccount: "Belum punya akun?",
    registerFree: "Daftar gratis",
    readyForQuiz: "Sudah siap uji pengetahuanmu hari ini?",
    allFieldsRequired: "Semua field wajib diisi",
    passwordMinLength: "Password minimal 6 karakter",
    passwordMismatch: "Konfirmasi password tidak cocok",
    registerSuccess: "Registrasi berhasil! Silakan login dengan akun Anda.",
    usernamePlaceholder: "Masukkan username",
    emailPlaceholder: "Masukkan email",
    passwordMinLengthLabel: "PASSWORD (MINIMAL 6 KARAKTER)",
    confirmPassword: "KONFIRMASI PASSWORD",
    registering: "Mendaftar...",
    haveAccount: "Sudah punya akun?",
    loginHere: "Login di sini",

    // Landing Page
    testYourKnowledge: "Uji Pengetahuanmu",
    getStarted: "Mulai Sekarang",
    trustedBy: "Dipercaya 15.000+ pembelajar aktif",
    startFreeQuiz: "Mulai Kuis Gratis",
    tryTour: "Coba Tour Interaktif",
    powerfulFeatures: "Fitur Hebat",
    everythingYouNeed: "Semua yang Kamu Butuhkan untuk Kuasai Subjek Apapun",
    realTimeQuiz: "Kuis Real-time",
    realTimeDesc: "Kuis interaktif dengan feedback instan.",
    smartTimer: "Timer Cerdas",
    smartTimerDesc: "Sistem timer yang dapat disesuaikan.",
    detailedAnalytics: "Analisis Detail",
    detailedAnalyticsDesc: "Analisis mendalam tentang performamu.",
    achievements: "Pencapaian",
    achievementsDesc: "Dapatkan badge dan reward eksklusif.",
    howItWorks: "Cara Kerja",
    startInMinutes: "Mulai dalam Menit",
    masterInHours: "Kuasai dalam Jam",
    createAccount: "Buat Akun",
    createAccountDesc: "Daftar dalam 30 detik dengan username.",
    customizeQuiz: "Atur Quiz",
    customizeQuizDesc: "Pilih kategori dan tingkat kesulitan.",
    startQuiz: "Mulai Quiz",
    startQuizDesc: "Jawab soal-soal dengan timer.",
    getResults: "Lihat Hasil",
    getResultsDesc: "Lihat skor dan analisis performa.",

    // Minecraft Landing
    craftYourKnowledge: "Craft Pengetahuanmu",
    startAdventure: "Mulai Petualangan",
    worldTour: "Tour Dunia",
    chooseWeapon: "Pilih Senjatamu",
    craftKnowledge: "Craft Pengetahuan, Taklukkan Quiz!",
    instantFeedback: "Feedback instan ⚡",
    setYourTime: "Atur waktumu ⏳",
    seeProgress: "Lihat progress 📈",
    collectBadges: "Koleksi badge 🎖️",

    // Quiz Page
    questions: "Soal",
    timeLeft: "Sisa Waktu",
    answered: "Terjawab",
    remaining: "Sisa",
    correct: "Benar",
    incorrect: "Salah",
    unanswered: "Tidak Dijawab",
    finishQuiz: "Selesaikan Quiz",
    next: "Selanjutnya",
    previous: "Sebelumnya",
    pause: "Jeda",
    resume: "Lanjutkan",
    startQuizTitle: "Siap Mulai Quiz?",
    startQuizDescription:
      "Kamu akan mengerjakan {amount} soal dengan waktu {time} menit.",
    numberOfQuestions: "Jumlah Soal",
    difficultyLevel: "Tingkat Kesulitan",
    allLevels: "Semua Level",
    easy: "Mudah",
    medium: "Sedang",
    hard: "Sulit",
    resumeQuiz: "Lanjutkan Quiz?",
    resumeQuizDesc: "Kamu memiliki quiz yang belum selesai. Ingin melanjutkan?",
    resumeButton: "Lanjutkan",
    newQuiz: "Mulai Baru",

    // Minecraft Quiz
    loadingWorld: "Memuat Dunia Quiz...",
    miningQuestions: "Menggali soal dari tambang pengetahuan",
    minecraftError: "Oops! Tambang Error!",
    backToHome: "Kembali ke Beranda",
    readyForAdventure: "Siap Memulai Petualangan?",
    exploreKnowledge: "Kamu akan menjelajahi",
    knowledgeRooms: "ruang pengetahuan",
    continueAdventure: "Lanjutkan Petualangan?",
    unfinishedDungeon: "Kamu memiliki dungeon yang belum diselesaikan! 🏰",
    continue: "Lanjutkan",
    newGame: "Game Baru",
    finish: "Selesai",
    question: "Soal",
    checkAnswers: "CEK JAWABAN",
    forceFinish: "PAKSA FINISH",
    answers: "Jawaban",
    none: "tidak ada",

    // Progress
    progressQuiz: "Progress Quiz",

    // Result Page
    yourScore: "Skormu",
    greatJob: "Kerja Bagus!",
    tryAgain: "Coba Lagi",
    backToDashboard: "Kembali ke Dashboard",
    share: "Bagikan",
    badgeEarned: "Badge yang Kamu Dapat",

    // Dashboard
    welcome: "Halo",
    startNewQuiz: "Quiz Baru!",
    totalQuizzes: "Total Quiz",
    averageScore: "Rata-rata",
    bestScore: "Terbaik",
    streak: "Streak",
    totalQuestions: "Total Soal",
    accuracy: "Akurasi",
    yourBadges: "Badge Koleksimu",
    quizHistory: "Riwayat Quiz",
    all: "Semua",
    today: "Hari ini",
    thisWeek: "Minggu ini",
    thisMonth: "Bulan ini",
    noHistory: "Belum ada riwayat quiz",
    noBadges: "Belum ada badge nih!",
    startQuizNow: "Mulai Quiz Sekarang",
    yesterday: "Kemarin",
    daysAgo: "hari lalu",
    locale: "id-ID",
    badge: "Badge",
    time: "Waktu",

    // Profile Page
    editProfile: "Ubah Profil",
    personalInfo: "Informasi Pribadi",
    username: "Nama Pengguna",
    email: "Email",
    bio: "Bio",
    bioPlaceholder: "Ceritakan sedikit tentang dirimu...",
    avatar: "Avatar",
    chooseAvatar: "Pilih Avatar",
    accountSettings: "Pengaturan Akun",
    language: "Bahasa",
    indonesian: "Indonesia",
    english: "English",
    timerDuration: "Durasi Timer",
    minutes: "menit",
    defaultDifficulty: "Kesulitan Default",
    soundEffects: "Efek Suara",
    darkMode: "Mode Gelap",
    saveChanges: "Simpan Perubahan",
    statistics: "Statistik",
    memberSince: "Member Sejak",
    totalQuizDone: "Total Quiz Dikerjakan",
    totalTimeSpent: "Total Waktu",
    hours: "jam",
    badgesEarned: "Badge Diperoleh",
    logoutConfirm: "Yakin ingin keluar?",
    logoutConfirmDesc: "Kamu bisa masuk lagi kapan saja!",
    yesLogout: "Ya, Keluar",

    // Badge Names
    badgeLegend: "LEGEND",
    badgeGenius: "GENIUS",
    badgePerfect: "PERFECT",
    badgeSpeedster: "SPEEDSTER",
    badgeMarathon: "MARATHON",
    badgeStreak: "STREAK MASTER",
    badgeRookie: "ROOKIE",
    badgeEnthusiast: "ENTHUSIAST",

    // Funny Messages
    geniusMsg: "🧠 LUAR BIASA! Otakmu kayak superkomputer!",
    happyMsg: "🎉 Hebat! Kamu beneran jago!",
    neutralMsg: "😊 Lumayan! Masih bisa ditingkatkan!",
    sadMsg: "🥺 Jangan sedih! Coba lagi ya!",
    cryingMsg: "😭 Yaaah... Gapapa! Yang penting udah coba!",
    streakMsg0: "Ayo mulai quiz pertamamu! 🎮",
    streakMsg1: "🔥 Semangat! {streak} hari berturut-turut!",
    streakMsg2: "⭐ Luar biasa! {streak} hari streak!",
    streakMsg3: "🏆 WOW! {streak} hari streak! Kamu hebat!",

    // Footer
    testChallenge: "Uji pengetahuan, taklukkan tantangan",
    features: "Fitur",
    company: "Company",
    about: "Tentang",
    contact: "Kontak",
    privacy: "Privasi",
    allRightsReserved: "All rights reserved.",
    madeWith: "Dibuat dengan",
    forDOT: "untuk DOT Indonesia",

    // Result Page
    legendary: "LEGENDARY",
    master: "MASTER",
    adventurer: "PETUALANG",
    beginner: "PEMULA",
    lootEarned: "Loot yang Kamu Dapat",
    diamond: "DIAMOND",
    emerald: "EMERALD",
    gold: "GOLD",
    perfect: "SEMpURNA",
    questComplete: "Quest selesai!",
    experience: "Experience",
    oopsDataLost: "Oops! Data Hilang!",
    resultLost: "Sepertinya hasil quizmu menghilang di dungeon... 🏰",
    redirectingDashboard: "Mengarahkan ke dashboard dalam",
    seconds: "detik",
  },

  en: {
    // Global
    appName: "QuizApp",
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",

    // Header
    home: "Home",
    dashboard: "Dashboard",
    quiz: "Quiz",
    profile: "Profile",
    login: "Login",
    register: "Register",
    logout: "Logout",

    // Login & Register Page
    welcomeBack: "Welcome Back!",
    loginToContinue: "Login to continue quiz",
    emailPasswordRequired: "Email and password are required",
    loggingIn: "Logging in...",
    noAccount: "Don't have an account?",
    registerFree: "Register for free",
    readyForQuiz: "Ready to test your knowledge today?",
    allFieldsRequired: "All fields are required",
    passwordMinLength: "Password must be at least 6 characters",
    passwordMismatch: "Passwords do not match",
    registerSuccess: "Registration successful! Please login with your account.",
    usernamePlaceholder: "Enter username",
    emailPlaceholder: "Enter email",
    passwordMinLengthLabel: "PASSWORD (MINIMUM 6 CHARACTERS)",
    confirmPassword: "CONFIRM PASSWORD",
    registering: "Registering...",
    haveAccount: "Already have an account?",
    loginHere: "Login here",

    // Landing Page
    testYourKnowledge: "Test Your Knowledge",
    getStarted: "Get Started",
    trustedBy: "Trusted by 15,000+ active learners",
    startFreeQuiz: "Start Free Quiz",
    tryTour: "Try Interactive Tour",
    powerfulFeatures: "Powerful Features",
    everythingYouNeed: "Everything You Need to Master Any Subject",
    realTimeQuiz: "Real-time Quiz",
    realTimeDesc: "Interactive quiz with instant feedback.",
    smartTimer: "Smart Timer",
    smartTimerDesc: "Customizable timer system.",
    detailedAnalytics: "Detailed Analytics",
    detailedAnalyticsDesc: "In-depth performance analysis.",
    achievements: "Achievements",
    achievementsDesc: "Get exclusive badges and rewards.",
    howItWorks: "How It Works",
    startInMinutes: "Start in Minutes",
    masterInHours: "Master in Hours",
    createAccount: "Create Account",
    createAccountDesc: "Register in 30 seconds with username.",
    customizeQuiz: "Customize Quiz",
    customizeQuizDesc: "Choose category and difficulty.",
    startQuiz: "Start Quiz",
    startQuizDesc: "Answer questions with timer.",
    getResults: "Get Results",
    getResultsDesc: "View score and performance analysis.",

    // Minecraft Landing
    craftYourKnowledge: "Craft Your Knowledge",
    startAdventure: "Start Adventure",
    worldTour: "World Tour",
    chooseWeapon: "Choose Your Weapon",
    craftKnowledge: "Craft Knowledge, Conquer Quiz!",
    instantFeedback: "Instant feedback ⚡",
    setYourTime: "Set your time ⏳",
    seeProgress: "See progress 📈",
    collectBadges: "Collect badges 🎖️",

    // Quiz Page
    questions: "Questions",
    timeLeft: "Time Left",
    answered: "Answered",
    remaining: "Remaining",
    correct: "Correct",
    incorrect: "Incorrect",
    unanswered: "Unanswered",
    finishQuiz: "Finish Quiz",
    next: "Next",
    previous: "Previous",
    pause: "Pause",
    resume: "Resume",
    startQuizTitle: "Ready to Start Quiz?",
    startQuizDescription:
      "You will answer {amount} questions with {time} minutes timer.",
    numberOfQuestions: "Number of Questions",
    difficultyLevel: "Difficulty Level",
    allLevels: "All Levels",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    resumeQuiz: "Resume Quiz?",
    resumeQuizDesc: "You have an unfinished quiz. Would you like to continue?",
    resumeButton: "Resume",
    newQuiz: "New Quiz",

    // Minecraft Quiz
    loadingWorld: "Loading Quiz World...",
    miningQuestions: "Mining questions from knowledge quarry",
    minecraftError: "Oops! Mining Error!",
    backToHome: "Back to Home",
    readyForAdventure: "Ready for Adventure?",
    exploreKnowledge: "You will explore",
    knowledgeRooms: "knowledge rooms",
    continueAdventure: "Continue Adventure?",
    unfinishedDungeon: "You have an unfinished dungeon! 🏰",
    continue: "Continue",
    newGame: "New Game",
    finish: "Finish",
    question: "Question",
    checkAnswers: "CHECK ANSWERS",
    forceFinish: "FORCE FINISH",
    answers: "Answers",
    none: "none",

    // Progress
    progressQuiz: "Quiz Progress",

    // Result Page
    yourScore: "Your Score",
    greatJob: "Great Job!",
    tryAgain: "Try Again",
    backToDashboard: "Back to Dashboard",
    share: "Share",
    badgeEarned: "Badges You Earned",

    // Dashboard
    welcome: "Hello",
    startNewQuiz: "New Quiz!",
    totalQuizzes: "Total Quizzes",
    averageScore: "Average",
    bestScore: "Best",
    streak: "Streak",
    totalQuestions: "Total Questions",
    accuracy: "Accuracy",
    yourBadges: "Your Badge Collection",
    quizHistory: "Quiz History",
    all: "All",
    today: "Today",
    thisWeek: "This Week",
    thisMonth: "This Month",
    noHistory: "No quiz history yet",
    noBadges: "No badges yet!",
    startQuizNow: "Start Quiz Now",
    yesterday: "Yesterday",
    daysAgo: "days ago",
    locale: "en-US",
    badge: "Badge",
    time: "Time",

    // Profile Page
    editProfile: "Edit Profile",
    personalInfo: "Personal Information",
    username: "Username",
    email: "Email",
    bio: "Bio",
    bioPlaceholder: "Tell something about yourself...",
    avatar: "Avatar",
    chooseAvatar: "Choose Avatar",
    accountSettings: "Account Settings",
    language: "Language",
    indonesian: "Indonesian",
    english: "English",
    timerDuration: "Timer Duration",
    minutes: "minutes",
    defaultDifficulty: "Default Difficulty",
    soundEffects: "Sound Effects",
    darkMode: "Dark Mode",
    saveChanges: "Save Changes",
    statistics: "Statistics",
    memberSince: "Member Since",
    totalQuizDone: "Total Quizzes Done",
    totalTimeSpent: "Total Time Spent",
    hours: "hours",
    badgesEarned: "Badges Earned",
    logoutConfirm: "Sure you want to logout?",
    logoutConfirmDesc: "You can login again anytime!",
    yesLogout: "Yes, Logout",

    // Badge Names
    badgeLegend: "LEGEND",
    badgeGenius: "GENIUS",
    badgePerfect: "PERFECT",
    badgeSpeedster: "SPEEDSTER",
    badgeMarathon: "MARATHON",
    badgeStreak: "STREAK MASTER",
    badgeRookie: "ROOKIE",
    badgeEnthusiast: "ENTHUSIAST",

    // Funny Messages
    geniusMsg: "🧠 AMAZING! Your brain is like a supercomputer!",
    happyMsg: "🎉 Great! You are really good at this!",
    neutralMsg: "😊 Not bad! Still can be improved!",
    sadMsg: "🥺 Dont be sad! Try again!",
    cryingMsg: "😭 Awww... Its okay! At least you tried!",
    streakMsg0: "Start your first quiz! 🎮",
    streakMsg1: "🔥 Keep going! {streak} days streak!",
    streakMsg2: "⭐ Amazing! {streak} days streak!",
    streakMsg3: "🏆 WOW! {streak} days streak! You rock!",

    // Footer
    testChallenge: "Test knowledge, conquer challenges",
    features: "Features",
    company: "Company",
    about: "About",
    contact: "Contact",
    privacy: "Privacy",
    allRightsReserved: "All rights reserved.",
    madeWith: "Made with",
    forDOT: "for DOT Indonesia",

    // Result Page
    legendary: "LEGENDARY",
    master: "MASTER",
    adventurer: "ADVENTURER",
    beginner: "BEGINNER",
    lootEarned: "Loot You Earned",
    diamond: "DIAMOND",
    emerald: "EMERALD",
    gold: "GOLD",
    perfect: "PERFECT",
    questComplete: "Quest complete!",
    experience: "Experience",
    oopsDataLost: "Oops! Data Lost!",
    resultLost: "Looks like your quiz result disappeared in the dungeon... 🏰",
    redirectingDashboard: "Redirecting to dashboard in",
    seconds: "seconds",
  },
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("quizapp_language");
    return saved || "id";
  });

  useEffect(() => {
    localStorage.setItem("quizapp_language", language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  };

  const t = (key, params = {}) => {
    const text = translations[language]?.[key] || translations.id[key] || key;

    return text.replace(/{(\w+)}/g, (match, p1) => {
      return params[p1] !== undefined ? params[p1] : match;
    });
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
