import axios from "axios";

const BASE_URL = "https://opentdb.com/api.php";
const CACHE_KEY = "quizapp_questions_cache";
const CACHE_DURATION = 10 * 60 * 1000; // 10 menit

export const quizService = {
  getQuestions: async (
    amount = 10,
    category = "",
    difficulty = "",
    type = "",
  ) => {
    try {
      // Cek cache dulu
      const cacheKey = `${amount}_${category}_${difficulty}_${type}`;
      const cached = localStorage.getItem(CACHE_KEY + cacheKey);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          console.log("✅ Menggunakan data dari cache");
          return data;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      let url = BASE_URL + "?amount=" + amount;
      if (category) url = url + "&category=" + category;
      if (difficulty) url = url + "&difficulty=" + difficulty;
      if (type) url = url + "&type=" + type;

      console.log("📡 Fetching dari API:", url);

      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.response_code === 0) {
        const results = response.data.results;

        if (results.length === 0) {
          throw new Error("Tidak ada soal tersedia. Coba kategori lain!");
        }

        // Simpan ke cache
        localStorage.setItem(
          CACHE_KEY + cacheKey,
          JSON.stringify({
            data: results,
            timestamp: Date.now(),
          }),
        );

        console.log(`✅ Berhasil mengambil ${results.length} soal`);
        return results;
      } else if (response.data.response_code === 1) {
        throw new Error(
          "❌ Tidak ada cukup soal untuk kategori ini. Coba kategori lain!",
        );
      } else if (response.data.response_code === 2) {
        throw new Error("❌ Parameter invalid. Coba lagi!");
      } else if (response.data.response_code === 3) {
        throw new Error("❌ Token tidak ditemukan. Coba refresh!");
      } else if (response.data.response_code === 4) {
        throw new Error("❌ Token sudah habis. Coba reset!");
      } else if (response.data.response_code === 5) {
        throw new Error("❌ Terlalu banyak request! Tunggu 5 detik...");
      } else {
        throw new Error("❌ Gagal mengambil soal. Coba lagi!");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      const cacheKey = `${amount}_${category}_${difficulty}_${type}`;
      const cached = localStorage.getItem(CACHE_KEY + cacheKey);

      if (cached) {
        const { data } = JSON.parse(cached);
        console.log("⚠️ Menggunakan cache expired sebagai fallback");
        return data;
      }

      throw error;
    }
  },

  getCategories: async () => {
    try {
      const cached = localStorage.getItem("quizapp_categories_cache");
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get("https://opentdb.com/api_category.php");
      const categories = response.data.trivia_categories;

      localStorage.setItem(
        "quizapp_categories_cache",
        JSON.stringify({
          data: categories,
          timestamp: Date.now(),
        }),
      );

      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  decodeHtml: (text) => {
    if (!text) return "";
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  },

  shuffleArray: (array) => {
    if (!array) return [];
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  formatOptions: (correctAnswer, incorrectAnswers) => {
    if (!correctAnswer) return [];
    const incorrect = incorrectAnswers || [];
    const options = [correctAnswer, ...incorrect];
    return quizService.shuffleArray(options);
  },
};

export default quizService;
