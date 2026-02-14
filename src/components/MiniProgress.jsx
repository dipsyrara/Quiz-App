import React from "react";
import { FaCheckCircle, FaCircle, FaClock } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import styles from "./MiniProgress.module.css";

const MiniProgress = ({
  current = 1,
  total = 10,
  answered = [],
  timeLeft = 0,
  showLabels = true,
}) => {
  const { t } = useLanguage();
  const progress = (current / total) * 100;
  const answeredCount = answered.length;
  const remainingCount = total - answeredCount;

  return (
    <div className={styles.container}>
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressTitle}>{t("progressQuiz")}</span>
          <span className={styles.progressStats}>
            {current} / {total} {t("questions")}
          </span>
        </div>

        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBarFill}
            style={{ width: progress + "%" }}
          >
            <span className={styles.progressPercentage}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.answeredCard}`}>
          <FaCheckCircle className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>{t("answered")}</span>
            <span className={styles.statValue}>{answeredCount}</span>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.remainingCard}`}>
          <FaCircle className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>{t("remaining")}</span>
            <span className={styles.statValue}>{remainingCount}</span>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.timerCard}`}>
          <FaClock className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>{t("timeLeft")}</span>
            <span
              className={`${styles.statValue} ${timeLeft < 10 ? styles.warning : ""}`}
            >
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.questionDots}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${
              i + 1 === current
                ? styles.active
                : answered.includes(i + 1)
                  ? styles.completed
                  : ""
            }`}
            title={`${t("question")} ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniProgress;
