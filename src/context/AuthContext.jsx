import React, { createContext, useContext, useState, useEffect } from "react";
import storage from "../utils/storage";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user dari localStorage saat app start
    const savedUser = storage.loadUser();
    if (savedUser) {
      console.log("👤 User ditemukan di localStorage:", savedUser.email);
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);

      // Simulasi delay network
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!email || !password) {
        throw new Error("Email dan password wajib diisi");
      }

      // Cek apakah user sudah terdaftar (simulasi)
      const registeredUsers = JSON.parse(
        localStorage.getItem("quizapp_registered_users") || "[]",
      );
      const existingUser = registeredUsers.find((u) => u.email === email);

      if (!existingUser) {
        throw new Error(
          "Email belum terdaftar. Silakan register terlebih dahulu!",
        );
      }

      // Validasi password sederhana
      if (password.length < 6) {
        throw new Error("Password minimal 6 karakter");
      }

      const userData = {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        avatar: existingUser.avatar || "default",
        createdAt: existingUser.createdAt,
      };

      // Simpan ke localStorage sebagai user aktif
      storage.saveUser(userData);
      setUser(userData);

      console.log("✅ Login berhasil:", userData.email);
      return { success: true, user: userData };
    } catch (error) {
      console.error("❌ Login gagal:", error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, username) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!email || !password || !username) {
        throw new Error("Semua field wajib diisi");
      }

      if (password.length < 6) {
        throw new Error("Password minimal 6 karakter");
      }

      // Simpan user ke database mock (localStorage)
      const registeredUsers = JSON.parse(
        localStorage.getItem("quizapp_registered_users") || "[]",
      );

      // Cek apakah email sudah terdaftar
      if (registeredUsers.some((u) => u.email === email)) {
        throw new Error("Email sudah terdaftar. Silakan login!");
      }

      // Cek apakah username sudah digunakan
      if (registeredUsers.some((u) => u.username === username)) {
        throw new Error("Username sudah digunakan. Pilih username lain!");
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        username,
        avatar: "default",
        createdAt: new Date().toISOString(),
      };

      // Simpan ke daftar registered users
      registeredUsers.push(newUser);
      localStorage.setItem(
        "quizapp_registered_users",
        JSON.stringify(registeredUsers),
      );

      console.log("✅ Registrasi berhasil untuk:", email);
      console.log("🔐 Silakan login dengan akun yang baru dibuat");

      return { success: true, user: newUser };
    } catch (error) {
      console.error("❌ Registrasi gagal:", error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 300));

      console.log("👋 Logout:", user?.email);

      storage.clearUser();
      storage.clearQuizState();
      setUser(null);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!user) {
        throw new Error("User tidak ditemukan");
      }

      const updatedUser = { ...user, ...updates };

      // Update di registered users juga
      const registeredUsers = JSON.parse(
        localStorage.getItem("quizapp_registered_users") || "[]",
      );
      const index = registeredUsers.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        registeredUsers[index] = { ...registeredUsers[index], ...updates };
        localStorage.setItem(
          "quizapp_registered_users",
          JSON.stringify(registeredUsers),
        );
      }

      storage.saveUser(updatedUser);
      setUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
