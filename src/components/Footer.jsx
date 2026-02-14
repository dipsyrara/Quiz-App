import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import styles from "./Footer.module.css";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>{t("appName")}</h3>
            <p>{t("testChallenge")}</p>
          </div>

          <div className={styles.links}>
            <div className={styles.column}>
              <h4>{t("features")}</h4>
              <ul>
                <li>
                  <a href="/quiz">{t("startQuiz")}</a>
                </li>
                <li>
                  <a href="/dashboard">{t("dashboard")}</a>
                </li>
                <li>
                  <a href="/profile">{t("profile")}</a>
                </li>
              </ul>
            </div>

            <div className={styles.column}>
              <h4>{t("company")}</h4>
              <ul>
                <li>
                  <a href="/about">{t("about")}</a>
                </li>
                <li>
                  <a href="/contact">{t("contact")}</a>
                </li>
                <li>
                  <a href="/privacy">{t("privacy")}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.social}>
            <a
              href="https://github.com/dipsyrara"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/ragil-deantika-rohmaniar-6124812a0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>
            &copy; {currentYear} {t("appName")}. {t("allRightsReserved")}
          </p>
          <p className={styles.madeWith}>
            {t("madeWith")} ❤️ {t("forDOT")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
