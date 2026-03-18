'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ServiceDetails({ serviceId }: { serviceId: string }) {
  const t = useTranslations('Services');
  const tGlobals = useTranslations('Globals');
  const locale = useLocale();

  const safeT = (path: string) => {
    try {
      const val = t(path as any);
      return val.includes(path) ? '' : val;
    } catch { return ''; }
  };

  const extraButtonText = safeT(`${serviceId}.extraButton`);
  const closingText = safeT(`${serviceId}.closingText`);

  // --- LÓGICA DE NAVEGACIÓN DINÁMICA ---
  const customLink = safeT(`${serviceId}.customLink`); 
  const buttonHref = customLink ? `/${locale}${customLink}` : `/${locale}/menu/${serviceId}`;
  // -------------------------------------

  // Datos fijos para los pasos de invitaciones (para mantener el JSON limpio)
  const invitationSteps = [
    { num: '01', title: 'ACCESO CONTROLADO', desc: 'Un acceso privado que reúne todos los recuerdos del evento en un solo lugar, disponible para quienes formaron parte de la experiencia.' },
    { num: '02', title: 'EXPLORACIÓN LIMPIA', desc: 'Una navegación sin distracciones que permite recorrer cada imagen con calma, dejando que la atmósfera y los detalles hablen por sí solos.' },
    { num: '03', title: 'ARCHIVO PERMANENTE', desc: 'Porque los eventos terminan, pero los recuerdos no. Cada galería permanece organizada y disponible para volver a ese momento cuando lo desees.' }
  ];

  return (
    <div className="bg-[#080808] text-white font-inter selection:bg-after-gold selection:text-black min-h-screen pb-24 md:pb-32">
      
      {/* 1. HERO INMERSIVO */}
      <section className="relative w-full h-[65vh] lg:h-[80vh] flex flex-col items-center justify-end pb-20 lg:pb-28 overflow-hidden mb-16 lg:mb-24">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image 
            src={`/images/services/${serviceId}.jpg`}
            alt={t(`${serviceId}.title`)}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-[3s] ease-out opacity-60"
            priority
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/10 via-[#080808]/60 to-[#080808]" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <div className="flex items-center justify-center px-6 py-2.5 rounded-full border border-white/20 bg-[#080808]/40 backdrop-blur-md mb-8 lg:mb-10 shadow-2xl">
            <span className="text-after-gold text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-light">
              {t(`${serviceId}.breadcrumb`)}
            </span>
          </div>

          <h1 className="font-playfair text-6xl md:text-8xl lg:text-[7.5rem] text-white italic leading-none drop-shadow-2xl">
            {t(`${serviceId}.title`)}
          </h1>
        </motion.div>
      </section>

      {/* 2. EL CONTENIDO PRINCIPAL */}
      <section className="max-w-[1300px] mx-auto px-6 lg:px-12 pt-10 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24">
          
          <div className="lg:col-span-7 space-y-12 md:space-y-16">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <h2 className="font-playfair text-3xl md:text-4xl text-after-gold italic">
                {t(`${serviceId}.subtitle`)}
              </h2>
              <p className="text-white/80 font-light leading-[1.8] md:leading-[2] text-base md:text-lg xl:text-xl text-justify">
                {t(`${serviceId}.mainDescription`)}
              </p>
            </motion.div>

            <div className="border-t border-white/10 pt-12 md:pt-16">
              <h3 className="text-after-gold text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-semibold mb-8 md:mb-12">
                {t(`${serviceId}.includesTitle`)}
              </h3>
              
              {/* RENDERIZADO CONDICIONAL: Diseño de pasos para Invitaciones vs Texto normal */}
              {serviceId === 'invitations' ? (
                <div className="flex flex-col gap-10 md:gap-12">
                  {invitationSteps.map((step, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-8 group">
                      <span className="font-playfair text-6xl text-after-gold/20 group-hover:text-after-gold transition-colors duration-500 italic leading-none md:w-24 shrink-0">
                        {step.num}
                      </span>
                      <div className="flex-1 space-y-3 mt-2 md:mt-0 border-l border-white/5 pl-4 md:border-none md:pl-0">
                        <h4 className="text-white font-inter text-[10px] tracking-[0.3em] uppercase font-semibold">
                          {step.title}
                        </h4>
                        <p className="text-white/50 font-inter font-light text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 font-light leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {t(`${serviceId}.includesDescription`)}
                </p>
              )}
              
              {/* BOTÓN SECUNDARIO DINÁMICO */}
              {extraButtonText && (
                <div className="pt-12 md:pt-16 flex justify-start">
                  <Link 
                    href={buttonHref} 
                    className="group relative inline-flex justify-center items-center px-10 md:px-12 py-4 md:py-5 border border-after-gold bg-transparent overflow-hidden transition-all duration-700"
                  >
                    <span className="absolute inset-0 bg-after-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
                    <span className="relative z-10 font-inter text-after-gold group-hover:text-black text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium transition-colors duration-500 whitespace-nowrap">
                      {extraButtonText}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12 md:space-y-16 lg:pl-8 xl:pl-10 lg:border-l lg:border-white/5 mt-8 lg:mt-0">
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-after-gold text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-semibold">
                {t(`${serviceId}.sidebar.idealForTitle`)}
              </h4>
              <ul className="space-y-4 md:space-y-6">
                {[0, 1, 2].map((index) => {
                  const item = safeT(`${serviceId}.sidebar.idealForItems.${index}`);
                  if (!item) return null;
                  return (
                    <li key={index} className="text-white font-playfair text-xl md:text-2xl xl:text-3xl italic flex items-center gap-3 md:gap-4">
                      <span className="w-1.5 h-1.5 bg-after-gold rounded-full opacity-60 flex-shrink-0" />
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>

            {closingText && (
              <div className="bg-white/[0.02] p-6 md:p-8 border border-white/5 rounded-sm">
                <p className="font-playfair italic text-lg md:text-xl text-white/70 leading-relaxed">
                  "{closingText}"
                </p>
              </div>
            )}

            <div className="pt-4 md:pt-8 flex flex-col gap-6">
              <a 
                href={tGlobals('whatsappUrl')} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex justify-center items-center w-full px-6 md:px-8 py-5 md:py-6 bg-after-gold border border-after-gold overflow-hidden transition-all duration-700"
              >
                <span className="absolute inset-0 bg-[#080808] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
                <span className="relative z-10 font-inter text-[#080808] group-hover:text-after-gold text-[9px] md:text-[10px] xl:text-xs tracking-[0.2em] md:tracking-[0.3em] xl:tracking-[0.4em] uppercase font-bold transition-colors duration-500 text-center leading-snug w-full">
                  {t(`${serviceId}.sidebar.ctaButton`)}
                </span>
              </a>

              <Link 
                href={`/${locale}/#services`}
                className="text-center text-white/30 hover:text-white text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase transition-colors duration-300"
              >
                {t(`${serviceId}.sidebar.backButton`)}
              </Link>
            </div>

            <div className="pt-8 md:pt-10 border-t border-white/5">
              <p className="text-after-gold font-playfair text-lg md:text-xl mb-6 italic">
                {t(`${serviceId}.sidebar.followUs`)}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={tGlobals('social.facebook')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-after-gold hover:border-after-gold transition-all duration-300">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href={tGlobals('social.instagram')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-after-gold hover:border-after-gold transition-all duration-300">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}