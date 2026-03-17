'use client';

import { useTranslations, useLocale, useMessages } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const GENERIC_COVER_IMAGE = '/images/cocktails/bg.jpg';

export default function FavoriteDetail({ cocktailId }: { cocktailId: string }) {
  const t = useTranslations('Favorites');
  const tGlobals = useTranslations('Globals');
  const locale = useLocale();
  const messages = useMessages();

  const cocktailsData = (messages as any)?.Favorites?.cocktails || {};
  const cocktailKeys = Object.keys(cocktailsData);

  const [imageIndex, setImageIndex] = useState(0);
  const totalImages = 3; 

  const nextImage = () => setImageIndex((prev) => (prev + 1) % totalImages);
  const prevImage = () => setImageIndex((prev) => (prev - 1 + totalImages) % totalImages);

  // EFECTO AUTOMÁTICO PARA EL SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000); // Cambia de foto cada 4 segundos
    
    return () => clearInterval(interval); // Limpiamos el intervalo si el usuario cambia de página o interactúa
  }, [imageIndex]); // Se reinicia el conteo cada vez que cambia la foto

  const currentImageSrc = imageIndex === 0 
    ? `/images/cocktails/${cocktailId}.webp`
    : `/images/cocktails/${cocktailId}-${imageIndex + 1}.webp`;

  const displayCurrent = String(imageIndex + 1).padStart(2, '0');
  const displayTotal = String(totalImages).padStart(2, '0');

  const safeT = (path: string) => {
    try {
      const val = t(path as any);
      return val.includes(path) ? '' : val;
    } catch { return ''; }
  };

  const name = safeT(`cocktails.${cocktailId}.name`);
  const category = safeT(`cocktails.${cocktailId}.category`);
  const base = safeT(`cocktails.${cocktailId}.base`);
  const quote = safeT(`cocktails.${cocktailId}.quote`);
  
  const tagsString = safeT(`cocktails.${cocktailId}.tags`);
  const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];

  const storyString = safeT(`cocktails.${cocktailId}.story`);
  const storyParagraphs = storyString ? storyString.split('\n').filter(p => p.trim() !== '') : [];

  if (!name || cocktailKeys.length === 0) return <div className="min-h-screen bg-[#080808]" />;

  return (
    <div className="bg-[#080808] text-white font-inter selection:bg-after-gold selection:text-black min-h-screen pb-32">
      
      {/* 1. HERO COVER CON IMAGEN GENÉRICA */}
      <section className="relative w-full h-[65vh] lg:h-[80vh] flex flex-col items-center justify-end pb-20 lg:pb-28 overflow-hidden mb-20 lg:mb-32">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image 
            src={GENERIC_COVER_IMAGE}
            alt="After House Ambience"
            fill
            className="object-cover opacity-50"
            priority
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/10 via-[#080808]/60 to-[#080808]" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <div className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/20 bg-[#080808]/40 backdrop-blur-md mb-8 lg:mb-10">
            <Link href={`/${locale}/`} className="text-white/60 hover:text-after-gold text-[9px] md:text-[10px] tracking-[0.3em] uppercase transition-colors">
              Inicio
            </Link> 
            <span className="text-after-gold text-[9px]">/</span> 
            <span className="text-after-gold text-[9px] md:text-[10px] tracking-[0.3em] uppercase">
              {name}
            </span>
          </div>

          <h1 className="font-playfair text-6xl md:text-8xl lg:text-[7.5rem] text-white italic leading-none drop-shadow-2xl">
            {name}
          </h1>
        </motion.div>
      </section>

      {/* 2. SECCIÓN PRINCIPAL: DATOS E IMAGEN */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative lg:sticky lg:top-40"
          >
            <div className="absolute -left-6 top-6 w-12 h-[1px] bg-white/20 hidden lg:block" />
            
            <div className="space-y-0 pt-4">
              {category && (
                <div className="flex items-center py-5 border-b border-white/10">
                  <span className="text-after-gold text-xs tracking-[0.2em] uppercase w-32 shrink-0">
                    {safeT('global.categoryLabel') || 'CATEGORÍA'}
                  </span>
                  <span className="text-after-gold text-xs mr-4">:</span>
                  <span className="text-white text-sm font-medium tracking-wide">
                    {category}
                  </span>
                </div>
              )}
              
              {base && (
                <div className="flex items-center py-5 border-b border-white/10">
                  <span className="text-after-gold text-xs tracking-[0.2em] uppercase w-32 shrink-0">
                    {safeT('global.baseLabel') || 'BASE'}
                  </span>
                  <span className="text-after-gold text-xs mr-4">:</span>
                  <span className="text-white text-sm font-medium tracking-wide">
                    {base}
                  </span>
                </div>
              )}
              
              {tags.length > 0 && (
                <div className="flex items-center py-5 border-b border-white/10">
                  <span className="text-after-gold text-xs tracking-[0.2em] uppercase w-32 shrink-0">
                    {safeT('global.profileLabel') || 'TAGS'}
                  </span>
                  <span className="text-after-gold text-xs mr-4">:</span>
                  <div className="flex flex-wrap gap-2 text-white text-sm font-medium tracking-wide">
                    {tags.map((tag, idx) => (
                      <span key={idx}>
                        {tag}{idx < tags.length - 1 ? <span className="mx-2 text-white/40">·</span> : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="relative w-full aspect-[16/9] lg:aspect-[900/500] bg-[#122A30] overflow-hidden group">
              
              {/* COMPONENTE ANIMATE PRESENCE PARA TRANSICIÓN SUAVE */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentImageSrc}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image 
                    src={currentImageSrc} 
                    alt={`${name} - Galería ${imageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority={imageIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-8 left-8 flex items-center gap-6 z-10">
                <div className="flex gap-3">
                  <button 
                    onClick={prevImage}
                    className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:text-after-gold hover:border-after-gold transition-colors bg-black/20 backdrop-blur-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:text-after-gold hover:border-after-gold transition-colors bg-black/20 backdrop-blur-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
                <span className="text-white/80 font-inter text-xl font-bold tracking-widest drop-shadow-md">
                  {displayCurrent} / {displayTotal}
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. SECCIÓN HISTORIA Y REDES SOCIALES */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <h3 className="font-playfair text-4xl text-white mb-8">
              {safeT('global.storyTitle') || 'Historia'}
            </h3>
            
            <div className="space-y-6 text-white/80 font-inter text-sm md:text-[15px] leading-relaxed tracking-wide text-justify md:text-left">
              {storyParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {quote && (
              <p className="font-inter text-after-gold text-sm md:text-[15px] mt-10">
                {quote}
              </p>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4 lg:pl-12 lg:border-l border-white/10 flex flex-col justify-center mt-12 lg:mt-0"
          >
            <span className="text-after-gold text-sm tracking-[0.2em] uppercase mb-6 font-medium">
              {safeT('global.followUs') || 'SÍGUENOS:'}
            </span>
            
            <div className="flex gap-4 mb-10">
              <a href={tGlobals('social.facebook')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#080808] border border-white/20 flex items-center justify-center text-white hover:text-after-gold hover:border-after-gold transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={tGlobals('social.instagram')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#080808] border border-white/20 flex items-center justify-center text-white hover:text-after-gold hover:border-after-gold transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href={tGlobals('social.tiktok')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#080808] border border-white/20 flex items-center justify-center text-white hover:text-after-gold hover:border-after-gold transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.5 3.96-1.82 5.36-1.5 1.49-3.59 2.28-5.69 2.05-2.06-.2-3.96-1.3-5.05-2.92-1.02-1.49-1.34-3.32-.97-5.05.3-1.46.99-2.82 2.05-3.86 1.41-1.37 3.3-2.09 5.25-2.11v4.02c-1.4.03-2.8.69-3.6 1.83-.69 1-1.02 2.26-.85 3.48.16 1.16.8 2.23 1.75 2.86 1.15.75 2.6.93 3.86.49 1.18-.41 2.07-1.36 2.45-2.56.2-.62.27-1.28.25-1.94v-14.65h-1.68z"/></svg>
              </a>
              <a href={tGlobals('social.spotify')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#080808] border border-white/20 flex items-center justify-center text-white hover:text-after-gold hover:border-after-gold transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              </a>
            </div>

            <a 
              href={tGlobals('social.whatsapp') || "https://wa.me/123456789"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative inline-flex items-center justify-center px-8 py-3.5 border border-white/20 hover:border-after-gold transition-all duration-500 overflow-hidden w-fit"
            >
              <div className="absolute inset-0 bg-after-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 font-inter text-[10px] tracking-[0.2em] uppercase font-medium text-white group-hover:text-black transition-colors duration-500">
                {safeT('global.bookWhatsapp') || 'Cotizar Evento'}
              </span>
            </a>

          </motion.div>

        </div>
      </section>

    </div>
  );
}