'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';

// 1. Animación de Entrada del Badge
const badgeEntranceVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 2.5, 
    filter: 'blur(15px)', 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1], 
    } 
  },
};

// 2. Orquestador de Contenido
const contentContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.4, 
    },
  },
};

const staggeredItemVariants: Variants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
};

export default function Hero() {
  const t = useTranslations('Index');

  return (
    /* AJUSTE CLAVE: 
       - pt-32 (Padding top móvil para compensar el header)
       - lg:pt-48 (Padding top escritorio para dar aire editorial)
    */
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#080808] font-inter pt-8 lg:pt-38">
      
      {/* Fondo Cinemático Integrado After House */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale-[0.2] brightness-[0.35]"
          style={{ backgroundImage: `url('https://galeria.afterhouse.com.mx/uploads/ah_evento_69abd0a37a168.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808] opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
      </div>

      {/* Partículas Sparkle */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 rounded-full" 
            style={{
              width: '1px',
              height: '1px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              boxShadow: '0 0 8px 1px rgba(255, 255, 255, 0.1)',
            }}
            animate={{ opacity: [0, 0.6, 0], scale: [0, 1.2, 0] }}
            transition={{ duration: Math.random() * 5 + 3, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* Estructura Centralizada Editorial */}
      <div className="relative z-20 w-full max-w-5xl px-6 text-center flex flex-col items-center">
        
        {/* BADGE */}
        <motion.div 
          variants={badgeEntranceVariants}
          initial="hidden"
          animate="visible"
          className="mb-14 lg:mb-20 flex justify-center w-full"
        >
          <div className="w-fit flex items-center justify-center px-6 py-2.5 lg:px-10 lg:py-3 rounded-[30px] border border-after-gold/20 bg-after-black/60 backdrop-blur-2xl text-after-gold text-[9px] md:text-[10px] lg:text-[12px] tracking-[0.2em] lg:tracking-[0.7em] uppercase font-light text-center leading-normal max-w-[90vw]">
            {t('badge')}
          </div>
        </motion.div>

        {/* CONTENEDOR DE TEXTO */}
        <motion.div
          variants={contentContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.h1 
            variants={staggeredItemVariants}
            className="font-playfair text-[12vw] md:text-7xl lg:text-8xl text-after-white leading-[0.95] tracking-tight mb-12 italic"
          >
            {t('title')}
          </motion.h1>

          <motion.p 
            variants={staggeredItemVariants}
            className="font-inter text-after-white/80 text-base md:text-2xl max-w-2xl font-light leading-relaxed mb-16"
          >
            {t('subtitle')}
          </motion.p>

          <motion.button 
            variants={staggeredItemVariants}
            className="group relative px-16 py-6 border border-after-gold/20 overflow-hidden transition-all duration-700 hover:border-after-gold"
          >
            <span className="absolute inset-0 bg-after-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
            <span className="relative z-10 font-inter text-after-gold group-hover:text-after-black text-[12px] tracking-[0.5em] uppercase font-light transition-colors duration-500">
              {t('cta')}
            </span>
          </motion.button>
        </motion.div>
      </div>

    </section>
  );
}