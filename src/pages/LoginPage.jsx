import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      if (location.state?.email) {
        setFormData((prev) => ({ ...prev, email: location.state.email }));
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError(t("emailPasswordRequired"));
      return;
    }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Back Button */}
      <button onClick={() => navigate("/")} className={styles.backButton}>
        <FaArrowLeft /> {t("home")}
      </button>

      {/* Login Card */}
      <motion.div
        className={styles.loginCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{t("appName")}</h1>
          <h2 className={styles.subtitle}>{t("welcomeBack")} 👋</h2>
          <p className={styles.description}>{t("loginToContinue")}</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className={styles.successMessage}>
            <span>✅</span>
            <p>{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            <span>❌</span>
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Email */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <FaEnvelope className={styles.labelIcon} />
              {t("email").toUpperCase()}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("emailPlaceholder")}
              className={styles.input}
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <FaLock className={styles.labelIcon} />
              {t("password").toUpperCase()}
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={styles.input}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeButton}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? t("loggingIn") : t("login").toUpperCase()}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            {t("noAccount")}{" "}
            <Link to="/register" className={styles.registerLink}>
              {t("registerFree")}
            </Link>
          </p>
        </div>

        <div className={styles.funFact}>
          <span>✨</span>
          <p>{t("readyForQuiz")}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
