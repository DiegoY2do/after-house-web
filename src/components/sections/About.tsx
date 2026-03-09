'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function About() {
  const t = useTranslations('About');

  return (
    <section id="about" className="relative w-full bg-[#080808] py-24 lg:py-40 px-6 lg:px-12 xl:px-20 overflow-hidden font-inter ">
      
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* COLUMNA IZQUIERDA: Texto (Manifiesto) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-start"
        >
          {/* Badge */}
          <div className="w-fit flex items-center justify-center px-6 py-2 rounded-[30px] border border-after-gold/20 bg-after-black/60 backdrop-blur-xl text-after-gold text-[10px] tracking-[0.4em] uppercase font-light mb-10">
            {t('badge')}
          </div>

          {/* Título Principal */}
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl text-after-white leading-[1.15] tracking-tight mb-8">
            {t('title').split(' ').map((word, index) => (
              <span key={index} className={word.toLowerCase() === 'inolvidables' || word.toLowerCase() === 'unforgettable' ? 'italic text-after-gold' : ''}>
                {word}{' '}
              </span>
            ))}
          </h2>

          {/* Línea divisoria dorada sutil */}
          <div className="w-12 h-px bg-after-gold/40 mb-8" />

          {/* Párrafos descriptivos */}
          <p className="font-inter text-after-white/70 text-base md:text-lg font-light leading-relaxed mb-6">
            {t('paragraph1')}
          </p>
          <p className="font-inter text-after-white/70 text-base md:text-lg font-light leading-relaxed mb-12">
            {t('paragraph2')}
          </p>

          {/* Botón CTA consistente con el resto del sitio */}
          <button className="group relative px-12 py-4 border border-after-gold/30 bg-transparent overflow-hidden transition-all duration-700 hover:border-after-gold">
            <span className="absolute inset-0 bg-after-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
            <span className="relative z-10 font-inter text-after-gold group-hover:text-after-black text-[11px] tracking-[0.4em] uppercase font-medium transition-colors duration-500">
              {t('cta')}
            </span>
          </button>
        </motion.div>

        {/* COLUMNA DERECHA: Imagen Editorial con Parallax sutil */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 lg:col-start-8 relative mt-10 lg:mt-0"
        >
          {/* Marco estético vertical (Aspect Ratio 4:5) */}
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm group">
            <img 
              src="https://galeria.afterhouse.com.mx/uploads/ah_evento_69abd0a37a168.webp" 
              alt="After House Experience"
              className="w-full h-full object-cover grayscale-[0.3] brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[0.16,1,0.3,1]"
            />
            {/* Overlay sutil para oscurecer los bordes */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#080808]/40 via-transparent to-transparent opacity-80" />
            
            {/* Esquinas decorativas doradas (minimalismo premium) */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-after-gold/50" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-after-gold/50" />
          </div>

          {/* Bloque decorativo de profundidad (Visible solo en desktop) */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-white/5 -z-10 hidden md:block" />
        </motion.div>

      </div>
    </section>
  );
}