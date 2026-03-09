'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const brands = [
  { name: 'Bacardi', url: 'https://cdn.worldvectorlogo.com/logos/bacardi-logo-1.svg' },
  { name: 'Bombay Sapphire', url: 'https://cdn.worldvectorlogo.com/logos/bombay-sapphire-1.svg' },
  { name: 'Absolut', url: 'https://cdn.worldvectorlogo.com/logos/absolut-vodka.svg' },
  { name: 'Johnnie Walker', url: 'https://cdn.worldvectorlogo.com/logos/johnnie-walker-7.svg' },
  { name: 'Aperol', url: 'https://cdn.worldvectorlogo.com/logos/aperol-1919-logo-1.svg' },
];

const doubleBrands = [...brands, ...brands];

export default function BrandMarquee() {
  const t = useTranslations('BrandMarquee');

  return (
    <section className="relative w-full bg-[#080808] py-16 md:py-24 overflow-hidden">
      
      {/* Contenedor del Badge centrado */}
      <div className="mb-10 md:mb-16 flex justify-center w-full px-6">
        <div className="w-fit flex items-center justify-center px-6 py-2.5 lg:px-10 lg:py-3 rounded-[30px] border border-after-gold/20 bg-[#080808]/60 backdrop-blur-2xl text-after-gold text-[9px] md:text-[10px] lg:text-[11px] tracking-[0.3em] md:tracking-[0.5em] uppercase font-light text-center leading-normal">
          {t('title')}
        </div>
      </div>

      <div 
        className="flex relative items-center w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <motion.div 
          className="flex gap-16 md:gap-32 pr-16 md:pr-32 items-center whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 25, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {doubleBrands.map((brand, index) => (
            <div key={index} className="flex items-center justify-center min-w-[140px] md:min-w-[200px] h-12 md:h-16">
              {/* Imagen sin opacidad reducida, totalmente visible */}
              <img 
                src={brand.url} 
                alt={brand.name}
                className="max-w-full max-h-full object-contain"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(75%) sepia(35%) saturate(600%) hue-rotate(350deg) brightness(95%) contrast(90%)'
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}