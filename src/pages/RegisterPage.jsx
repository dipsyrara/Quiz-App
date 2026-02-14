import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError("");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError(t("allFieldsRequired"));
      return;
    }

    if (formData.password.length < 6) {
      setError(t("passwordMinLength"));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }

    setLoading(true);
    const result = await register(
      formData.email,
      formData.password,
      formData.username,
    );
    setLoading(false);

    if (result.success) {
      console.log("✅ Registrasi berhasil, redirect ke halaman login");
      navigate("/login", {
        state: {
          message: t("registerSuccess"),
          email: formData.email,
        },
        replace: true,
      });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <button onClick={() => navigate("/")} className={styles.backButton}>
        <FaArrowLeft /> {t("home")}
      </button>
      <motion.div
        className={styles.registerCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>{t("appName")}</h1>
          <h2 className={styles.subtitle}>{t("createAccount")}</h2>
          <p className={styles.description}>{t("registerFree")}</p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <span>❌</span>
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Username */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <FaUser className={styles.labelIcon} />
              {t("username").toUpperCase()}
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t("usernamePlaceholder")}
              className={styles.input}
              disabled={loading}
            />
          </div>

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
              {t("passwordMinLengthLabel")}
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

          {/* Confirm Password */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <FaLock className={styles.labelIcon} />
              {t("confirmPassword")}
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={styles.input}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.eyeButton}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.registerButton}
            disabled={loading}
          >
            {loading ? t("registering") : t("createAccount").toUpperCase()}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            {t("haveAccount")}{" "}
            <Link to="/login" className={styles.loginLink}>
              {t("loginHere")}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
