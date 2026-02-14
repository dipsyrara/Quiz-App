const QUIZ_STATE_KEY = "quizapp_quiz_state"; // PASTIKAN KEY INI SAMA
const USER_STATE_KEY = "quizapp_user_state";
const QUIZ_HISTORY_KEY = "quizapp_history";

export const storage = {
  saveQuizState: (state) => {
    try {
      const data = {
        ...state,
        timestamp: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      };
      localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(data));
      console.log("💾 Quiz state disimpan:", data);
      return true;
    } catch (error) {
      console.error("❌ Gagal menyimpan state quiz:", error);
      return false;
    }
  },

  loadQuizState: () => {
    try {
      const saved = localStorage.getItem(QUIZ_STATE_KEY);
      if (!saved) {
        console.log("📭 Tidak ada quiz state tersimpan");
        return null;
      }

      const data = JSON.parse(saved);
      console.log("📂 Quiz state dimuat:", data);

      if (data.expiresAt && data.expiresAt < Date.now()) {
        console.log("⏰ Quiz state expired, menghapus...");
        storage.clearQuizState();
        return null;
      }

      return data;
    } catch (error) {
      console.error("❌ Gagal load state quiz:", error);
      return null;
    }
  },

  clearQuizState: () => {
    localStorage.removeItem(QUIZ_STATE_KEY);
    console.log("🗑️ Quiz state dihapus");
  },

  updateQuizState: (partialState) => {
    try {
      const currentState = storage.loadQuizState();
      if (!currentState) {
        console.log("⚠️ Tidak ada state untuk diupdate");
        return false;
      }
      const newState = { ...currentState, ...partialState };
      storage.saveQuizState(newState);
      console.log("💾 State diupdate:", partialState);
      return true;
    } catch (error) {
      console.error("❌ Gagal update state:", error);
      return false;
    }
  },

  hasSavedQuizState: () => {
    const saved = localStorage.getItem(QUIZ_STATE_KEY);
    if (!saved) return false;

    try {
      const data = JSON.parse(saved);
      if (data.expiresAt && data.expiresAt < Date.now()) {
        storage.clearQuizState();
        return false;
      }
      return !!(data.questions && data.questions.length > 0);
    } catch {
      return false;
    }
  },

  saveUser: (user) => {
    try {
      localStorage.setItem(USER_STATE_KEY, JSON.stringify(user));
      console.log("👤 User disimpan:", user.email);
      return true;
    } catch (error) {
      console.error("❌ Gagal menyimpan user:", error);
      return false;
    }
  },

  loadUser: () => {
    try {
      const user = localStorage.getItem(USER_STATE_KEY);
      if (!user) return null;
      return JSON.parse(user);
    } catch (error) {
      console.error("❌ Gagal load user:", error);
      return null;
    }
  },

  clearUser: () => {
    localStorage.removeItem(USER_STATE_KEY);
    console.log("👋 User dihapus");
  },

  saveQuizResult: (result) => {
    try {
      const history = storage.getQuizHistory() || [];
      const newResult = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...result,
      };

      history.unshift(newResult);

      if (history.length > 20) {
        history.pop();
      }

      localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
      console.log("📊 Hasil quiz disimpan ke history");
      return true;
    } catch (error) {
      console.error("❌ Gagal menyimpan history:", error);
      return false;
    }
  },

  getQuizHistory: () => {
    try {
      const history = localStorage.getItem(QUIZ_HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error("❌ Gagal load history:", error);
      return [];
    }
  },

  clearQuizHistory: () => {
    localStorage.removeItem(QUIZ_HISTORY_KEY);
  },

  debug: () => {
    console.log("🔍 DEBUG STORAGE:");
    console.log("quiz_state:", localStorage.getItem(QUIZ_STATE_KEY));
    console.log("user_state:", localStorage.getItem(USER_STATE_KEY));
    console.log("history:", localStorage.getItem(QUIZ_HISTORY_KEY));
  },
};

export default storage;
