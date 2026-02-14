import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaGamepad,
  FaCrown,
  FaFire,
  FaCalendarAlt,
} from "react-icons/fa";
import { GiAchievement, GiPartyPopper, GiBrain } from "react-icons/gi";
import { MdEmojiEmotions, MdAutoAwesome } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import storage from "../utils/storage";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    averageScore: 0,
    bestScore: 0,
    streak: 0,
  });
  const [badges, setBadges] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  useEffect(() => {
    const quizHistory = storage.getQuizHistory() || [];
    setHistory(quizHistory);
    calculateStats(quizHistory);
    calculateBadges(quizHistory);
  }, []);

  const calculateStats = (quizHistory) => {
    if (!quizHistory.length) return;

    const totalQuizzes = quizHistory.length;
    const totalQuestions = quizHistory.reduce(
      (acc, q) => acc + (q.total || 0),
      0,
    );
    const totalScore = quizHistory.reduce((acc, q) => acc + (q.score || 0), 0);
    const averageScore =
      totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;
    const bestScore = Math.max(...quizHistory.map((q) => q.score || 0));

    setStats({
      totalQuizzes,
      totalQuestions,
      averageScore,
      bestScore,
      streak: totalQuizzes,
    });
  };

  const calculateBadges = (quizHistory) => {
    const earned = [];
    if (quizHistory.length >= 1)
      earned.push({
        id: "rookie",
        name: t("badgeRookie"),
        icon: <GiPartyPopper />,
        color: "#94a3b8",
      });
    if (stats.bestScore >= 90)
      earned.push({
        id: "legend",
        name: t("badgeLegend"),
        icon: <FaCrown />,
        color: "#f59e0b",
      });
    setBadges(earned);
  };

  const getFilteredHistory = () => {
    if (selectedPeriod === "all") return history;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const periods = {
      today: today,
      week: weekAgo,
      month: monthAgo,
    };

    return history.filter((q) => new Date(q.date) >= periods[selectedPeriod]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date >= today) return t("today");
    if (date >= yesterday) return t("yesterday");

    const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) return diffDays + " " + t("daysAgo");

    return date.toLocaleDateString(t("locale"), {
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins + ":" + secs.toString().padStart(2, "0");
  };

  const getScoreAvatar = (score) => {
    if (score >= 90)
      return <MdAutoAwesome style={{ color: "#f59e0b", fontSize: "2rem" }} />;
    if (score >= 70)
      return <MdEmojiEmotions style={{ color: "#10b981", fontSize: "2rem" }} />;
    if (score >= 50)
      return <MdEmojiEmotions style={{ color: "#3b82f6", fontSize: "2rem" }} />;
    return <MdEmojiEmotions style={{ color: "#64748b", fontSize: "2rem" }} />;
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.floatingEmojis}>
        <span>📊</span>
        <span>🏆</span>
        <span>🎯</span>
        <span>💯</span>
      </div>

      <div className={styles.header}>
        <div className={styles.welcomeSection}>
          <div className={styles.avatarWrapper}>
            <div className={styles.userAvatar}>
              {user?.username?.charAt(0)?.toUpperCase() || "👤"}
            </div>
          </div>
          <div className={styles.welcomeText}>
            <h1 className={styles.welcomeTitle}>
              {t("welcome")}, {user?.username || "Quizzer"}! 👋
            </h1>
          </div>
        </div>
        <button
          className={styles.newQuizButton}
          onClick={() => navigate("/quiz")}
        >
          <FaGamepad /> {t("startNewQuiz")}
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.totalQuizCard}`}>
          <div className={styles.statIconWrapper}>
            <FaGamepad />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>{t("totalQuizzes")}</span>
            <span className={styles.statValue}>{stats.totalQuizzes}</span>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.averageScoreCard}`}>
          <div className={styles.statIconWrapper}>
            <FaTrophy />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>{t("averageScore")}</span>
            <span className={styles.statValue}>{stats.averageScore}%</span>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.bestScoreCard}`}>
          <div className={styles.statIconWrapper}>
            <FaCrown />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>{t("bestScore")}</span>
            <span className={styles.statValue}>{stats.bestScore}%</span>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.streakCard}`}>
          <div className={styles.statIconWrapper}>
            <FaFire />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>{t("streak")}</span>
            <span className={styles.statValue}>{stats.streak} 🔥</span>
          </div>
        </div>
      </div>

      <div className={styles.badgesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <GiAchievement /> {t("yourBadges")}
          </h2>
          <span className={styles.badgeCount}>
            {badges.length} {t("badge")}
          </span>
        </div>

        {badges.length > 0 ? (
          <div className={styles.badgeGrid}>
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={styles.badgeCard}
                style={{ "--badge-color": badge.color }}
              >
                <div className={styles.badgeIconWrapper}>{badge.icon}</div>
                <div className={styles.badgeInfo}>
                  <h3 className={styles.badgeName}>{badge.name}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyBadges}>
            <GiPartyPopper className={styles.emptyIcon} />
            <h3>{t("noBadges")}</h3>
          </div>
        )}
      </div>

      <div className={styles.historySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <FaClock /> {t("quizHistory")}
          </h2>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${selectedPeriod === "all" ? styles.active : ""}`}
              onClick={() => setSelectedPeriod("all")}
            >
              {t("all")}
            </button>
            <button
              className={`${styles.filterButton} ${selectedPeriod === "today" ? styles.active : ""}`}
              onClick={() => setSelectedPeriod("today")}
            >
              {t("today")}
            </button>
            <button
              className={`${styles.filterButton} ${selectedPeriod === "week" ? styles.active : ""}`}
              onClick={() => setSelectedPeriod("week")}
            >
              {t("thisWeek")}
            </button>
            <button
              className={`${styles.filterButton} ${selectedPeriod === "month" ? styles.active : ""}`}
              onClick={() => setSelectedPeriod("month")}
            >
              {t("thisMonth")}
            </button>
          </div>
        </div>

        {getFilteredHistory().length > 0 ? (
          <div className={styles.historyList}>
            {getFilteredHistory().map((quiz, index) => (
              <div key={index} className={styles.historyCard}>
                <div className={styles.historyAvatar}>
                  {getScoreAvatar(quiz.score)}
                </div>
                <div className={styles.historyInfo}>
                  <div className={styles.historyHeader}>
                    <span className={styles.historyDate}>
                      <FaCalendarAlt /> {formatDate(quiz.date)}
                    </span>
                    <span
                      className={`${styles.historyScore} ${quiz.score >= 70 ? styles.highScore : ""}`}
                    >
                      {quiz.score}%
                    </span>
                  </div>
                  <div className={styles.historyStats}>
                    <span className={styles.historyStat} title={t("correct")}>
                      <FaCheckCircle style={{ color: "#10b981" }} />{" "}
                      {quiz.correct || 0}
                    </span>
                    <span className={styles.historyStat} title={t("incorrect")}>
                      <FaTimesCircle style={{ color: "#ef4444" }} />{" "}
                      {quiz.incorrect || 0}
                    </span>
                    <span
                      className={styles.historyStat}
                      title={t("unanswered")}
                    >
                      <FaClock style={{ color: "#8b5cf6" }} />{" "}
                      {quiz.unanswered || 0}
                    </span>
                    <span className={styles.historyStat} title={t("time")}>
                      <FaClock style={{ color: "#f59e0b" }} />{" "}
                      {formatTime(quiz.timeSpent || 0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyHistory}>
            <FaGamepad className={styles.emptyIcon} />
            <h3>{t("noHistory")}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
