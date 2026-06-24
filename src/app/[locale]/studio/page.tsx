"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';

// بدلاً من المسار القديم، استخدم المسار الصحيح:
import en from '../../../../messages/en.json';
import ar from '../../../../messages/ar.json';
const dictionaries: Record<string, any> = { en, ar };

type Layer = {
  id: string;
  type: 'text' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  zIndex: number;
};

const CM_TO_PX = 37.8;

const PRODUCT_CATEGORIES = [
  { id: 'sticker', name: 'استيكر / Sticker' },
  { id: 'card', name: 'كارت شخصي / Business Card' },
  { id: 'notebook', name: 'دفتر / Notebook' },
  { id: 'envelope', name: 'ظرف / Envelope' },
  { id: 'acrylic', name: 'لوحة أكريليك / Acrylic Board' },
  { id: 'banner', name: 'بانر / Banner' },
  { id: 'rollup', name: 'رول أب / Roll Up' },
  { id: 'stamp', name: 'ختم / Stamp' },
  { id: 'pen', name: 'قلم / Pen' },
  { id: 'flyer', name: 'منشور / Flyer' },
];

const MOCKUP_MODELS: Record<string, { id: string; name: string; width: number; height: number; shape: string }[]> = {
  sticker: [
    { id: 'sticker-sm', name: 'استيكر دائري صغير / Small Circle', width: 150, height: 150, shape: 'circle' },
    { id: 'sticker-lg', name: 'استيكر دائري كبير / Large Circle', width: 300, height: 300, shape: 'circle' },
    { id: 'sticker-sq', name: 'استيكر مربع / Square Sticker', width: 200, height: 200, shape: 'rectangle' },
  ],
  card: [
    { id: 'card-standard', name: 'كارت شخصي قياسي / Standard', width: 320, height: 192, shape: 'rectangle' },
    { id: 'card-square', name: 'كارت مربع / Square Card', width: 250, height: 250, shape: 'rectangle' },
    { id: 'card-vertical', name: 'كارت طولي / Vertical Card', width: 192, height: 320, shape: 'rectangle' },
  ],
  notebook: [
    { id: 'notebook-a5', name: 'دفتر A5 / Notebook A5', width: 350, height: 500, shape: 'notebook' },
    { id: 'notebook-a6', name: 'دفتر A6 / Notebook A6', width: 256, height: 320, shape: 'notebook' },
  ],
  envelope: [
    { id: 'envelope-dl', name: 'ظرف DL / DL Envelope', width: 220, height: 110, shape: 'envelope' },
    { id: 'envelope-c5', name: 'ظرف C5 / C5 Envelope', width: 324, height: 229, shape: 'envelope' },
    { id: 'envelope-sq', name: 'ظرف مربع / Square Envelope', width: 160, height: 160, shape: 'envelope' },
  ],
  acrylic: [
    { id: 'acrylic-sm', name: 'لوحة أكريليك صغيرة / Small Acrylic', width: 200, height: 200, shape: 'rectangle' },
    { id: 'acrylic-md', name: 'لوحة أكريليك وسط / Medium Acrylic', width: 300, height: 400, shape: 'rectangle' },
    { id: 'acrylic-lg', name: 'لوحة أكريليك كبيرة / Large Acrylic', width: 400, height: 600, shape: 'rectangle' },
  ],
  banner: [
    { id: 'banner-sm', name: 'بانر ميني / Mini Banner', width: 400, height: 100, shape: 'rectangle' },
    { id: 'banner-md', name: 'بانر قياسي / Standard Banner', width: 600, height: 150, shape: 'rectangle' },
    { id: 'banner-lg', name: 'بانر طويل / Long Banner', width: 800, height: 200, shape: 'rectangle' },
  ],
  rollup: [
    { id: 'rollup-standard', name: 'رول أب قياسي / Standard Roll Up', width: 224, height: 384, shape: 'rectangle' },
  ],
  stamp: [
    { id: 'stamp-round', name: 'ختم دائري / Round Stamp', width: 120, height: 120, shape: 'circle' },
    { id: 'stamp-rect', name: 'ختم مستطيل / Rectangular Stamp', width: 150, height: 80, shape: 'rectangle' },
    { id: 'stamp-oval', name: 'ختم بيضاوي / Oval Stamp', width: 160, height: 100, shape: 'circle' },
  ],
  pen: [
    { id: 'pen-default', name: 'قلم مخصص / Custom Pen', width: 280, height: 55, shape: 'pen' },
  ],
  flyer: [
    { id: 'flyer-a5', name: 'منشور (فلاير) A5 / Flyer A5', width: 350, height: 500, shape: 'rectangle' },
    { id: 'flyer-a4', name: 'منشور (فلاير) A4 / Flyer A4', width: 450, height: 650, shape: 'rectangle' },
  ],
};

