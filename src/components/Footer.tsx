"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaArrowUp, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-auto relative">
      {/* زر العودة للأعلى - تم ضبط الموقع باستخدام end ليعمل مع RTL و LTR */}
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 end-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* قسم عن الشركة */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">iPrint</h3>
            <p className="text-sm leading-relaxed mb-6">
              {t("designs-and-printing-house-high-quality-continuity-fast-execution")}
            </p>
            <div className="flex flex-col gap-3 w-full max-w-[240px]">
              <a
                href="https://www.facebook.com/profile.php?id=61563756885626"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white hover:bg-blue-700 transition-all hover:scale-105 text-sm font-bold bg-blue-600 px-4 py-2 rounded shadow-md"
              >
                <FaFacebook /> {t("sfhtna-ala-fysbwk-0")}
              </a>
              <a
                href="https://wa.me/201029769707"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white hover:bg-green-700 transition-all hover:scale-105 text-sm font-bold bg-green-600 px-4 py-2 rounded shadow-md"
              >
                <FaWhatsapp /> {t("twasl-abr-watsab")}
              </a>
            </div>
          </div>

          {/* قسم الاتصال */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("Contact.title")}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 transition-transform hover:translate-x-1">
                <FaMapMarkerAlt className="text-blue-500 mt-1 shrink-0" /> 
                <span>{t("Contact.address")}</span>
              </li>
              <li className="flex items-center gap-3 transition-transform hover:translate-x-1">
                <FaPhone className="text-blue-500 shrink-0" /> 
                {/* تم تطبيق dir="ltr" على الرقم فقط لضمان اتجاهه الصحيح */}
                <span dir="ltr" className="inline-block text-inherit">
                  {t("Contact.phone")}
                </span>
              </li>
              <li className="flex items-center gap-3 transition-transform hover:translate-x-1">
                <FaEnvelope className="text-blue-500 shrink-0" /> 
                <span>{t("Contact.email")}</span>
              </li>
            </ul>
          </div>

          {/* قسم الخريطة */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("mwqana")}</h4>
            <div className="rounded-xl overflow-hidden border border-slate-700 h-32 w-full bg-slate-800 transition-transform hover:scale-[1.02]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.0128421005747!2d31.373789860687438!3d30.122446014976532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458173a7558a13d%3A0xd8352fa7cfb943a4!2siPrint!5e0!3m2!1sar!2seg!4v1781035556878!5m2!1sar!2seg"
                className="w-full h-full border-0"
                loading="lazy"
                title="iPrint Location"
              />
            </div>
          </div>
        </div>
        
        {/* أسفل الفوتر */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <p>&copy; {new Date().getFullYear()} iPrint. All rights reserved.</p>
          <a href="https://t.me/I_ALBRAWE" target="_blank" rel="noopener noreferrer" className="text-right transition-opacity hover:opacity-70">
            <div className="text-[10px] text-gray-500 tracking-wider text-center md:text-right">POWERED BY</div>
            <div className="text-sm font-bold text-gray-400">AL-BRAWE</div>
          </a>
        </div>
      </div>
    </footer>
  );
}