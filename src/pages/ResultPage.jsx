import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import {
  FaTrophy,
  FaRedo,
  FaHome,
  FaChartPie,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import styles from "./ResultPage.module.css";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    console.log("📍 RESULT PAGE MOUNTED");
    console.log("📍 Location pathname:", location.pathname);
    console.log("📍 Location state:", location.state);
    console.log("📍 Location state result:", location.state?.result);
  }, [location]);

  const result = location.state?.result;

  useEffect(() => {
    if (!result) {
      console.log("❌ TIDAK ADA RESULT - Redirect ke dashboard");

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/dashboard", { replace: true });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [result, navigate]);

  if (!result) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIconMinecraft}>⛏️</div>
          <h2 className={styles.errorTitle}>{t("oopsDataLost")}</h2>
          <p className={styles.errorMessage}>{t("resultLost")}</p>
          <p className={styles.errorSubMessage}>
            {t("redirectingDashboard")} {countdown} {t("seconds")}...
          </p>
          <div className={styles.loadingSpinner}></div>
        </div>
      </div>
    );
  }

  const total = result.total || 0;
  const correct = result.correct || 0;
  const incorrect = result.incorrect || 0;
  const unanswered = result.unanswered || 0;
  const timeSpent = result.timeSpent || 0;

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  useEffect(() => {
    if (percentage >= 70) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [percentage]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins + ":" + secs.toString().padStart(2, "0");
  };

  const getAvatar = () => {
    if (percentage >= 90)
      return <span className={styles.avatarDiamond}>💎</span>;
    if (percentage >= 70)
      return <span className={styles.avatarEmerald}>💚</span>;
    if (percentage >= 50) return <span className={styles.avatarGold}>🪙</span>;
    return <span className={styles.avatarCrystal}>🔮</span>;
  };

  const getTitle = () => {
    if (percentage >= 90) return `🏆 ${t("legendary")}!`;
    if (percentage >= 70) return `🎮 ${t("master")}!`;
    if (percentage >= 50) return `⚔️ ${t("adventurer")}!`;
    return `🌱 ${t("beginner")}!`;
  };

  const getMessage = () => {
    if (percentage >= 90) return `🧠 ${t("geniusMsg")}`;
    if (percentage >= 70) return `💚 ${t("emeraldMsg")}`;
    if (percentage >= 50) return `🪙 ${t("goldMsg")}`;
    return `🔮 ${t("crystalMsg")}`;
  };

  console.log("✅ RENDER RESULT PAGE dengan data:", {
    total,
    correct,
    incorrect,
    percentage,
  });

  return (
    <div className={styles.resultContainer}>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          colors={[
            "#7a9a4a",
            "#ffd966",
            "#6b4c3c",
            "#5a7a9a",
            "#9a4a4a",
            "#50c878",
            "#ffd700",
          ]}
        />
      )}

      <div className={styles.floatingEmojis}>
        <span>🎉</span>
        <span>🏆</span>
        <span>🎯</span>
        <span>💯</span>
        <span>⭐</span>
        <span>✨</span>
        <span>⚔️</span>
        <span>🏰</span>
      </div>

      <motion.div
        className={styles.resultCard}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className={styles.titleSection}>
          <h1 className={styles.resultTitle}>{getTitle()}</h1>
        </div>

        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>{getAvatar()}</div>
          <div className={styles.scoreBadge}>
            <span className={styles.scoreText}>{percentage}%</span>
          </div>
        </div>

        <div className={styles.messageBubble}>
          <p>{getMessage()}</p>
          <div className={styles.messageTail}></div>
        </div>

        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.correctCard}`}>
            <FaCheckCircle className={styles.statIcon} />
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>{t("correct")}</span>
              <span className={styles.statValue}>{correct}</span>
            </div>
            <div className={styles.statSticker}>🎯</div>
          </div>

          <div className={`${styles.statCard} ${styles.incorrectCard}`}>
            <FaTimesCircle className={styles.statIcon} />
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>{t("incorrect")}</span>
              <span className={styles.statValue}>{incorrect}</span>
            </div>
            <div className={styles.statSticker}>😅</div>
          </div>

          <div className={`${styles.statCard} ${styles.unansweredCard}`}>
            <FaClock className={styles.statIcon} />
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>{t("unanswered")}</span>
              <span className={styles.statValue}>{unanswered}</span>
            </div>
            <div className={styles.statSticker}>⏰</div>
          </div>

          <div className={`${styles.statCard} ${styles.timeCard}`}>
            <FaClock className={styles.statIcon} />
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>{t("time")}</span>
              <span className={styles.statValue}>{formatTime(timeSpent)}</span>
            </div>
            <div className={styles.statSticker}>⏱️</div>
          </div>
        </div>

        <div className={styles.achievements}>
          <h4 className={styles.achievementTitle}>🏆 {t("lootEarned")}</h4>
          <div className={styles.badgeGrid}>
            {percentage >= 90 && (
              <div className={`${styles.badge} ${styles.legendBadge}`}>
                <span className={styles.badgeIcon}>💎</span>
                <span>{t("diamond")}</span>
              </div>
            )}
            {percentage >= 70 && (
              <div className={`${styles.badge} ${styles.legendBadge}`}>
                <span className={styles.badgeIcon}>💚</span>
                <span>{t("emerald")}</span>
              </div>
            )}
            {percentage >= 50 && (
              <div className={`${styles.badge} ${styles.legendBadge}`}>
                <span className={styles.badgeIcon}>🪙</span>
                <span>{t("gold")}</span>
              </div>
            )}
            {correct === total && total > 0 && (
              <div className={`${styles.badge} ${styles.perfectBadge}`}>
                <span>🎯</span>
                <span>{t("perfect")}</span>
              </div>
            )}
            <div className={`${styles.badge} ${styles.participantBadge}`}>
              <span>⚔️</span>
              <span>{t("adventurer")}</span>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button
            onClick={() => navigate("/quiz")}
            className={`${styles.button} ${styles.tryAgainButton}`}
          >
            <FaRedo /> {t("tryAgain")}
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className={`${styles.button} ${styles.dashboardButton}`}
          >
            <FaChartPie /> {t("dashboard")}
          </button>

          <button
            onClick={() => navigate("/")}
            className={`${styles.button} ${styles.homeButton}`}
          >
            <FaHome /> {t("home")}
          </button>
        </div>

        <div className={styles.funFooter}>
          <p>
            ⚔️ {t("questComplete")} +{Math.round(percentage * 10)}{" "}
            {t("experience")}!<span className={styles.blinkingCursor}>_</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultPage;
