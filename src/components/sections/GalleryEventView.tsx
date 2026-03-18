'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MediaFile {
  url: string;
  type: 'image' | 'video';
  originalUrl?: string;
}

// Sub-componente para manejar la carga individual y Skeletons del Grid
function GalleryItem({ file, onClick }: { file: MediaFile, onClick: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div 
      layout 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      onClick={onClick} 
      className="relative group overflow-hidden bg-[#050505] rounded-sm cursor-pointer mb-4 border border-white/5 min-h-[200px]"
    >
      {/* Skeleton individual mientras carga la imagen */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse z-0" />
      )}

      {file.type === 'image' ? (
        <Image 
          src={file.url} 
          alt="Moment" 
          width={800} 
          height={1200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 z-10 relative ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />
      ) : (
        <video 
          src={file.url} 
          muted 
          playsInline 
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 z-10 relative ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
        />
      )}

      {/* Overlay al pasar el mouse */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
        <span className="text-white text-[10px] tracking-widest uppercase border-b border-after-gold pb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {file.type === 'video' ? 'Reproducir' : 'Ampliar'}
        </span>
      </div>
    </motion.div>
  );
}

function GalleryContent() {
  const t = useTranslations('GalleryDemo');
  const searchParams = useSearchParams();
  const eventoActual = searchParams.get('evento');

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [displayedCount, setDisplayedCount] = useState(12);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const slideshowTimer = useRef<NodeJS.Timeout | null>(null);
  const SLIDE_DURATION = 3000;

  // 1. CARGA DE DATOS DESDE HOSTINGER
  useEffect(() => {
    setIsFetching(true);
    const apiBase = "https://afterhouse.com.mx/php/get_gallery_images.php";
    const fetchUrl = eventoActual ? `${apiBase}?evento=${eventoActual}` : apiBase;

    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((f: any) => {
          const cleanPath = f.url.startsWith('/') ? f.url.substring(1) : f.url;
          const fullUrl = `https://afterhouse.com.mx/${cleanPath}`;
          return { 
            ...f, 
            url: fullUrl,
            originalUrl: f.originalUrl ? `https://afterhouse.com.mx/${f.originalUrl.startsWith('/') ? f.originalUrl.substring(1) : f.originalUrl}` : fullUrl
          };
        });
        setMediaFiles(formatted);
      })
      .catch(err => console.error("Error cargando galería:", err))
      .finally(() => setIsFetching(false));
  }, [eventoActual]);

  // 2. NAVEGACIÓN Y TECLADO
  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev !== null ? (prev + 1) % mediaFiles.length : 0));
  }, [mediaFiles.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev !== null ? (prev - 1 + mediaFiles.length) % mediaFiles.length : 0));
  }, [mediaFiles.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') { setCurrentIndex(null); setIsPlaying(false); }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, handleNext, handlePrev]);

  // 3. DESCARGA FORZADA Y COMPARTIR
  const handleDownload = async () => {
    if (currentIndex === null) return;
    const fileUrl = mediaFiles[currentIndex].originalUrl || mediaFiles[currentIndex].url;
    try {
      const response = await fetch(fileUrl, { mode: 'cors' });
      if (!response.ok) throw new Error("CORS bloqueó la petición");
      const blob = await response.blob();
      const localUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = localUrl;
      link.setAttribute('download', fileUrl.split('/').pop() || 'afterhouse.webp');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(localUrl);
    } catch (err) {
      window.open(fileUrl, '_blank');
    }
  };

  const handleShare = async () => {
    if (currentIndex === null) return;
    const fileUrl = mediaFiles[currentIndex].url;
    try {
      const response = await fetch(fileUrl, { mode: 'cors' });
      const blob = await response.blob();
      const file = new File([blob], `afterhouse_${currentIndex}.webp`, { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'AFTER HOUSE', text: 'Mira este momento' });
      } else if (navigator.share) {
        await navigator.share({ title: 'AFTER HOUSE', url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 4. SLIDESHOW
  useEffect(() => {
    if (isPlaying && currentIndex !== null) {
      if (mediaFiles[currentIndex].type === 'image') {
        slideshowTimer.current = setInterval(handleNext, SLIDE_DURATION);
      }
    } else {
      if (slideshowTimer.current) clearInterval(slideshowTimer.current);
    }
    return () => { if (slideshowTimer.current) clearInterval(slideshowTimer.current); };
  }, [isPlaying, currentIndex, handleNext, mediaFiles]);

  return (
    <>
      <section className="pt-40 pb-16 px-6 max-w-7xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-playfair text-5xl md:text-7xl mb-4 uppercase text-white">
          {eventoActual || t('previewTitle1')} <br />
          <span className="italic text-after-gold">{t('previewTitle2')}</span>
        </motion.h1>
      </section>

      <section className="px-4 md:px-8 pb-32 max-w-[1400px] mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {/* MODO SKELETON (Mientra hace el fetch inicial) */}
          {isFetching ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <div key={`skel-${idx}`} className="w-full bg-white/5 animate-pulse rounded-sm mb-4" style={{ height: `${Math.floor(Math.random() * 200) + 250}px` }} />
            ))
          ) : (
            /* MODO GALERÍA REAL */
            mediaFiles.slice(0, displayedCount).map((file, idx) => (
              <GalleryItem key={idx} file={file} onClick={() => setCurrentIndex(idx)} />
            ))
          )}
        </div>

        {!isFetching && displayedCount < mediaFiles.length && (
          <div className="mt-16 text-center">
            <button onClick={() => setDisplayedCount(prev => prev + 12)} className="bg-transparent border border-white/10 text-white/40 hover:text-white hover:border-after-gold py-4 px-10 text-[10px] tracking-[0.4em] uppercase transition-all rounded-sm">
              Cargar más momentos
            </button>
          </div>
        )}
      </section>

      {/* LIGHTBOX COMPLETO Y OPTIMIZADO */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            
            {/* Pre-carga de la siguiente y anterior imagen para transiciones instantáneas */}
            <div className="hidden">
              {currentIndex < mediaFiles.length - 1 && mediaFiles[currentIndex + 1].type === 'image' && (
                 <Image src={mediaFiles[currentIndex + 1].url} alt="preload next" width={1920} height={1080} priority />
              )}
              {currentIndex > 0 && mediaFiles[currentIndex - 1].type === 'image' && (
                 <Image src={mediaFiles[currentIndex - 1].url} alt="preload prev" width={1920} height={1080} priority />
              )}
            </div>

            {isPlaying && mediaFiles[currentIndex].type === 'image' && (
              <motion.div key={`progress-${currentIndex}`} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }} className="absolute top-0 left-0 h-[2px] bg-after-gold z-[210]" />
            )}

            {/* Cabecera con controles */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-[210]">
              <div className="flex items-center gap-6">
                <span className="text-white/40 font-mono text-[10px] tracking-[0.3em]">{currentIndex + 1} / {mediaFiles.length}</span>
                
                <button onClick={() => setIsPlaying(!isPlaying)} className={`${isPlaying ? 'text-after-gold' : 'text-white/40'} hover:text-after-gold transition-colors`}>
                  {isPlaying ? <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
                </button>
                <button onClick={handleShare} className="text-white/40 hover:text-after-gold transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"></path></svg></button>
                <button onClick={handleDownload} className="text-white/40 hover:text-after-gold transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg></button>
              </div>
              <button onClick={() => {setCurrentIndex(null); setIsPlaying(false);}} className="text-white/40 hover:text-white transition-colors p-2"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>

            {/* Flechas Navegación */}
            <button onClick={handlePrev} className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/20 hover:text-white z-[210] p-4 transition-colors"><svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg></button>
            <button onClick={handleNext} className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/20 hover:text-white z-[210] p-4 transition-colors"><svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg></button>

            {/* Contenido Media con Animación Suave */}
            <div className="w-full h-full p-4 md:p-20 flex justify-center items-center pointer-events-none">
              <div className="pointer-events-auto flex items-center justify-center max-w-full max-h-full">
                {mediaFiles[currentIndex].type === 'image' ? (
                  <motion.img 
                    key={`img-${currentIndex}`} 
                    src={mediaFiles[currentIndex].url} 
                    alt="Expanded view" 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="max-w-full max-h-[85vh] object-contain shadow-2xl" 
                  />
                ) : (
                  <motion.video 
                    key={`vid-${currentIndex}`} 
                    src={mediaFiles[currentIndex].url} 
                    controls autoPlay playsInline 
                    onEnded={() => isPlaying && handleNext()}
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="max-w-full max-h-[85vh] shadow-2xl bg-black" 
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function GalleryEventView() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-after-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}