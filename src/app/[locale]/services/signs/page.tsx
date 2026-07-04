import { setRequestLocale, getTranslations } from 'next-intl/server';

// 💡 تقسيم عناصر المصفوفة بشكل ذكي للتفريق بين مفاتيح الترجمة والنصوص المباشرة
const categories = [
  {
    titleKey: "allaftat-alirshadyh-aldakhlyh-walkharjyh",
    icon: "🏷️",
    items: [
      { type: "key", value: "laftat-madnyh-w-blastykyh-dakhl-almbany" },
      { type: "key", value: "laftat-madnyh-w-blastykyh-kharj-almbany" },
      { type: "key", value: "laftat-irshadyh-llshrkat" },
      { type: "key", value: "laftat-irshadyh-llmstshfyat" },
      { type: "key", value: "laftat-irshadyh-llmdars" },
      { type: "key", value: "laftat-irshadyh-llmsana-walmussat" },
    ],
  },
  {
    titleKey: "astandat-alardh",
    icon: "🖼️",
    items: [
      { type: "raw", value: "Rollup Banners" },
      { type: "raw", value: "Banners" },
      { type: "key", value: "astandat-maardh-kharjyh" },
      { type: "key", value: "astandat-dakhl-alshrkat" },
      { type: "key", value: "tsmym-shl-alfk-walnql" },
    ],
  },
];

const galleryImages = [
  "/images/roll-1.jpg",
  "/images/roll-2.jpg",
  "/images/roll-3.jpg",
  "/images/roll-4.jpg",
  "/images/roll-5.jpg",
  "/images/roll-6.jpg",
];

const bannerTypes = [
  { name: "Roll Up", descKey: "shlh-alhml-waltrkyb-mthalyh-llmaardh-walfaalyat", icon: "🎞️" },
  { name: "Pop Up", descKey: "khlfyat-ardh-kbyrh-wantbaa-ahtrafy-qwy", icon: "📸" },
  { name: "Banners", descKey: "aqtsadyh-wkhfyfh-tustkhdm-fy-almhlat-walmkatb", icon: "✖️" },
];

export default async function SignsPage(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  // 💡 جلب دالة الترجمة الخاصة بالسيرفر
  const t = await getTranslations();

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 50%, #c2185b 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=40')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 border border-white/30">
           {t('khdmatna')}
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
           {t('yft-wlaftat')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
           {t('jmya-anwaa-allaftat-alirshadyh-almadnyh-walblastykyh-dakhl-almbany-wkharjha-llshrkat-walmstshfyat-walmdars-walmsana-walmussat')}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">{t('ma-nqdmh')}</h2>
            <div className="w-24 h-1.5 bg-brand-pink mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                {/* 💡 ترجمة عنوان القسم الفرعي */}
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{t(cat.titleKey)}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                      {/* 💡 فحص نوع العنصر: إذا كان مفتاحاً يتم ترجمته، وإذا كان نصاً عادياً يطبع كما هو */}
                      {item.type === "key" ? t(item.value) : item.value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Types Highlight */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('astandat-alardh-almtnqlh')}</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
             {t('shlh-alfk-walnql-mthalyh-llmaardh-walshrkat-walfaalyat')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bannerTypes.map((type, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center shadow-md border border-slate-100 dark:border-slate-800 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{type.icon}</div>
                <h3 className="text-2xl font-black mb-3 text-brand-blue">{type.name}</h3>
                {/* 💡 ترجمة وصف الـ Banner ديناميكياً */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t(type.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">{t('mn-aamalna')}</h2>
            <div className="w-24 h-1.5 bg-brand-blue mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              <div key={i} className="relative aspect-video overflow-hidden rounded-2xl group shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Sign work ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 text-center border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">{t('thtaj-lafth-aw-yafth-lamlk')}</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
           {t('twasl-mana-abr-watsab-wsnqdm-lk-afdhl-ardh-sar-fwraan')}
          </p>
          <a
            href="https://wa.me/201029769707"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
          >
            💬 {t('twasl-abr-watsab')}
          </a>
        </div>
      </section>
    </div>
  );
}