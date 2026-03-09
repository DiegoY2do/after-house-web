'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Usamos llaves para referenciar los elementos en el JSON
const testimonialKeys = ['t1', 't2', 't3'];

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonialKeys.length - 1 ? 0 : prev + 1));
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonialKeys.length - 1 : prev - 1));
  }, []);

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Cambio automático cada 6 segundos
  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section id="testimonials" className="relative w-full py-24 md:py-40 bg-[#080808] overflow-hidden flex flex-col items-center ">
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
      
      {/* Comilla gigante de fondo (Ajustada para no interferir) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none">
        <span className="font-playfair text-after-gold opacity-[0.05] text-[60vh] md:text-[80vh] leading-none transform -translate-y-10">
          “
        </span>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 font-inter">
        
        {/* Contenedor del Testimonio */}
        <div className="relative min-h-[350px] md:min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="font-playfair italic text-2xl md:text-4xl lg:text-5xl text-white leading-[1.3] mb-12">
                “{t(`items.${testimonialKeys[currentIndex]}.quote`)}”
              </p>
              
              <div className="flex flex-col items-center uppercase tracking-[0.3em] text-[10px] md:text-xs">
                <span className="text-after-gold font-bold mb-2">
                  {t(`items.${testimonialKeys[currentIndex]}.author`)}
                </span>
                <span className="text-white/40 font-light">
                  {t(`items.${testimonialKeys[currentIndex]}.title`)} — {t(`items.${testimonialKeys[currentIndex]}.event`)}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTROLES UNIFICADOS */}
        <div className="flex flex-col items-center justify-center gap-6 mt-12">
          
          {/* Botones de Navegación */}
          <div className="flex gap-4">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 hover:border-after-gold hover:text-after-gold text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 hover:border-after-gold hover:text-after-gold text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>

          {/* Dots / Indicadores */}
          <div className="flex items-center gap-2.5">
            {testimonialKeys.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`transition-all duration-500 rounded-full ${
                  currentIndex === index 
                    ? 'w-8 h-1.5 bg-after-gold' 
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40' 
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}