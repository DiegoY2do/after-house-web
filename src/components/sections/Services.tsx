'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image'; // <-- IMPORTANTE: Importamos el optimizador de Next.js

const services = [
  { id: 'mixology', size: 'lg:col-span-8 lg:row-span-2' },
  { id: 'barman', size: 'lg:col-span-4 lg:row-span-1' },
  { id: 'glassware', size: 'lg:col-span-4 lg:row-span-1' },
  { id: 'shots', size: 'lg:col-span-4 lg:row-span-2' },
  { id: 'foosball', size: 'lg:col-span-4 lg:row-span-1' },
  { id: 'photobooth', size: 'lg:col-span-4 lg:row-span-2' },
  { id: 'catering', size: 'lg:col-span-4 lg:row-span-1' },
  { id: 'invitations', size: 'lg:col-span-4 lg:row-span-1' },
  { id: 'dj', size: 'lg:col-span-8 lg:row-span-1' },
];

const extendedServices = [
  services[services.length - 1],
  ...services,
  services[0]
];

export default function Services() {
  const t = useTranslations('Services');
  const [activeIndex, setActiveIndex] = useState(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const getLayout = useCallback(() => {
    if (!carouselRef.current) return { step: 0 };
    const itemWidth = carouselRef.current.children[0].clientWidth;
    const gap = 24; 
    return { step: itemWidth + gap };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      const { step } = getLayout();
      x.set(-step);
    }
  }, [getLayout, x]);

  const scrollToSlide = useCallback((index: number, animateScroll = true) => {
    if (window.innerWidth >= 1024) return;

    const { step } = getLayout();
    const targetX = -(index + 1) * step;

    if (animateScroll) {
      animate(x, targetX, {
        type: "tween",
        ease: "easeInOut",
        duration: 0.4, 
        onComplete: () => {
          if (index >= services.length) {
            x.set(-step);
            setActiveIndex(0);
          } 
          else if (index < 0) {
            x.set(-services.length * step);
            setActiveIndex(services.length - 1);
          }
        }
      });
    } else {
      x.set(targetX);
    }
    
    const displayIndex = (index + services.length) % services.length;
    setActiveIndex(displayIndex);
  }, [getLayout, x]);

  const handleNext = useCallback(() => {
    scrollToSlide(activeIndex + 1);
  }, [activeIndex, scrollToSlide]);

  const handlePrev = useCallback(() => {
    scrollToSlide(activeIndex - 1);
  }, [activeIndex, scrollToSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 1024) {
        scrollToSlide(activeIndex + 1);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [activeIndex, scrollToSlide]);

const renderCard = (service: typeof services[0], index: number, isMobileClone = false) => (
    <div
      key={isMobileClone ? `clone-${service.id}-${index}` : service.id}
      className={`
        group relative overflow-hidden rounded-sm bg-[#0a0a0a] border border-white/5 
        hover:border-after-gold/30 transition-colors duration-300 cursor-pointer
        flex-shrink-0 transform-gpu
        w-[85vw] md:w-[45vw] lg:w-auto 
        h-[400px] md:h-[450px] lg:h-auto
        ${service.size}
      `}
    >
      <div className="absolute inset-0 overflow-hidden bg-[#080808]">
        <Image 
          src={`/images/services/${service.id}.jpg`} 
          alt={t(`${service.id}.title`)}
          fill
          sizes="(max-width: 1024px) 85vw, 50vw"
          priority={index < 3}
          /* El cambio está aquí: quitamos grayscale y opacity-30 de la vista móvil y le agregamos el prefijo lg: */
          className="object-cover lg:grayscale lg:opacity-30 lg:group-hover:grayscale-0 lg:group-hover:opacity-60 lg:group-hover:scale-105 transition-[filter,opacity,transform] duration-500 transform-gpu"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent opacity-90 lg:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="absolute inset-0 p-8 xl:p-10 flex flex-col justify-end z-20 pointer-events-none">
        <div className="transform lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h3 className="font-playfair text-2xl lg:text-3xl xl:text-4xl text-after-white mb-0 italic">
            {t(`${service.id}.title`)}
          </h3>
          
          <div className="overflow-hidden">
            <p className="font-inter text-after-white/70 text-sm xl:text-base font-light leading-relaxed mt-3 pt-3 border-t border-after-gold/20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
              {t(`${service.id}.description`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="services" className="scroll-mt-24 relative w-full bg-[#080808] py-24 lg:py-32 overflow-hidden font-inter">
      
      <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 rounded-full will-change-[opacity]"
            style={{
              width: Math.random() * 1.5 + 0.5 + 'px',
              height: Math.random() * 1.5 + 0.5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-20 mb-12 lg:mb-20 flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">
        <div className="mb-6 lg:mb-8 flex justify-center lg:justify-start w-full">
          <div className="w-fit flex items-center justify-center px-6 py-2.5 lg:px-8 lg:py-3 rounded-[30px] border border-after-gold/20 bg-after-black/60 backdrop-blur-xl text-after-gold text-[9px] md:text-[10px] lg:text-[11px] tracking-[0.2em] lg:tracking-[0.6em] uppercase font-light text-center leading-normal max-w-[90vw]">
            {t('badge')}
          </div>
        </div>
        
        <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-after-white italic leading-[1.05] tracking-tight">
          {t('mainTitle')}
        </h2>
      </div>

      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        
        <div className="hidden lg:grid grid-cols-12 auto-rows-[300px] gap-8 px-12 xl:px-20">
          {services.map((service, index) => renderCard(service, index))}
        </div>

        <div className="block lg:hidden relative w-full overflow-hidden">
          <motion.div 
            ref={carouselRef}
            style={{ x }}
            className="flex gap-6 px-[7.5vw] md:px-[27.5vw]"
          >
            {extendedServices.map((service, index) => renderCard(service, index, true))}
          </motion.div>
        </div>

        <div className="flex lg:hidden flex-col items-center justify-center gap-6 mt-12">
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

          <div className="flex items-center gap-2.5">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                aria-label={`Ir a tarjeta ${index + 1}`}
                className={`transition-all duration-500 rounded-full ${
                  activeIndex === index 
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