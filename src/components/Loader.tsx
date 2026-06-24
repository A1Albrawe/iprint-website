"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Loader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // إظهار اللودر عند تغيير المسار
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); 
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 dark:bg-slate-950"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image 
              src="/loading-image.png" 
              alt="Loading" 
              width={200} 
              height={100} 
              priority={true} // الأولوية القصوى لمنع التحذيرات
              className="w-auto h-auto" // حل مشكلة الأبعاد في سجلات النظام
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}