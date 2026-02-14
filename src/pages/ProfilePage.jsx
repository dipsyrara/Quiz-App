import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaClock,
  FaCog,
  FaEdit,
  FaSignOutAlt,
  FaGlobe,
} from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import storage from "../utils/storage";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [formData, setFormData] = useState({ username: "", bio: "" });
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    totalTime: 0,
  });

  useEffect(() => {
    if (user) {
      setFormData({ username: user.username || "", bio: user.bio || "" });
      const history = storage.getQuizHistory() || [];
      const totalQuizzes = history.length;
      const totalQuestions = history.reduce(
        (acc, q) => acc + (q.total || 0),
        0,
      );
      const totalTime = history.reduce((acc, q) => acc + (q.timeSpent || 0), 0);
      setStats({ totalQuizzes, totalQuestions, totalTime });
    }
  }, [user]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    return mins + " mnt";
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("profile")}</h1>
        <button
          className={styles.editButton}
          onClick={() => setIsEditing(!isEditing)}
        >
          <FaEdit /> {isEditing ? t("cancel") : t("editProfile")}
        </button>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div
              className={styles.avatarWrapper}
              style={{ background: "#6366f1" }}
            >
              <span className={styles.avatarEmoji}>🧑</span>
            </div>
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>
                {formData.username || user?.username || "Quizzer"}
              </h2>
              <p className={styles.userBio}>
                {formData.bio || t("bioPlaceholder")}
              </p>
              <div className={styles.userEmail}>
                <FaEnvelope /> {user?.email}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className={styles.editForm}>
              <div className={styles.formGroup}>
                <label>{t("username")}</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label>{t("bio")}</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className={styles.formTextarea}
                  rows="3"
                />
              </div>
              <button
                className={styles.saveButton}
                onClick={async () => {
                  await updateProfile(formData);
                  setIsEditing(false);
                }}
              >
                {t("saveChanges")}
              </button>
            </div>
          )}

          <div className={styles.statsCard}>
            <h3 className={styles.statsTitle}>
              <FaClock /> {t("statistics")}
            </h3>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{stats.totalQuizzes}</span>
                <span className={styles.statLabel}>{t("totalQuizDone")}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{stats.totalQuestions}</span>
                <span className={styles.statLabel}>{t("totalQuestions")}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>
                  {formatTime(stats.totalTime)}
                </span>
                <span className={styles.statLabel}>{t("totalTimeSpent")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.settingsCard}>
          <h3 className={styles.settingsTitle}>
            <FaCog /> {t("accountSettings")}
          </h3>

          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>
              <FaGlobe /> {t("language")}
            </div>
            <div className={styles.languageButtons}>
              <button
                className={`${styles.langButton} ${language === "id" ? styles.active : ""}`}
                onClick={() => setLanguage("id")}
              >
                🇮🇩 {t("indonesian")}
              </button>
              <button
                className={`${styles.langButton} ${language === "en" ? styles.active : ""}`}
                onClick={() => setLanguage("en")}
              >
                🇬🇧 {t("english")}
              </button>
            </div>
          </div>

          <button
            className={styles.logoutButton}
            onClick={() => setShowLogoutConfirm(true)}
          >
            <FaSignOutAlt /> {t("logout")}
          </button>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <GiCoffeeCup className={styles.modalIcon} />
            <h3 className={styles.modalTitle}>{t("logoutConfirm")}</h3>
            <p className={styles.modalDesc}>{t("logoutConfirmDesc")}</p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowLogoutConfirm(false)}
              >
                {t("cancel")}
              </button>
              <button
                className={styles.confirmButton}
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
              >
                {t("yesLogout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
