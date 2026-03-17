'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function GalleryDemoProcess() {
  const t = useTranslations('GalleryDemo');

  const steps = [1, 2, 3];

  return (
    <section className="bg-[#080808] py-24 lg:py-40 px-6 lg:px-12 relative overflow-hidden">
      {/* Glow sutil de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-after-gold/20 to-transparent" />
      
      <div className="max-w-[1300px] mx-auto">
        
        {/* BLOQUE 1: MANIFIESTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 lg:mb-48 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <h2 className="font-playfair text-4xl md:text-6xl text-white italic leading-tight">
              {t('infoTitle')}
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <p className="text-white/60 font-inter font-light text-lg md:text-xl leading-relaxed text-justify md:text-left italic border-l border-after-gold/30 pl-8">
              {t('infoDesc')}
            </p>
          </motion.div>
        </div>

        {/* BLOQUE 2: PASOS (CÓMO FUNCIONA) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {steps.map((step) => (
            <motion.div 
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step * 0.15, duration: 0.8 }}
              className="group"
            >
              <span className="font-playfair text-7xl md:text-8xl text-after-gold/10 group-hover:text-after-gold/30 transition-colors duration-700 block mb-6 italic">
                0{step}
              </span>
              <div className="space-y-4">
                <h3 className="text-after-gold font-inter text-[10px] tracking-[0.4em] uppercase font-semibold">
                  {t(`steps.step${step}.title`)}
                </h3>
                <p className="text-white/50 font-inter font-light text-sm leading-relaxed text-justify md:text-left group-hover:text-white/80 transition-colors duration-500">
                  {t(`steps.step${step}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}