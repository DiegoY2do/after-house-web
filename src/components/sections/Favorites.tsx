'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Tus 7 cócteles reales
const cocktailKeys = [
  'valeria', 'signature2', 'signature3', 'signature4', 'signature5', 'signature6', 'signature7'
];

// LA MAGIA DEL INFINITO: Clonamos 3 al inicio y 3 al final para monitores ultra-anchos
const numClones = 3;
const extendedKeys = [
  ...cocktailKeys.slice(-numClones), // Últimos 3
  ...cocktailKeys,                   // Los 7 originales
  ...cocktailKeys.slice(0, numClones) // Primeros 3
];

export default function Favorites() {
  const t = useTranslations('Favorites');
  const locale = useLocale();
  const router = useRouter();
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0); 
  
  // Función para obtener medidas dinámicas
  const getLayout = () => {
    if (!carouselRef.current) return { step: 0 };
    const itemWidth = carouselRef.current.children[0].clientWidth;
    const gap = window.innerWidth >= 1024 ? 48 : 24;
    return { step: itemWidth + gap };
  };

  // Inicializar posición saltando los clones
  useEffect(() => {
    const { step } = getLayout();
    x.set(-numClones * step);
  }, [x]);

  const scrollToSlide = (targetIndex: number, animateScroll = true) => {
    const { step } = getLayout();
    
    // Calculamos hacia dónde debe moverse físicamente
    const targetX = -(targetIndex + numClones) * step;
    
    // Matemática pura: Aseguramos que el index visual siempre esté entre 0 y 6
    const displayIndex = (targetIndex % cocktailKeys.length + cocktailKeys.length) % cocktailKeys.length;
    setActiveIndex(displayIndex);

    if (animateScroll) {
      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 35,
        onComplete: () => {
          // TELETRANSPORTACIÓN INVISIBLE
          if (targetIndex >= cocktailKeys.length || targetIndex < 0) {
            x.set(-(displayIndex + numClones) * step);
          }
        }
      });
    } else {
      x.set(-(displayIndex + numClones) * step);
    }
  };

  const nextSlide = () => scrollToSlide(activeIndex + 1);
  const prevSlide = () => scrollToSlide(activeIndex - 1);

  // Autoplay (Pausado si lo prefieres, pero funciona perfecto)
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleCardClick = (arrayIndex: number, isActive: boolean, key: string) => {
    if (!isActive) {
      // Si hacen clic en una tarjeta de los extremos, el carrusel fluye hacia ella
      scrollToSlide(arrayIndex - numClones);
    } else {
      // Si hacen clic en la central, entran a ver la historia
      router.push(`/${locale}/favorites/${key}`);
    }
  };

  return (
    <section id="favorites" className="relative w-full bg-[#080808] py-24 lg:py-32 overflow-hidden font-inter selection:bg-after-gold selection:text-black">
      
      {/* HEADER PREMIUM */}
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-20 mb-16 lg:mb-24 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="mb-8 flex justify-center w-full"
        >
          <div className="w-fit flex items-center justify-center px-6 py-2.5 lg:px-8 lg:py-3 rounded-[30px] border border-after-gold/20 bg-after-black/60 backdrop-blur-xl text-after-gold text-[9px] md:text-[10px] lg:text-[11px] tracking-[0.2em] lg:tracking-[0.6em] uppercase font-light text-center leading-normal">
            {t('badge')}
          </div>
        </motion.div>
        
        <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem] text-white italic leading-none drop-shadow-2xl">
          {t('title')}
        </h2>
      </div>

      <div className="w-full relative">
        {/* CARRUSEL INFINITO */}
        <motion.div 
          ref={carouselRef}
          style={{ x }}
          className="flex items-center gap-6 lg:gap-12 px-[7.5vw] md:px-[30vw] lg:px-[36.5vw]"
        >
          {extendedKeys.map((key, index) => {
            // Calculamos cuál es la tarjeta real (0 a 6) sin importar cuántos clones haya
            const realIndex = (index - numClones + cocktailKeys.length) % cocktailKeys.length;
            const isActive = activeIndex === realIndex;

            return (
              <motion.div
                key={`${key}-${index}`}
                onClick={() => handleCardClick(index, isActive, key)}
                className={`
                  group relative flex-shrink-0 cursor-pointer rounded-sm overflow-hidden
                  w-[85vw] md:w-[40vw] lg:w-[28vw] xl:w-[24vw] aspect-[3/4] lg:aspect-[4/5]
                  transition-all duration-[800ms] ease-out
                  ${isActive ? 'scale-100 opacity-100 shadow-2xl shadow-black' : 'scale-[0.85] opacity-30'}
                `}
              >
                <Image 
                  src={`/images/cocktails/${key}.webp`} 
                  alt={key}
                  fill
                  sizes="(max-width: 1024px) 85vw, 25vw"
                  className={`object-cover transition-all duration-[1.5s] ease-out ${isActive ? 'grayscale-0 scale-105' : 'grayscale'}`}
                />
                
                {/* Velo Oscuro Degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent opacity-90 lg:opacity-80" />

                {/* Contenido Editorial flotante */}
                <div className={`absolute bottom-0 left-0 w-full p-8 lg:p-10 flex flex-col items-center text-center transition-all duration-[800ms] ease-out ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
                  
                  <p className="font-inter text-after-gold text-[9px] tracking-[0.4em] uppercase mb-4 opacity-80">
                    {t(`cocktails.${key}.tags`)}
                  </p>
                  
                  <h3 className="font-playfair text-3xl lg:text-4xl text-white italic mb-8">
                    {t(`cocktails.${key}.name`)}
                  </h3>

                  {/* Botón CTA */}
                  <div className="overflow-hidden">
                    <div className="relative inline-flex justify-center items-center px-8 py-3 border border-after-gold/40 group-hover:bg-after-gold transition-all duration-500">
                      <span className="font-inter text-after-gold group-hover:text-black text-[9px] tracking-[0.3em] uppercase font-medium transition-colors duration-500">
                        Descubrir
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CONTROLES */}
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
                  activeIndex === index ? 'w-8 h-1.5 bg-after-gold' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}