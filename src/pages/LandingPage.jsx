import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (user) {
      navigate("/quiz");
    } else {
      navigate("/register");
    }
  };

  const minecraftItems = [
    { emoji: "⛏️", name: "Pickaxe", delay: 0 },
    { emoji: "🪓", name: "Axe", delay: 0.5 },
    { emoji: "🪣", name: "Bucket", delay: 1 },
    { emoji: "🧱", name: "Brick", delay: 1.5 },
    { emoji: "🌿", name: "Grass", delay: 2 },
    { emoji: "🪨", name: "Stone", delay: 2.5 },
    { emoji: "💎", name: "Diamond", delay: 3 },
    { emoji: "🪙", name: "Gold", delay: 3.5 },
    { emoji: "🔮", name: "Crystal", delay: 4 },
    { emoji: "⚔️", name: "Sword", delay: 4.5 },
    { emoji: "🛡️", name: "Shield", delay: 5 },
    { emoji: "🏹", name: "Bow", delay: 5.5 },
  ];

  const minecraftBlocks = [
    { emoji: "🟫", name: "Dirt", delay: 0.2 },
    { emoji: "🟩", name: "Grass Block", delay: 0.7 },
    { emoji: "🪨", name: "Cobblestone", delay: 1.2 },
    { emoji: "🧱", name: "Stone Brick", delay: 1.7 },
    { emoji: "🟦", name: "Water", delay: 2.2 },
    { emoji: "⬛", name: "Obsidian", delay: 2.7 },
    { emoji: "🟨", name: "Sand", delay: 3.2 },
    { emoji: "🟥", name: "Redstone", delay: 3.7 },
  ];

  const minecraftMobs = [
    { emoji: "🐷", name: "Pig", delay: 0.3 },
    { emoji: "🐑", name: "Sheep", delay: 0.8 },
    { emoji: "🐮", name: "Cow", delay: 1.3 },
    { emoji: "🐔", name: "Chicken", delay: 1.8 },
    { emoji: "🦑", name: "Squid", delay: 2.3 },
    { emoji: "🐺", name: "Wolf", delay: 2.8 },
    { emoji: "🐱", name: "Cat", delay: 3.3 },
    { emoji: "🐴", name: "Horse", delay: 3.8 },
  ];

  return (
    <div className={styles.landing}>
      {/* Minecraft World Background */}
      <div className={styles.minecraftWorld}>
        <div className={styles.grassLayer}></div>
        <div className={styles.dirtLayer}></div>
        <div className={styles.stoneLayer}></div>

        <div className={styles.floatingItems}>
          {minecraftItems.map((item, index) => (
            <motion.div
              key={index}
              className={styles.floatingItem}
              initial={{ y: 0, x: 0 }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0, -10, 0],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 6,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${(index * 8) % 100}%`,
                top: `${((index * 5) % 80) + 10}%`,
                fontSize: "2.5rem",
                position: "absolute",
                filter: "drop-shadow(8px 8px 0 rgba(0,0,0,0.2))",
              }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </div>

        <div className={styles.floatingBlocks}>
          {minecraftBlocks.map((block, index) => (
            <motion.div
              key={index}
              className={styles.floatingBlock}
              initial={{ scale: 1, rotate: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 15, 0, -15, 0],
              }}
              transition={{
                duration: 5,
                delay: block.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${((index * 12) % 90) + 5}%`,
                bottom: `${((index * 7) % 40) + 10}%`,
                fontSize: "2rem",
                position: "absolute",
                filter: "drop-shadow(6px 6px 0 rgba(0,0,0,0.2))",
              }}
            >
              {block.emoji}
            </motion.div>
          ))}
        </div>

        <div className={styles.walkingMobs}>
          {minecraftMobs.map((mob, index) => (
            <motion.div
              key={index}
              className={styles.walkingMob}
              initial={{ x: -100 }}
              animate={{
                x: ["0vw", "100vw"],
              }}
              transition={{
                duration: 20,
                delay: mob.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                top: `${((index * 8) % 70) + 20}%`,
                fontSize: "2rem",
                position: "absolute",
                filter: "drop-shadow(4px 4px 0 rgba(0,0,0,0.2))",
              }}
            >
              {mob.emoji}
            </motion.div>
          ))}
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className={styles.title}
              animate={{
                textShadow: [
                  "4px 4px 0 #4a5a3a, 8px 8px 0 #2a3a2a",
                  "6px 6px 0 #4a5a3a, 12px 12px 0 #2a3a2a",
                  "4px 4px 0 #4a5a3a, 8px 8px 0 #2a3a2a",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className={styles.titleMain}>{t("appName")}</span>
              <span className={styles.titleSub}>
                ⛏️ {t("craftYourKnowledge")} ⚔️
              </span>
            </motion.h1>

            <motion.div
              className={styles.ctaGroup}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <motion.button
                onClick={handleStartQuiz}
                className={styles.primaryButton}
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  boxShadow:
                    "inset -6px -6px 0 #2a4a2a, inset 6px 6px 0 #aaca7a",
                }}
                whileTap={{ scale: 0.95, y: 4 }}
              >
                <span>⚔️ {t("startAdventure")}</span>
                <FaArrowRight />
              </motion.button>
            </motion.div>

            <motion.div
              className={styles.minecraftCharacter}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className={styles.characterHead}>🧱</div>
              <div className={styles.characterBody}>🟦</div>
              <div className={styles.characterLegs}>⬛⬛</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={styles.minecraftFeatures}>
        <div className={styles.container}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span className={styles.titleAccent}>
              ⚔️ {t("chooseWeapon")} ⚔️
            </span>
            {t("craftKnowledge")}
          </motion.h2>

          <div className={styles.craftingTable}>
            <motion.div
              className={styles.craftingGrid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className={styles.craftingSlot}>
                <motion.div
                  className={styles.craftItem}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className={styles.craftEmoji}>⚔️</span>
                  <h3>{t("realTimeQuiz")}</h3>
                  <p>{t("instantFeedback")}</p>
                </motion.div>
              </div>

              <div className={styles.craftingSlot}>
                <motion.div
                  className={styles.craftItem}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className={styles.craftEmoji}>⏰</span>
                  <h3>{t("smartTimer")}</h3>
                  <p>{t("setYourTime")}</p>
                </motion.div>
              </div>

              <div className={styles.craftingSlot}>
                <motion.div
                  className={styles.craftItem}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className={styles.craftEmoji}>📊</span>
                  <h3>{t("analytics")}</h3>
                  <p>{t("seeProgress")}</p>
                </motion.div>
              </div>

              <div className={styles.craftingSlot}>
                <motion.div
                  className={styles.craftItem}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className={styles.craftEmoji}>🏆</span>
                  <h3>{t("achievements")}</h3>
                  <p>{t("collectBadges")}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
