"use client";

import { useState, useMemo, WheelEvent, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Gallery() {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 50, y: 50 });

  const images = [
    { id: 112, url: '/images/company.jpg', title: 'Design 0', category: 'Branding' },
    { id: 111, url: '/images/company-2.jpg', title: 'Design 1', category: 'Branding' },
    { id: 1, url: '/images/company-3.jpg', title: 'Design 2', category: 'Branding' },
    { id: 0, url: '/images/af1.jpeg', title: 'Design 3', category: 'Prints' },
    { id: 4, url: '/images/af4.jpg', title: 'Design 4', category: 'Prints' },
    { id: 5, url: '/images/af5.jpg', title: 'Design 5', category: 'Prints' },
    { id: 6, url: '/images/af6.jpg', title: 'Design 6', category: 'Prints' },
    { id: 7, url: '/images/roll-1.jpg', title: 'Design 7', category: 'Roll-ups' },
    { id: 8, url: '/images/roll-2.jpg', title: 'Design 8', category: 'Roll-ups' },
    { id: 9, url: '/images/roll-3.jpg', title: 'Design 9', category: 'Roll-ups' },
    { id: 11, url: '/images/roll-5.jpg', title: 'Design 11', category: 'Roll-ups' },
    { id: 12, url: '/images/roll-6.jpg', title: 'Design 12', category: 'Roll-ups' },
    { id: 13, url: '/images/gift-1.jpeg', title: 'Design 13', category: 'Gifts' },
    { id: 14, url: '/images/gift-2.jpg', title: 'Design 14', category: 'Gifts' },
    { id: 15, url: '/images/gift-3.jpeg', title: 'Design 15', category: 'Gifts' },
    { id: 16, url: '/images/gift-4.jpg', title: 'Design 16', category: 'Gifts' },
    { id: 17, url: '/images/gift-5.jpeg', title: 'Design 17', category: 'Gifts' },
    { id: 18, url: '/images/gift-6.jpg', title: 'Design 18', category: 'Gifts' },
    { id: 19, url: '/images/prints-1.jpeg', title: 'Design 19', category: 'Prints' },
    { id: 20, url: '/images/prints-2.jpeg', title: 'Design 20', category: 'Prints' },
    { id: 21, url: '/images/prints-3.jpeg', title: 'Design 21', category: 'Prints' },
    { id: 22, url: '/images/prints-4.jpeg', title: 'Design 22', category: 'Prints' },
    { id: 23, url: '/images/prints-5.jpeg', title: 'Design 23', category: 'Prints' },
    { id: 24, url: '/images/prints-6.jpeg', title: 'Design 24', category: 'Prints' },
  ];

  const categories = ["All", "Branding", "Prints", "Roll-ups", "Gifts"];
  const filteredImages = useMemo(() => filter === "All" ? images : images.filter(img => img.category === filter), [filter]);

  const nextSlide = () => { setCurrentIndex((p) => (p! + 1) % filteredImages.length); setZoom(1); setPan({x: 50, y: 50}); };
  const prevSlide = () => { setCurrentIndex((p) => (p! - 1 + filteredImages.length) % filteredImages.length); setZoom(1); setPan({x: 50, y: 50}); };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') setCurrentIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredImages.length]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-6 dark:text-white">{t('Navigation.gallery')}</h1>
        <p className="text-center text-gray-500 mb-12"> {t('gallerydes')} </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setFilter(cat); setCurrentIndex(null); }} className={`px-6 py-2 rounded-full font-bold transition-all ${filter === cat ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((img, idx) => (
            <div key={img.id} className="group relative aspect-video rounded-3xl overflow-hidden shadow-xl cursor-pointer" 
                 onClick={() => { setCurrentIndex(idx); setZoom(1); setPan({x: 50, y: 50}); }}>
              <Image src={img.url} alt={img.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                <span className="text-blue-400 font-bold uppercase tracking-widest text-sm">{img.category}</span>
                <h3 className="text-white text-2xl font-bold">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4" onClick={() => setCurrentIndex(null)}>
          <button className="absolute top-8 right-8 text-white text-4xl hover:text-blue-500 z-50" onClick={() => setCurrentIndex(null)}>✕</button>
          <button className="absolute left-8 text-white text-6xl hover:text-blue-500 z-50" onClick={(e) => { e.stopPropagation(); prevSlide(); }}>❮</button>
          <button className="absolute right-8 text-white text-6xl hover:text-blue-500 z-50" onClick={(e) => { e.stopPropagation(); nextSlide(); }}>❯</button>
          
          <div 
            className="relative w-full max-w-5xl h-[80vh] cursor-move overflow-hidden flex items-center justify-center"
            onWheel={(e) => {
              e.preventDefault();
              setZoom(z => Math.max(1, Math.min(z + (e.deltaY > 0 ? -0.2 : 0.2), 3)));
            }}
            onMouseMove={(e) => {
              if (zoom > 1) {
                const rect = e.currentTarget.getBoundingClientRect();
                setPan({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={filteredImages[currentIndex].url} 
              alt="Full" 
              fill 
              className="object-contain transition-transform duration-75" 
              style={{ transform: `scale(${zoom})`, transformOrigin: `${pan.x}% ${pan.y}%` }} 
              unoptimized 
            />
          </div>

          <div className="fixed bottom-8 flex gap-4 bg-gray-900/90 p-4 rounded-2xl border border-white/10 items-center z-50">
            <span className="text-white font-bold ml-2">{filteredImages[currentIndex].title}</span>
            <a href={`https://wa.me/201029769707?text=طلب تصميم: ${filteredImages[currentIndex].title}`} target="_blank" 
               className="bg-green-600 px-8 py-3 rounded-xl text-white font-bold hover:bg-green-700 transition-colors">WhatsApp</a>
          </div>
        </div>
      )}
    </div>
  );
}