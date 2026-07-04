"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Loader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300"
        >
          {/* شريط التقدم في الأعلى */}
          <motion.div 
            className="absolute top-0 start-0 h-1.5 bg-blue-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="flex flex-col items-center gap-8">
            {/* اللوجو مع تأثير تكبير خفيف */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
              className="w-[280px] md:w-[350px]"
            >
              <Image src="/loading-image.png" alt="iPrint" width={350} height={175} priority className="w-full h-auto object-contain" />
            </motion.div>
            
            {/* النص والنقاط المتحركة - مفروض اتجاهها LTR للثبات */}
            <div dir="ltr" className="flex items-center gap-1 text-xl font-bold tracking-[0.3em] text-slate-500 dark:text-slate-400">
              <span>LOADING</span>
              <motion.span 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              >
                ...
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}