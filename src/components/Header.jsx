import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBrain,
  FaGlobe,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <FaBrain className={styles.logoIcon} />
          <span>{t("appName")}</span>
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            {t("home")}
          </Link>
          {user && (
            <>
              <Link to="/dashboard" className={styles.navLink}>
                {t("dashboard")}
              </Link>
              <Link to="/quiz" className={styles.navLink}>
                {t("quiz")}
              </Link>
            </>
          )}
        </nav>

        <div className={styles.rightSection}>
          <button onClick={toggleLanguage} className={styles.languageButton}>
            <FaGlobe />
            <span>{language === "id" ? "ID" : "EN"}</span>
          </button>

          {user ? (
            <div className={styles.userMenu}>
              <Link to="/profile" className={styles.userInfo}>
                <div className={styles.avatar}>
                  {user.username?.charAt(0).toUpperCase() ||
                    user.email?.charAt(0).toUpperCase() ||
                    "U"}
                </div>
                <span className={styles.userEmail}>
                  {user.username || user.email?.split("@")[0] || "User"}
                </span>
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <FaSignOutAlt />
                <span>{t("logout")}</span>
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginBtn}>
                {t("login")}
              </Link>
              <Link to="/register" className={styles.registerBtn}>
                {t("register")}
              </Link>
            </div>
          )}
        </div>

        <button
          className={styles.mobileMenuBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ""}`}
        >
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            {t("home")}
          </Link>
          {user && (
            <>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                {t("dashboard")}
              </Link>
              <Link to="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
                {t("quiz")}
              </Link>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                {t("profile")}
              </Link>
              <button onClick={handleLogout} className={styles.mobileLogoutBtn}>
                <FaSignOutAlt /> {t("logout")}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
