'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Experience() {
  const t = useTranslations('Experience');

  const features = [
    { id: '01', text: t('features.item1') },
    { id: '02', text: t('features.item2') },
    { id: '03', text: t('features.item3') },
    { id: '04', text: t('features.item4') },
  ];

  return (
    <section id="experience" className="relative w-full bg-[#080808] py-24 lg:py-40 px-6 lg:px-12 xl:px-20 font-inter">
    
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 relative z-10">
        
        {/* COLUMNA IZQUIERDA: Contenido Sticky (Fijo) */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-40 flex flex-col items-start">
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl text-after-white leading-[1.15] tracking-tight mb-8"
            >
              {/* Resaltamos "AFTER HOUSE" en dorado e itálico si existe en el texto */}
              {t('title').split('AFTER HOUSE').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="italic text-after-gold">AFTER HOUSE</span>
                  )}
                </span>
              ))}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-inter text-after-white/70 text-base md:text-lg font-light leading-relaxed mb-12"
            >
              {t('description')}
            </motion.p>

            {/* Botón CTA Primario */}
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative px-12 py-5 bg-after-gold border border-after-gold overflow-hidden transition-all duration-700 hover:bg-transparent"
            >
              <span className="absolute inset-0 bg-[#080808] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
              <span className="relative z-10 font-inter text-[#080808] group-hover:text-after-gold text-[11px] md:text-xs tracking-[0.4em] uppercase font-medium transition-colors duration-500">
                {t('cta')}
              </span>
            </motion.button>

          </div>
        </div>

        {/* COLUMNA DERECHA: Lista de Pilares Animada */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col pt-8 lg:pt-0">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col md:flex-row items-start md:items-center py-10 border-t border-white/10 hover:border-after-gold/50 transition-colors duration-500"
            >
              {/* Número minimalista */}
              <span className="font-inter text-after-gold/40 group-hover:text-after-gold text-sm tracking-[0.2em] mb-4 md:mb-0 md:mr-10 transition-colors duration-500">
                {feature.id}
              </span>
              
              {/* Texto del pilar */}
              <h3 className="font-playfair text-2xl md:text-3xl text-after-white/90 group-hover:text-white transition-colors duration-500 leading-tight">
                {feature.text}
              </h3>
            </motion.div>
          ))}
          
          {/* Borde final para cerrar la lista */}
          <div className="w-full h-px bg-white/10" />
        </div>

      </div>

    </section>
  );
}