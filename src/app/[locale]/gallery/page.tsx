import { setRequestLocale, getTranslations } from 'next-intl/server';

export default async function Gallery(
  props: {
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;
  const { locale } = params;
  setRequestLocale(locale);

  // 💡 جلب الترجمة بطريقة غير متزامنة (Async) متوافقة تماماً مع Next.js 15 والسيرفر
  const t = await getTranslations();

  // Placeholders that can be replaced via CMS
  const images = [
    { id: 112, url: '/images/company.jpg', title: 'Design 0' },
    { id: 111, url: '/images/company-2.jpg', title: 'Design 1' },
    { id: 1, url: '/images/company-3.jpg', title: 'Design 2' },
    { id: 0, url: '/images/af1.jpeg', title: 'Design 3' },
    { id: 4, url: '/images/af4.jpg', title: 'Design 4' },
    { id: 5, url: '/images/af5.jpg', title: 'Design 5' },
    { id: 6, url: '/images/af6.jpg', title: 'Design 6' },
    { id: 7, url: '/images/roll-1.jpg', title: 'Design 7' },
    { id: 8, url: '/images/roll-2.jpg', title: 'Design 8' },
    { id: 9, url: '/images/roll-3.jpg', title: 'Design 9' },
    { id: 11, url: '/images/roll-5.jpg', title: 'Design 11' },
    { id: 12, url: '/images/roll-6.jpg', title: 'Design 12' },
    { id: 13, url: '/images/gift-1.jpeg', title: 'Design 13' },
    { id: 14, url: '/images/gift-2.jpg', title: 'Design 14' },
    { id: 15, url: '/images/gift-3.jpeg', title: 'Design 15' },
    { id: 16, url: '/images/gift-4.jpg', title: 'Design 16' },
    { id: 17, url: '/images/gift-5.jpeg', title: 'Design 17' },
    { id: 18, url: '/images/gift-6.jpg', title: 'Design 18' },
    { id: 19, url: '/images/prints-1.jpeg', title: 'Design 19' },
    { id: 20, url: '/images/prints-2.jpeg', title: 'Design 20' },
    { id: 21, url: '/images/prints-3.jpeg', title: 'Design 21' },
    { id: 22, url: '/images/prints-4.jpeg', title: 'Design 22' },
    { id: 23, url: '/images/prints-5.jpeg', title: 'Design 23' },
    { id: 24, url: '/images/prints-6.jpeg', title: 'Design 24' },
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* 💡 قمنا بربط العنوان بنطاق الـ Navigation ليقرأ كلمة "معرض الأعمال" ديناميكياً من الـ JSON */}
      <h1 className="text-4xl font-bold mb-10 text-center">{t('Navigation.gallery')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map(img => (
          <div key={img.id} className="relative aspect-square overflow-hidden rounded-2xl group shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={img.url} 
              alt={img.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-bold text-lg">{img.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
