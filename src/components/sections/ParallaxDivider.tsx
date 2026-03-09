'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxDivider() {
  const t = useTranslations('Parallax');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[60vh] lg:h-[75vh] flex items-center justify-center overflow-hidden bg-[#080808] font-inter"
    >
      
      {/* IMAGEN DE FONDO CON PARALLAX */}
      <motion.div 
        style={{ y }}
        className="absolute inset-x-0 w-full h-[140%] -top-[20%] z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-[center_40%] grayscale-[0.2] brightness-[0.5]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1671061793559-e7b0be406b8a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` 
          }}
        />
      </motion.div>

      {/* OVERLAY GENERAL PARA HOMOGENEIZAR LA IMAGEN */}
      {/* 👇 Overlay actualizado a #080808 👇 */}
      <div className="absolute inset-0 z-10 bg-[#080808]/40 mix-blend-multiply pointer-events-none" />

      {/* 👇 BLOQUES DE DEGRADADO INFALIBLES CON #080808 👇 */}
      {/* Telón superior: Va de tu color #080808 a transparente */}
      <div className="absolute top-0 left-0 w-full h-[25%] bg-gradient-to-b from-[#080808] to-transparent z-20 pointer-events-none" />
      
      {/* Telón inferior: Va de tu color #080808 a transparente */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[#080808] to-transparent z-20 pointer-events-none" />
      
      {/* TEXTURA DE RUIDO */}
      <div className="absolute inset-0 z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none" />

      {/* TEXTO CENTRAL */}
      <div className="relative z-30 w-full max-w-5xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-after-gold italic leading-[1.15] tracking-tight px-4"
        >
          "{t('quote')}"
        </motion.h2>
      </div>

    </section>
  );
}