"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLogin() {
  const t = useTranslations("Admin");
  const [view, setView] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin-iprint");
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });
    if (error) setError(error.message);
    else { alert(t("checkYourEmail")); setView("login"); }
    setLoading(false);
  };

  return (
    <div className="py-24 flex justify-center items-center w-full min-h-[70vh] px-4">
      <motion.div 
        layout
        className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-md relative overflow-hidden"
      >
        <motion.div 
          className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue to-brand-pink" 
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8 }} 
        />

        <AnimatePresence mode="wait">
          {view === "login" ? (
            <motion.div 
              key="login"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-black text-center mb-8 text-slate-900 dark:text-white">{t("loginTitle")}</h1>
              {error && <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-medium border border-red-200 dark:border-red-800/50">{error}</div>}
              
              <form onSubmit={handleLogin} className="space-y-6">
                <input type="email" placeholder={t("emailLabel")} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue/50 outline-none transition-all" value={email} onChange={(e) => setEmail(e.target.value)} required />
                
                <div>
                  <input type="password" placeholder={t("passwordLabel")} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-pink/50 outline-none transition-all" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="button" onClick={() => setView("forgot")} className="mt-3 text-[11px] font-bold text-slate-400 hover:text-brand-pink uppercase tracking-wider transition-colors">{t("forgotPassword")}</button>
                </div>
                
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-brand-pink text-white font-bold py-4 rounded-xl shadow-lg transition-all">
                  {loading ? (
                    <div className="flex justify-center gap-1.5">
                      <motion.span className="w-2 h-2 bg-white rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                      <motion.span className="w-2 h-2 bg-white rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                      <motion.span className="w-2 h-2 bg-white rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                    </div>
                  ) : t("loginButton")}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="forgot"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-black text-center mb-8 text-slate-900 dark:text-white">{t("forgotTitle")}</h1>
              <form onSubmit={handleReset} className="space-y-6">
                <input type="email" placeholder={t("emailLabel")} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue/50 outline-none transition-all" value={email} onChange={(e) => setEmail(e.target.value)} required />
                
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl shadow-lg transition-all">
                  {loading ? (
                    <div className="flex justify-center gap-1.5">
                      <motion.span className="w-2 h-2 bg-white rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                      <motion.span className="w-2 h-2 bg-white rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                      <motion.span className="w-2 h-2 bg-white rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                    </div>
                  ) : t("sendResetLink")}
                </motion.button>
                <button type="button" onClick={() => setView("login")} className="w-full text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">{t("backToLogin")}</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}