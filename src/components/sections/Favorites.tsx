'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const cocktailKeys = [
  'valeria', 'valeria', 'valeria', 'valeria', 'valeria', 'valeria', 'valeria'
];

// Extendemos para el efecto infinito
const extendedKeys = [
  cocktailKeys[cocktailKeys.length - 1],
  ...cocktailKeys,
  cocktailKeys[0]
];

export default function Favorites() {
  const t = useTranslations('Favorites');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0); // Usamos MotionValue para un control preciso
  
  // Función para obtener medidas dinámicas
  const getLayout = () => {
    if (!carouselRef.current) return { step: 0 };
    const itemWidth = carouselRef.current.children[0].clientWidth;
    const gap = window.innerWidth >= 1024 ? 48 : 24;
    return { step: itemWidth + gap };
  };

  // Inicializar posición
  useEffect(() => {
    const { step } = getLayout();
    x.set(-step);
  }, []);

  const scrollToSlide = (index: number, animateScroll = true) => {
    const { step } = getLayout();
    const targetX = -(index + 1) * step;

    if (animateScroll) {
      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 35,
        onComplete: () => {
          // Lógica de Teletransportación Infinita
          if (index >= cocktailKeys.length) {
            x.set(-step);
            setActiveIndex(0);
          } else if (index < 0) {
            x.set(-cocktailKeys.length * step);
            setActiveIndex(cocktailKeys.length - 1);
          }
        }
      });
    } else {
      x.set(targetX);
    }
    
    // Actualizar index visual inmediatamente para los dots
    const displayIndex = (index + cocktailKeys.length) % cocktailKeys.length;
    setActiveIndex(displayIndex);
  };

  const nextSlide = () => scrollToSlide(activeIndex + 1);
  const prevSlide = () => scrollToSlide(activeIndex - 1);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section id="favorites" className="relative w-full bg-[#080808] py-24 lg:py-32 overflow-hidden font-inter ">
      {/* Header igual al tuyo */}
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-20 mb-12 lg:mb-20 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="w-fit px-8 py-3 rounded-[30px] border border-after-gold/20 bg-after-black/60 backdrop-blur-xl text-after-gold text-[11px] tracking-[0.6em] uppercase font-light">
            {t('badge')}
          </div>
        </motion.div>
        
        <h2 className="font-playfair text-4xl md:text-7xl text-after-white italic leading-tight mb-6">
          {t('title')}
        </h2>
      </div>

      <div className="w-full relative">
        {/* Contenedor Animado con Framer Motion */}
        <motion.div 
          ref={carouselRef}
          style={{ x }}
          className="flex gap-6 lg:gap-12 px-[7.5vw] md:px-[30vw] lg:px-[36.5vw]"
        >
          {extendedKeys.map((key, index) => {
            const isCloneStart = index === 0;
            const isCloneEnd = index === extendedKeys.length - 1;
            const realIndex = isCloneStart ? cocktailKeys.length - 1 : isCloneEnd ? 0 : index - 1;
            const isActive = activeIndex === realIndex;

            return (
              <motion.div
                key={`${key}-${index}`}
                onClick={() => scrollToSlide(realIndex)}
                className={`
                  relative flex-shrink-0 cursor-pointer rounded-sm overflow-hidden
                  w-[85vw] md:w-[40vw] lg:w-[28vw] xl:w-[26vw] aspect-[3/4]
                  transition-all duration-700
                  ${isActive ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-40'}
                `}
              >
                <img 
                  src={`/images/cocktails/${key}.webp`} 
                  alt={key}
                  className={`w-full h-full object-cover ${isActive ? 'grayscale-0' : 'grayscale-[0.6]'}`}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent opacity-80" />

                <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 p-6 transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <h3 className="font-playfair text-xl text-after-gold mb-2">{t(`cocktails.${key}.name`)}</h3>
                  <p className="font-inter text-white/80 text-xs tracking-widest uppercase">{t(`cocktails.${key}.tags`)}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Controles (Mismos que los tuyos) */}
        <div className="flex flex-col items-center gap-6 mt-12">
          <div className="flex gap-4">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-after-gold hover:text-after-gold text-white transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-after-gold hover:text-after-gold text-white transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {cocktailKeys.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  activeIndex === index ? 'w-8 h-1.5 bg-after-gold' : 'w-1.5 h-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}