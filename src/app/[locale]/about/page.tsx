"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

// إعدادات الحركة: تم زيادة التأخير بنسبة 50% إضافية (0.585 * 1.5 = 0.877)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      delay: 0.877, 
      staggerChildren: 0.877 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <main 
      className="relative min-h-screen py-16 px-4 flex flex-col items-center overflow-hidden bg-[url('/hero-bg.png')] bg-cover bg-center bg-fixed"
    >
      <div className="absolute inset-0 bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-sm -z-0" />

      {/* الشعار */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mb-10 z-10"
      >
        <Image 
          src="/logo.png" 
          alt="iPrint Logo" 
          width={180} 
          height={80} 
          className="w-44 h-auto object-contain" 
        />
      </motion.div>

      {/* المستطيل الأساسي */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.99 }}
        className="relative z-10 max-w-2xl w-full bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden motion-reduce:transition-none"
      >
        
        <motion.div 
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }} 
          className="h-3 w-full bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-blue bg-[length:200%_100%]" 
        />

        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-yellow-400 dark:bg-slate-300 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[inset_15px_-10px_0_0_#0f172a] transition-all duration-500 z-20 hidden md:block"
        >
          <motion.div 
            animate={{ boxShadow: ["0 0 0px rgba(253, 224, 71, 0.4)", "0 0 40px rgba(253, 224, 71, 0.6)", "0 0 0px rgba(253, 224, 71, 0.4)"] }}
            className="w-full h-full rounded-full dark:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="p-10 text-right">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h1 variants={itemVariants} className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
              {t("title")}
            </motion.h1>
            
            <div className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed space-y-8">
              <motion.p variants={itemVariants}>{t("paragraph1")}</motion.p>
              <motion.p variants={itemVariants}>{t("paragraph2")}</motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}