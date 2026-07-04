"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function HomeContent() {
  const t = useTranslations();
  const locale = useLocale();
  const [failedLogos, setFailedLogos] = useState<Record<number, boolean>>({});

  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const clients = [
    { name: "Coca-Cola", logo: "/clients/coca-cola.png" },
    { name: "مؤسسة السفير العلمية", logo: "/clients/safeer.png" },
    { name: "Caribou Coffee", logo: "/clients/caribou.png" },
    { name: "Elegant Care", logo: "/clients/elegant-care.png" },
    { name: "bank", logo: "/clients/bank.png" },
    { name: "GSK", logo: "/clients/gsk.png" },
    { name: "Schweppes", logo: "/clients/Schweppes.png" },
    { name: "solex.tech", logo: "/clients/solex-tech.jpg" },
    { name: "aldau", logo: "/clients/aldau.webp" },
    { name: "Daily Fresh", logo: "/clients/daily-fresh.png", isTextLogo: true }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        >
          <div className="absolute inset-0 bg-slate-200/40 dark:bg-black/70 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-900 dark:text-white pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeIn} className="mb-8 w-48 md:w-64 h-auto flex items-center justify-center">
              <Image src="/logo.png" alt="iPrint Logo" width={256} height={80} className="w-full h-auto object-contain" priority />
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
              {t("Hero.title")}
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl md:text-2xl font-medium mb-10 max-w-3xl mx-auto opacity-90">
              {t("Hero.subtitle")}
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Services Overview - استعدنا كل النصوص الأصلية */}
      <section id="services" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t("Services.title")}</h2>
            <div className="w-24 h-1.5 bg-brand-pink mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Prints */}
            <motion.div variants={fadeIn} whileHover={{ y: -8 }}>
              <Link href="/services/prints" className="group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-2xl hover:border-brand-blue/30 transition-all duration-300 h-full block">
                <div className="w-20 h-20 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">🖨️</div>
                <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white">{t('mtbwaat')}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{t('krwt-brwshwr-flayrz-mnyw-mtbwaat-mtaam-wshrkat-bjwdh-aalyh-wasaar-mnafsh')}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-brand-blue font-bold text-sm group-hover:gap-2 transition-all">{t('aarf-akthr')}</span>
              </Link>
            </motion.div>

            {/* Signs */}
            <motion.div variants={fadeIn} whileHover={{ y: -8 }}>
              <Link href="/services/signs" className="group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-2xl hover:border-brand-pink/30 transition-all duration-300 h-full block">
                <div className="w-20 h-20 bg-brand-pink/10 text-brand-pink rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:bg-brand-pink group-hover:text-white transition-all duration-300">🖼️</div>
                <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white">{t('yft-wlaftat')}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{t('laftat-irshadyh-madnyh-wblastykyh-astandat-ardh')} Rollup وPopup وBanner</p>
                <span className="mt-auto inline-flex items-center gap-1 text-brand-pink font-bold text-sm group-hover:gap-2 transition-all">{t('aarf-akthr')}</span>
              </Link>
            </motion.div>

            {/* Gifts */}
            <motion.div variants={fadeIn} whileHover={{ y: -8 }}>
              <Link href="/services/gifts" className="group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-2xl hover:border-brand-yellow/50 transition-all duration-300 h-full block">
                <div className="w-20 h-20 bg-brand-yellow/20 text-yellow-600 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:bg-brand-yellow group-hover:text-slate-900 transition-all duration-300">🎁</div>
                <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white">{t('hdaya-daaeyh')}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{t('aqlam-mjat-mydalyat-wsaaat-haet-mtbwah-bhwytk')}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-yellow-600 font-bold text-sm group-hover:gap-2 transition-all">{t('aarf-akthr')}</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Clients Section - فقط إزالة المربعات مع الحفاظ على الهيكل */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("Clients.title")}</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 transition-all duration-500">
            {clients.map((client, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="cursor-pointer transition-transform hover:scale-110"
              >
                {client.isTextLogo || failedLogos[i] ? (
                  <span className="text-2xl md:text-3xl font-black tracking-tight text-slate-700 dark:text-slate-200">
                    {client.isTextLogo ? (
                      <>
                        <span className="text-green-500">Daily</span>
                        <span> Fresh</span>
                      </>
                    ) : (
                      client.name
                    )}
                  </span>
                ) : (
                  <Image 
                    src={client.logo} 
                    alt={client.name} 
                    width={140} 
                    height={80}
                    className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                    onError={() => setFailedLogos(prev => ({ ...prev, [i]: true }))}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}