export default function StudioPage({ params }: { params: { locale: string } }) {
  const [localeResolved, setLocaleResolved] = useState('en');

  useEffect(() => {
    if (params && typeof (params as any).then === 'function') {
      (params as any).then((resolvedParams: { locale: string }) => {
        setLocaleResolved(resolvedParams?.locale || 'en');
      });
    } else if (params?.locale) {
      setLocaleResolved(params.locale);
    }
  }, [params]);

  const isRtl = localeResolved === 'ar';

  // دالة الترجمة المبسطة
  const t = (key: string) => {
    const dict = dictionaries[localeResolved]?.studio || dictionaries.en.studio;
    return dict[key] || key;
  };

  const getEnhancedAITip = (category: string, isSelectedLayer: boolean, layerType: string | null, isRtl: boolean) => {
    if (isSelectedLayer && layerType === 'text') {
      return t('ai_tip_text_resize') || (isRtl 
        ? '💡⚡ روبوت التصميم: تم ضبط النص ليتمدد بحرية! تأكد فقط من اختيار لون مناسب.' 
        : '💡⚡ Design Bot: Your text container resizes freely now! Ensure good contrast.');
    }
    if (isSelectedLayer && layerType === 'image') {
      return t('ai_tip_image_drag') || (isRtl 
        ? '💡⚡ روبوت التصميم: يمكنك سحب الصورة أو الشعار لأي مكان بدقة.' 
        : '💡⚡ Design Bot: You can drag your logo anywhere and manage its dimensions smoothly.');
    }
    
    switch (category) {
      case 'sticker':
        return t('ai_tip_sticker') || (isRtl 
          ? '🤖 مرحباً! الاستيكر يُقص دائرياً، لذا حافظ على النصوص بعيداً عن الحواف الخارجية.' 
          : '🤖 Welcome! Stickers are cut circularly, so keep important elements away from outer edges.');
      case 'card':
        return t('ai_tip_card') || (isRtl 
          ? '🤖 البطاقات الشخصية تتطلب حجماً مقروءاً. اجعل حجم النص أكبر > 10px.' 
          : '🤖 Business cards require legible text. Keep font size above 10px.');
      case 'stamp':
        return t('ai_tip_stamp') || (isRtl 
          ? '🤖 مساحة الختم صغيرة ومضغوطة! اجعل شعارك مركزاً ومختصراً جدا.' 
          : '🤖 Stamp space is very compact! Keep your logo centered and concise.');
      case 'pen':
        return t('ai_tip_pen') || (isRtl 
          ? '🤖 الأقلام مساحتها طولية وضيقة. يفضّل وضع النصوص والشعارات أفقياً.' 
          : '🤖 Pen areas are narrow and long. It is best to place your logo/text horizontally.');
      default:
        return t('ai_tip_default') || (isRtl 
          ? '🤖 ابدأ بإضافة نصوص أو رفع شعارك، وضع كل عنصر في المكان الآمن داخل المعاينة.' 
          : '🤖 Start by adding text or uploading your logo, placing elements inside the safe area.');
    }
  };

  // ربط مصفوفة الخطوط بدوال الترجمة
  const FONTS = [
    { name: t('font_default'), value: 'Arial, sans-serif' },
    { name: t('font_cairo'), value: "'Cairo', sans-serif" },
    { name: t('font_tajawal'), value: "'Tajawal', sans-serif" },
    { name: t('font_roboto'), value: "'Roboto', sans-serif" },
    { name: t('font_impact'), value: 'Impact, sans-serif' },
    { name: t('font_montserrat'), value: "'Montserrat', sans-serif" },
    { name: t('font_playfair'), value: "'Playfair Display', serif" },
    { name: t('font_oswald'), value: "'Oswald', sans-serif" },
    { name: t('font_poppins'), value: "'Poppins', sans-serif" },
    { name: t('font_lobster'), value: "'Lobster', cursive" },
  ];
  
  const [selectedCategory, setSelectedCategory] = useState(PRODUCT_CATEGORIES[0].id);
  const currentModels = MOCKUP_MODELS[selectedCategory] || [];
  
  const [selectedMockup, setSelectedMockup] = useState(currentModels[0] || null);
  
  const [customWidthCm, setCustomWidthCm] = useState(Math.round((currentModels[0]?.width || 150) / CM_TO_PX));
  const [customHeightCm, setCustomHeightCm] = useState(Math.round((currentModels[0]?.height || 150) / CM_TO_PX));

  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  
  const [history, setHistory] = useState<Layer[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [textInput, setTextInput] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(20); 
  const [selectedFont, setSelectedFont] = useState(FONTS[0].value);
  const [fontWeight, setFontWeight] = useState('normal'); 
  
  const [watermarkOpacity] = useState(0.04);
  const [clientName, setClientName] = useState('');
  const [aiTip, setAiTip] = useState('');

  const canvasRef = useRef<HTMLDivElement>(null);

  const canvasWidth = customWidthCm * CM_TO_PX;
  const canvasHeight = customHeightCm * CM_TO_PX;

  const selectedLayer = layers.find(l => l.id === selectedLayerId);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; 
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    const layer = layers.find(l => l.id === selectedLayerId);
    setAiTip(getEnhancedAITip(selectedCategory, !!layer, layer ? layer.type : null, isRtl));
    
    if (!layer) {
      const models = MOCKUP_MODELS[selectedCategory] || [];
      if (models.length > 0) {
        setSelectedMockup(models[0]);
        setCustomWidthCm(Math.round(models[0].width / CM_TO_PX));
        setCustomHeightCm(Math.round(models[0].height / CM_TO_PX));
      }
    }
  }, [selectedCategory, selectedLayerId, layers, isRtl, localeResolved]);

  useEffect(() => {
    if (selectedMockup) {
      setCustomWidthCm(Math.round(selectedMockup.width / CM_TO_PX));
      setCustomHeightCm(Math.round(selectedMockup.height / CM_TO_PX));
    }
  }, [selectedMockup]);

  const saveState = (newLayers: Layer[]) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    setHistory([...updatedHistory, newLayers]);
    setHistoryIndex(updatedHistory.length);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setLayers(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setLayers(history[historyIndex + 1]);
    }
  };

  const addTextLayer = () => {
    if (!textInput.trim()) return;
    const estimatedWidth = Math.max(textInput.length * fontSize * 0.6, 100);
    const estimatedHeight = Math.max(fontSize * 1.5, 40);

    const newLayer: Layer = {
      id: Date.now().toString(),
      type: 'text',
      content: textInput,
      x: 30,
      y: 30,
      width: estimatedWidth,
      height: estimatedHeight,
      rotation: 0,
      color: textColor,
      fontSize: fontSize,
      fontFamily: selectedFont,
      fontWeight: fontWeight,
      zIndex: layers.length,
    };
    const updated = [...layers, newLayer];
    setLayers(updated);
    saveState(updated);
    setTextInput('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            const img = new Image();
            img.src = ev.target.result as string;
            img.onload = () => {
              const imgWidth = Math.min(img.width || 120, canvasWidth - 40);
              const imgHeight = Math.min(img.height || 120, canvasHeight - 40);

              const newLayer: Layer = {
                id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
                type: 'image',
                content: ev.target!.result as string,
                x: 20 + Math.random() * 30, 
                y: 20 + Math.random() * 30,
                width: imgWidth,
                height: imgHeight,
                rotation: 0,
                zIndex: layers.length,
              };
              
              setLayers((prevLayers) => {
                const updated = [...prevLayers, newLayer];
                saveState(updated);
                return updated;
              });
            };
          }
        };
        reader.readAsDataURL(file);
      });
      e.target.value = ''; 
    }
  };

  const updateLayerPositionAndSize = (id: string, x: number, y: number, width: number, height: number) => {
    const updated = layers.map(l => l.id === id ? { ...l, x, y, width, height } : l);
    setLayers(updated);
    saveState(updated);
  };

  const updateSelectedLayer = (updates: Partial<Layer>) => {
    if (!selectedLayerId) return;
    
    let additionalUpdates = { ...updates };
    if (additionalUpdates.fontSize) {
      const currentLayer = layers.find(l => l.id === selectedLayerId);
      if (currentLayer && currentLayer.type === 'text') {
        const newFontSize = additionalUpdates.fontSize;
        additionalUpdates.width = Math.max(currentLayer.content.length * newFontSize * 0.6, 100);
        additionalUpdates.height = Math.max(newFontSize * 1.5, 40);
      }
    }

    const updated = layers.map(l => l.id === selectedLayerId ? { ...l, ...additionalUpdates } : l);
    setLayers(updated);
    saveState(updated);
  };

  const bringToFront = () => {
    if (!selectedLayerId) return;
    const maxZ = Math.max(...layers.map(l => l.zIndex), 0);
    updateSelectedLayer({ zIndex: maxZ + 1 });
  };

  const sendToBack = () => {
    if (!selectedLayerId) return;
    const minZ = Math.min(...layers.map(l => l.zIndex), 0);
    updateSelectedLayer({ zIndex: minZ - 1 });
  };

  const deleteLayer = () => {
    if (!selectedLayerId) return;
    const updated = layers.filter(l => l.id !== selectedLayerId);
    setLayers(updated);
    saveState(updated);
    setSelectedLayerId(null);
  };

  const generateSvgString = () => {
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}">`;
    svgContent += `<defs><style type="text/css">@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&amp;family=Tajawal:wght@400;700;900&amp;family=Roboto:wght@400;700;900&amp;family=Montserrat&amp;family=Playfair+Display&amp;family=Oswald&amp;family=Poppins&amp;family=Lobster&amp;display=swap');</style></defs>`;
    svgContent += `<rect width="100%" height="100%" fill="#ffffff"/>`;
    
    const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);
    sortedLayers.forEach(layer => {
      const centerX = layer.x + layer.width / 2;
      const centerY = layer.y + layer.height / 2;
      
      if (layer.type === 'text') {
        svgContent += `<text x="${centerX}" y="${centerY}" fill="${layer.color || '#000'}" font-size="${layer.fontSize || 20}" font-family="${layer.fontFamily || 'Arial'}" font-weight="${layer.fontWeight || 'normal'}" text-anchor="middle" dominant-baseline="central" transform="rotate(${layer.rotation} ${centerX} ${centerY})">${layer.content}</text>`;
      } else if (layer.type === 'image') {
        svgContent += `<image href="${layer.content}" x="${layer.x}" y="${layer.y}" width="${layer.width}" height="${layer.height}" transform="rotate(${layer.rotation} ${centerX} ${centerY})" />`;
      }
    });
    
    svgContent += `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="48" fill="#000000" opacity="${watermarkOpacity}" transform="rotate(12, ${canvasWidth/2}, ${canvasHeight/2})">iPrint</text>`;
    svgContent += `</svg>`;
    return svgContent;
  };

  const handleDownloadPreview = () => {
    const svgString = generateSvgString();
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(image, 0, 0);
      
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `design-preview-${Date.now()}.png`;
      downloadLink.click();
      URL.revokeObjectURL(url);
    };
  };

  const handleSubmitOrder = () => {
    if (!clientName.trim()) {
      alert(t('alert_enter_name'));
      return;
    }

    const svgString = generateSvgString();
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(image, 0, 0);
      
      canvas.toBlob((blobOutput) => {
        if (blobOutput) {
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(blobOutput);
          downloadLink.download = `design_${clientName}_${Date.now()}.png`;
          downloadLink.click();
          URL.revokeObjectURL(downloadLink.href);
        }
      }, 'image/png');

      URL.revokeObjectURL(url);
    };

    const orderMsg = encodeURIComponent(
      `${t('order_msg_hello')} ${clientName}، ${t('order_msg_intro')}:\n` +
      `${t('product_label')}: ${selectedMockup?.name || 'Custom'} (${customWidthCm} سم × ${customHeightCm} سم)\n` +
      `${t('order_msg_alert')}`
    );

    const facebookPageLink = `https://www.facebook.com/messages/t/61563756885626`;
    window.open(`${facebookPageLink}?text=${orderMsg}`, '_blank');
  };

  const renderMockupShape = () => {
    if (!selectedMockup) return null;
    const { shape } = selectedMockup;

    if (shape === 'circle') {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <div className="w-[85%] h-[85%] rounded-full border-4 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center opacity-40">
            <span className="text-[9px] font-mono text-slate-400">{t('circle_border')}</span>
          </div>
        </div>
      );
    }

    if (shape === 'pen') {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <div className="w-[95%] h-[45%] rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center opacity-40">
            <span className="text-[10px] font-mono text-slate-400">{t('pen_area')}</span>
          </div>
        </div>
      );
    }

    if (shape === 'notebook') {
      return (
        <div className="absolute inset-0 flex pointer-events-none select-none z-0">
          <div className="w-4 h-full border-r-2 border-slate-300 dark:border-slate-700 flex flex-col justify-around items-center opacity-30">
            {Array.from({ length: Math.min(12, Math.floor(canvasHeight / 30)) }).map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-500"></div>)}
          </div>
          <div className="flex-1 border-dashed border-t border-r border-b border-slate-300 dark:border-slate-700 opacity-20 m-2 rounded-r-lg"></div>
        </div>
      );
    }

    if (shape === 'envelope') {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <svg className="w-full h-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,0 50,40 100,0" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2,2" />
            <polygon points="0,0 100,0 100,100 0,100" fill="none" stroke="#94a3b8" strokeWidth="2" />
          </svg>
          <span className="absolute text-[10px] font-mono text-slate-400 opacity-40">Envelope</span>
        </div>
      );
    }

    return (
      <div className="absolute inset-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg pointer-events-none select-none flex items-center justify-center opacity-40 z-0">
        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">{t('printable_area')}</span>
      </div>
    );
  };

  return (
    <main 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className="min-h-screen py-8 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative"
      style={{
        backgroundImage: 'url("/hero-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-950/90 -z-0"></div>
      
      <div className="max-w-[1600px] mx-auto px-4 mb-6 relative z-10">
        <div className="bg-blue-600/10 border border-blue-500/20 dark:bg-blue-950/30 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h1 className="font-black text-base text-blue-900 dark:text-blue-200">{t('title')}</h1>
            <p className="text-xs text-blue-700/80 dark:text-blue-300/80 mt-1">
              {t('description')}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border px-3 py-2 rounded-xl text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">
            <span>{t('badge')}</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1600px] mx-auto px-4 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start relative z-10">
        
        {/* صندوق الأدوات */}
        <div className="xl:col-span-3 bg-white/95 dark:bg-gray-900/95 border border-gray-200/80 dark:border-gray-800/80 rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-5 h-fit text-gray-900 dark:text-gray-100 backdrop-blur-lg">
          
          <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-black text-sm tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              {t('toolbar')}
            </h2>
            <div className="flex gap-1 bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border border-gray-100 dark:border-gray-700">
              <button onClick={undo} disabled={historyIndex <= 0} className="px-3 py-1.5 rounded-lg text-xs disabled:opacity-30 font-bold hover:bg-white dark:hover:bg-gray-950 shadow-sm transition-all text-gray-800 dark:text-gray-200">↩️</button>
              <button onClick={redo} disabled={historyIndex >= history.length - 1} className="px-3 py-1.5 rounded-lg text-xs disabled:opacity-30 font-bold hover:bg-white dark:hover:bg-gray-950 shadow-sm transition-all text-gray-800 dark:text-gray-200">↪️</button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500">{t('select_category')}</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[11px] font-bold text-gray-800 dark:text-gray-200 outline-none cursor-pointer"
            >
              {PRODUCT_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {currentModels.length > 0 && (
            <div className="flex flex-col gap-2 animate-fadeIn">
              <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500">{t('select_model')}</label>
              <select 
                value={selectedMockup?.id || ''}
                onChange={(e) => {
                  const found = currentModels.find(m => m.id === e.target.value);
                  if (found) setSelectedMockup(found);
                }}
                className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[11px] font-bold text-gray-800 dark:text-gray-200 outline-none cursor-pointer"
              >
                {currentModels.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-2.5 border-t pt-3.5 dark:border-gray-800 animate-fadeIn">
            <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500">{t('customize_dims')}</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-gray-400 dark:text-gray-500">{t('width')}</span>
                <input type="number" min="1" max="40" value={customWidthCm} onChange={(e) => setCustomWidthCm(Number(e.target.value))} className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[11px] text-center font-mono text-gray-800 dark:text-gray-200" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-gray-400 dark:text-gray-500">{t('height')}</span>
                <input type="number" min="1" max="40" value={customHeightCm} onChange={(e) => setCustomHeightCm(Number(e.target.value))} className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[11px] text-center font-mono text-gray-800 dark:text-gray-200" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 border-t pt-3.5 dark:border-gray-800">
            <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500">{t('add_text')}</label>
            <input 
              type="text" 
              value={textInput} 
              onChange={(e) => setTextInput(e.target.value)} 
              placeholder={t('placeholder_text')} 
              className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 placeholder:dark:text-gray-500" 
            />
            
            <div className="grid grid-cols-2 gap-2">
              <select 
                value={selectedFont} 
                onChange={(e) => setSelectedFont(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 outline-none cursor-pointer"
              >
                {FONTS.map(f => (
                  <option key={f.value} value={f.value}>{f.name}</option>
                ))}
              </select>

              <select 
                value={fontWeight} 
                onChange={(e) => setFontWeight(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 outline-none cursor-pointer"
              >
                <option value="normal">{t('weight_normal')}</option>
                <option value="bold">{t('weight_bold')}</option>
                <option value="900">{t('weight_black')}</option>
              </select>
            </div>

            <div className="flex gap-2 items-center bg-gray-50 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700">
              <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-6 h-6 rounded border border-gray-200 dark:border-gray-700 cursor-pointer bg-transparent" />
              
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={fontSize} 
                onChange={(e) => setFontSize(Number(e.target.value))} 
                className="flex-1 cursor-pointer accent-blue-600" 
              />
              
              <input 
                type="number" 
                min="1" 
                max="300" 
                value={fontSize} 
                onChange={(e) => setFontSize(Number(e.target.value))} 
                className="w-14 p-1 bg-white dark:bg-gray-950 text-center text-xs border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-gray-800 dark:text-gray-200 outline-none" 
              />
              <span className="text-[10px] font-mono text-gray-500">px</span>
            </div>
            <button onClick={addTextLayer} className="w-full py-2.5 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-700 transition-all shadow-sm tracking-wide">➕ {t('add_text_btn')}</button>
          </div>

          <div className="flex flex-col gap-2.5 border-t pt-3.5 dark:border-gray-800">
            <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500">{t('upload_images')}</label>
            <input 
              type="file" 
              accept="image/*" 
              multiple
              onChange={handleImageUpload} 
              className="w-full p-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[10px] cursor-pointer text-gray-800 dark:text-gray-200 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[9px] file:font-bold file:bg-white dark:file:bg-gray-950 file:text-gray-600 dark:file:text-gray-300" 
            />
          </div>
          
          <button onClick={handleDownloadPreview} className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm tracking-wide">🖼️ {t('preview_btn')}</button>
        </div>

        {/* مساحة العمل */}
        <div className="xl:col-span-6 bg-white/95 dark:bg-gray-900/95 border border-gray-200/80 dark:border-gray-800/80 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col overflow-hidden relative min-h-[550px] transition-all backdrop-blur-lg">
          
          <div className="w-full bg-slate-900 px-6 py-3 flex items-center justify-between border-b border-slate-700 rounded-t-[2rem]">
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-sm"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm"></span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono tracking-wider bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">
              {t('workspace_label')}: {selectedMockup?.name || 'Custom Product'}
            </div>
            <div className="w-10"></div>
          </div>

          <div className="flex-1 bg-slate-100 dark:bg-slate-950/60 flex items-center justify-center relative py-10 px-6 w-full overflow-auto border-t border-slate-200/40 dark:border-slate-800/40 shadow-inner">
            
            <div 
              ref={canvasRef} 
              style={{ 
                width: `${canvasWidth}px`, 
                height: `${canvasHeight}px`,
                backgroundColor: '#ffffff'
              }}
              className="relative bg-white transition-all duration-300 select-none shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-200/60 rounded-lg flex items-center justify-center m-auto overflow-hidden"
            >
              {renderMockupShape()}

              {layers.map((layer) => (
                <Rnd
                  key={layer.id}
                  size={{ width: layer.width, height: layer.height }}
                  position={{ x: layer.x, y: layer.y }}
                  onDragStop={(e, d) => updateLayerPositionAndSize(layer.id, d.x, d.y, layer.width, layer.height)}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    updateLayerPositionAndSize(
                      layer.id, 
                      position.x, 
                      position.y, 
                      parseInt(ref.style.width, 10), 
                      parseInt(ref.style.height, 10)
                    );
                  }}
                  bounds="parent"
                  lockAspectRatio={false}
                  minWidth={30}
                  minHeight={20}
                  onClick={() => setSelectedLayerId(layer.id)}
                  enableResizing={{
                    top: false, right: false, bottom: false, left: false,
                    topRight: false, bottomRight: false, bottomLeft: false, topLeft: false
                  }}
                  className={`absolute z-10 flex items-center justify-center select-none cursor-move ${selectedLayerId === layer.id ? 'z-50' : 'z-10'}`}
                  style={{ zIndex: layer.zIndex }}
                >
                  <div 
                    style={{
                      transform: `rotate(${layer.rotation}deg)`,
                      transformOrigin: 'center center',
                      width: '100%',
                      height: '100%'
                    }}
                    className={`w-full h-full flex items-center justify-center border-2 border-transparent rounded-xl transition-all ${selectedLayerId === layer.id ? 'border-blue-500 bg-blue-50/5 ring-2 ring-blue-500/30 backdrop-blur-[1px]' : 'hover:border-slate-200 hover:bg-slate-50'}`}
                  >
                    <div className="w-full h-full flex items-center justify-center pointer-events-none">
                      {layer.type === 'text' && (
                        <p 
                          style={{ 
                            color: layer.color, 
                            fontSize: `${layer.fontSize}px`, 
                            fontFamily: layer.fontFamily, 
                            fontWeight: layer.fontWeight as any 
                          }} 
                          className="leading-none drop-shadow-sm w-max text-center break-words"
                        >
                          {layer.content}
                        </p>
                      )}
                      {layer.type === 'image' && (
                        <div className="overflow-hidden w-full h-full flex items-center justify-center">
                          <img 
                            src={layer.content} 
                            alt="asset" 
                            style={{ width: '100%', height: '100%' }} 
                            className="object-contain rounded-lg shadow-sm" 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Rnd>
              ))}

              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] z-[1000] overflow-hidden select-none">
                <span className="text-6xl font-black text-black select-none pointer-events-none rotate-12 whitespace-nowrap">iPrint</span>
              </div>

            </div>

          </div>
          
          <div className="w-full bg-slate-900 border-t border-slate-700 px-5 py-3 flex items-center gap-3 text-slate-300 text-[11px] font-medium rounded-b-[2rem] shadow-lg animate-fadeIn">
            <span className="text-base animate-bounce">🤖</span>
            <span className="font-mono tracking-wide flex-1 italic text-indigo-300/90">{aiTip}</span>
          </div>

        </div>

        {/* لوحة الخصائص */}
        <div className="xl:col-span-3 bg-white/95 dark:bg-gray-900/95 border border-gray-200/80 dark:border-gray-800/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-6 h-fit text-gray-900 dark:text-gray-100 backdrop-blur-lg">
          <h3 className="font-black text-base border-b pb-4 tracking-wide">🎨 {t('properties_panel')}</h3>
          
          {selectedLayer ? (
            <div className="space-y-4 animate-fadeIn border-b pb-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-xl text-[9px] text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/30">
                🛠️ {t('properties_tip')}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-gray-500 dark:text-gray-400">X Position</label>
                  <input type="number" value={Math.round(selectedLayer.x)} onChange={(e) => updateSelectedLayer({ x: Number(e.target.value) })} className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs text-center font-mono text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                  <label className="text-[9px] text-gray-500 dark:text-gray-400">Y Position</label>
                  <input type="number" value={Math.round(selectedLayer.y)} onChange={(e) => updateSelectedLayer({ y: Number(e.target.value) })} className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs text-center font-mono text-gray-900 dark:text-gray-100" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-gray-500 dark:text-gray-400">Width</label>
                  <input type="number" value={Math.round(selectedLayer.width)} onChange={(e) => updateSelectedLayer({ width: Number(e.target.value) })} className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs text-center font-mono text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                  <label className="text-[9px] text-gray-500 dark:text-gray-400">Height</label>
                  <input type="number" value={Math.round(selectedLayer.height)} onChange={(e) => updateSelectedLayer({ height: Number(e.target.value) })} className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs text-center font-mono text-gray-900 dark:text-gray-100" />
                </div>
              </div>

              <div>
                <label className="text-[9px] text-gray-500 dark:text-gray-400 flex justify-between">{t('rotation')} <span>{selectedLayer.rotation}°</span></label>
                <input type="range" min="0" max="360" value={selectedLayer.rotation} onChange={(e) => updateSelectedLayer({ rotation: Number(e.target.value) })} className="w-full accent-blue-600" />
              </div>

              {selectedLayer.type === 'text' && (
                <div className="pt-2 space-y-3 border-t dark:border-gray-800">
                  <label className="text-[9px] text-gray-500 dark:text-gray-400">{t('edit_text')}</label>
                  <input type="text" value={selectedLayer.content} onChange={(e) => updateSelectedLayer({ content: e.target.value })} className="w-full p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded text-xs text-gray-900 dark:text-gray-100" />
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] text-gray-500 dark:text-gray-400 block mb-1">{t('font_family')}</label>
                      <select 
                        value={selectedLayer.fontFamily} 
                        onChange={(e) => updateSelectedLayer({ fontFamily: e.target.value })}
                        className="w-full p-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-[10px] font-bold text-gray-800 dark:text-gray-200 outline-none cursor-pointer"
                      >
                        {FONTS.map(f => (
                          <option key={f.value} value={f.value}>{f.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] text-gray-500 dark:text-gray-400 block mb-1">{t('font_weight')}</label>
                      <select 
                        value={selectedLayer.fontWeight} 
                        onChange={(e) => updateSelectedLayer({ fontWeight: e.target.value })}
                        className="w-full p-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-[10px] font-bold text-gray-800 dark:text-gray-200 outline-none cursor-pointer"
                      >
                        <option value="normal">{t('weight_normal')}</option>
                        <option value="bold">{t('weight_bold')}</option>
                        <option value="900">{t('weight_black')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-[9px] text-gray-500 dark:text-gray-400">{t('color')}:</label>
                    <input type="color" value={selectedLayer.color || '#000000'} onChange={(e) => updateSelectedLayer({ color: e.target.value })} className="w-6 h-6 border border-gray-200 dark:border-gray-700 rounded cursor-pointer bg-transparent" />
                  </div>

                  <div>
                    <label className="text-[9px] text-gray-500 dark:text-gray-400 flex justify-between">{t('font_size')} <span>{selectedLayer.fontSize}px</span></label>
                    <input 
                      type="range" min="10" max="150" 
                      value={selectedLayer.fontSize || 20} 
                      onChange={(e) => updateSelectedLayer({ fontSize: Number(e.target.value) })} 
                      className="w-full accent-blue-600" 
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-1.5 pt-2">
                <button onClick={bringToFront} className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-[10px] font-bold border border-gray-200 dark:border-gray-700 transition-all">⬆️ {t('btn_forward')}</button>
                <button onClick={sendToBack} className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-[10px] font-bold border border-gray-200 dark:border-gray-700 transition-all">⬇️ {t('btn_backward')}</button>
                <button onClick={deleteLayer} className="p-2 red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg text-[10px] font-bold border border-red-200 dark:border-red-800 transition-all">🗑️ {t('btn_delete')}</button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 dark:text-gray-500 text-xs text-center py-10 font-mono border-b dark:border-gray-800">{isRtl ? '💡 حدد طبقة أو عنصراً من مساحة العمل لتعديل الخصائص' : 'Select a layer/element to edit properties'}</p>
          )}

          <h2 className="font-black text-base tracking-wide mt-2">🎨 {t('send_order_fb')}</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500">{t('full_name')}</label>
              <input type="text" placeholder={t('placeholder_name')} value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-3.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl text-xs outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 placeholder:dark:text-gray-500" />
            </div>
            
            <button onClick={handleSubmitOrder} className="w-full py-4 mt-2 bg-blue-600 hover:bg-blue-700 text-xs font-black rounded-xl transition-all shadow-sm tracking-wide flex items-center justify-center gap-2 text-white">💬 {t('submit_order')}</button>
          </div>

          {/* تحذير وتنبيه خطوات الإرسال */}
          <div className="mt-4 border-t pt-4 border-gray-200 dark:border-gray-800 space-y-4">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-3.5 rounded-xl text-[11px] text-red-800 dark:text-red-300">
              ⚠️ {t('refresh_warning')}
            </div>

            <h3 className="font-black text-xs border-b pb-2 tracking-wide mt-4">📋 {t('how_to_send')}</h3>
            <div className="bg-amber-50 dark:bg-amber-950/20 p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/30 text-[11px] text-amber-800 dark:text-amber-300 space-y-1.5">
              <p>1️⃣ {t('step_1')}</p>
              <p>2️⃣ {t('step_2')}</p>
              <p>3️⃣ {t('step_3')}</p>
              <p>4️⃣ {t('step_4')}</p>
            </div>
          </div>

          <div className="text-center text-[9px] text-gray-400 dark:text-gray-500 border-t dark:border-gray-800 pt-4 font-mono">iPrint © {new Date().getFullYear()}</div>
        </div>

      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Tajawal:wght@400;700;900&family=Roboto:wght@400;700;900&family=Montserrat&family=Playfair+Display&family=Oswald&family=Poppins&family=Lobster&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out forwards;
        }
      `}</style>
    </main>
  );
}