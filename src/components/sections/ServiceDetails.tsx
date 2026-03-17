'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ServiceDetails({ serviceId }: { serviceId: string }) {
  const t = useTranslations('Services');
  const tGlobals = useTranslations('Globals');
  const locale = useLocale();

  const safeT = (path: string) => {
    try {
      const val = t(path as any);
      return val.includes(path) ? '' : val;
    } catch { return ''; }
  };

  const extraButtonText = safeT(`${serviceId}.extraButton`);
  const closingText = safeT(`${serviceId}.closingText`);

  // --- LÓGICA DE NAVEGACIÓN DINÁMICA ---
  // 1. Buscamos si el servicio tiene una ruta personalizada en el JSON (ej. /gallery-demo)
  const customLink = safeT(`${serviceId}.customLink`); 

  // 2. Si hay un link personalizado lo usamos, si no, mandamos al menú por defecto
  const buttonHref = customLink ? `/${locale}${customLink}` : `/${locale}/menu/${serviceId}`;
  // -------------------------------------

  return (
    <div className="bg-[#080808] text-white font-inter selection:bg-after-gold selection:text-black min-h-screen pb-24 md:pb-32">
      
      {/* 1. HERO INMERSIVO (Estilo Ultra-Lujo unificado con Favoritos) */}
      <section className="relative w-full h-[65vh] lg:h-[80vh] flex flex-col items-center justify-end pb-20 lg:pb-28 overflow-hidden mb-16 lg:mb-24">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image 
            src={`/images/services/${serviceId}.jpg`}
            alt={t(`${serviceId}.title`)}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-[3s] ease-out opacity-60"
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
          <div className="flex items-center justify-center px-6 py-2.5 rounded-full border border-white/20 bg-[#080808]/40 backdrop-blur-md mb-8 lg:mb-10 shadow-2xl">
            <span className="text-after-gold text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-light">
              {t(`${serviceId}.breadcrumb`)}
            </span>
          </div>

          <h1 className="font-playfair text-6xl md:text-8xl lg:text-[7.5rem] text-white italic leading-none drop-shadow-2xl">
            {t(`${serviceId}.title`)}
          </h1>
        </motion.div>
      </section>

      {/* 2. EL CONTENIDO */}
      <section className="max-w-[1300px] mx-auto px-6 lg:px-12 pt-10 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24">
          
          <div className="lg:col-span-7 space-y-12 md:space-y-16">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <h2 className="font-playfair text-3xl md:text-4xl text-after-gold italic">
                {t(`${serviceId}.subtitle`)}
              </h2>
              <p className="text-white/80 font-light leading-[1.8] md:leading-[2] text-base md:text-lg xl:text-xl text-justify">
                {t(`${serviceId}.mainDescription`)}
              </p>
            </motion.div>

            <div className="border-t border-white/10 pt-12 md:pt-16 space-y-6 md:space-y-8">
              <h3 className="text-after-gold text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-semibold">
                {t(`${serviceId}.includesTitle`)}
              </h3>
              <p className="text-white/60 font-light leading-relaxed text-base md:text-lg">
                {t(`${serviceId}.includesDescription`)}
              </p>
              
              {/* BOTÓN SECUNDARIO DINÁMICO */}
              {extraButtonText && (
                <div className="pt-6 md:pt-8 flex justify-start">
                  <Link 
                    href={buttonHref} 
                    className="group relative inline-flex justify-center items-center px-10 md:px-12 py-4 md:py-5 border border-after-gold bg-transparent overflow-hidden transition-all duration-700"
                  >
                    <span className="absolute inset-0 bg-after-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
                    <span className="relative z-10 font-inter text-after-gold group-hover:text-black text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium transition-colors duration-500 whitespace-nowrap">
                      {extraButtonText}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12 md:space-y-16 lg:pl-8 xl:pl-10 lg:border-l lg:border-white/5 mt-8 lg:mt-0">
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-after-gold text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-semibold">
                {t(`${serviceId}.sidebar.idealForTitle`)}
              </h4>
              <ul className="space-y-4 md:space-y-6">
                {[0, 1, 2].map((index) => {
                  const item = safeT(`${serviceId}.sidebar.idealForItems.${index}`);
                  if (!item) return null;
                  return (
                    <li key={index} className="text-white font-playfair text-xl md:text-2xl xl:text-3xl italic flex items-center gap-3 md:gap-4">
                      <span className="w-1.5 h-1.5 bg-after-gold rounded-full opacity-60 flex-shrink-0" />
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>

            {closingText && (
              <div className="bg-white/[0.02] p-6 md:p-8 border border-white/5 rounded-sm">
                <p className="font-playfair italic text-lg md:text-xl text-white/70 leading-relaxed">
                  "{closingText}"
                </p>
              </div>
            )}

            <div className="pt-4 md:pt-8 flex flex-col gap-6">
              <a 
                href={tGlobals('whatsappUrl')} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex justify-center items-center w-full px-6 md:px-8 py-5 md:py-6 bg-after-gold border border-after-gold overflow-hidden transition-all duration-700"
              >
                <span className="absolute inset-0 bg-[#080808] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
                <span className="relative z-10 font-inter text-[#080808] group-hover:text-after-gold text-[9px] md:text-[10px] xl:text-xs tracking-[0.2em] md:tracking-[0.3em] xl:tracking-[0.4em] uppercase font-bold transition-colors duration-500 text-center leading-snug w-full">
                  {t(`${serviceId}.sidebar.ctaButton`)}
                </span>
              </a>

              <Link 
                href={`/${locale}/#services`}
                className="text-center text-white/30 hover:text-white text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase transition-colors duration-300"
              >
                {t(`${serviceId}.sidebar.backButton`)}
              </Link>
            </div>

            <div className="pt-8 md:pt-10 border-t border-white/5">
              <p className="text-after-gold font-playfair text-lg md:text-xl mb-6 italic">
                {t(`${serviceId}.sidebar.followUs`)}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={tGlobals('social.facebook')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-after-gold hover:border-after-gold transition-all duration-300">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href={tGlobals('social.instagram')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-after-gold hover:border-after-gold transition-all duration-300">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href={tGlobals('social.tiktok')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-after-gold hover:border-after-gold transition-all duration-300">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.5 3.96-1.82 5.36-1.5 1.49-3.59 2.28-5.69 2.05-2.06-.2-3.96-1.3-5.05-2.92-1.02-1.49-1.34-3.32-.97-5.05.3-1.46.99-2.82 2.05-3.86 1.41-1.37 3.3-2.09 5.25-2.11v4.02c-1.4.03-2.8.69-3.6 1.83-.69 1-1.02 2.26-.85 3.48.16 1.16.8 2.23 1.75 2.86 1.15.75 2.6.93 3.86.49 1.18-.41 2.07-1.36 2.45-2.56.2-.62.27-1.28.25-1.94v-14.65h-1.68z"/></svg>
                </a>
                <a href={tGlobals('social.spotify')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-after-gold hover:border-after-gold transition-all duration-300">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}