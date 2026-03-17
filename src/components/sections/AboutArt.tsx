'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutArt() {
  const t = useTranslations('AboutArt');

  const safeT = (path: string) => {
    try {
      const val = t(path as any);
      return val.includes(path) ? '' : val;
    } catch { return ''; }
  };

  // Definimos las 3 características principales
  const features = [0, 1, 2];

  return (
    <section className="w-full bg-[#080808] py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Encabezado de la sección */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24 flex flex-col items-center"
        >
          <span className="text-after-gold text-[10px] tracking-[0.4em] uppercase font-semibold mb-4 block">
            {safeT('badge') || 'EL ARTE'}
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl text-white italic max-w-2xl">
            {safeT('title') || 'La Obsesión por el Detalle'}
          </h2>
        </motion.div>

        {/* Cuadrícula de 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {features.map((index) => {
            const featureTitle = safeT(`items.${index}.title`);
            const featureDesc = safeT(`items.${index}.description`);
            const featureImage = safeT(`items.${index}.image`) || `/images/services/detail-${index + 1}.jpg`;

            if (!featureTitle) return null;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="flex flex-col group"
              >
                {/* Imagen vertical (Aspect Ratio 3:4) */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#080808] mb-8 border border-white/5">
                  <Image 
                    src={featureImage}
                    alt={featureTitle}
                    fill
                    className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
                
                {/* Contenido de texto */}
                <div className="border-t border-after-gold/30 pt-6">
                  <h3 className="font-playfair text-2xl text-white mb-4 italic group-hover:text-after-gold transition-colors">
                    {featureTitle}
                  </h3>
                  <p className="text-white/60 font-inter text-sm leading-relaxed font-light text-justify">
                    {featureDesc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}