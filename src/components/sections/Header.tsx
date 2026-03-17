'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    if (latest > 150 && latest > previous) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: t('nav.home'), href: '/' }, 
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.favorites'), href: '#favorites' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contact'), href: '#booking' }, 
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-500 font-inter ${
          scrolled || mobileMenuOpen
            ? 'bg-[#080808]/80 backdrop-blur-md' 
            : 'bg-transparent  border-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 md:h-28 flex items-center justify-between gap-4">
          
          {/* BLOQUE IZQUIERDO: Logo */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="relative z-[110]" onClick={() => setMobileMenuOpen(false)}>
              <img 
                src="/images/logo.png" 
                alt="After House" 
                className="h-6 md:h-12 w-auto object-contain brightness-110" 
              />
            </Link>
          </div>

          {/* BLOQUE CENTRAL: Navegación Desktop (Sistema Flexible) */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-10 flex-[2]">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-white/70 hover:text-after-gold text-[11px] xl:text-[12px] font-light tracking-[0.2em] uppercase transition-colors whitespace-nowrap cursor-pointer"
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-white/70 hover:text-after-gold text-[11px] xl:text-[12px] font-light tracking-[0.2em] uppercase transition-colors whitespace-nowrap cursor-pointer"
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* BLOQUE DERECHO: Idioma y CTA */}
          <div className="flex-1 flex items-center justify-end gap-4 md:gap-8">
            <div className="hidden xl:flex items-center gap-3 text-[10px] tracking-widest uppercase font-light text-white/40">
              <a 
                href="/es" 
                className={`transition-colors hover:text-after-gold ${locale === 'es' ? 'text-after-gold font-medium' : ''}`}
              >
                ES
              </a>
              <span className="text-white/10">|</span>
              <a 
                href="/en" 
                className={`transition-colors hover:text-after-gold ${locale === 'en' ? 'text-after-gold font-medium' : ''}`}
              >
                EN
              </a>
            </div>

            <a 
              href="#booking"
              className="hidden sm:block border border-after-gold text-after-gold px-6 xl:px-8 py-2.5 rounded-full text-[9px] xl:text-[10px] tracking-[0.2em] uppercase hover:bg-after-gold hover:text-black transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              {t('cta')}
            </a>

            {/* BOTÓN HAMBURGUESA MÓVIL */}
            <button 
              className="lg:hidden relative z-[110] w-12 h-12 flex flex-col items-center justify-center gap-1.5 touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span 
                animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1px] bg-white block"
              />
              <motion.span 
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-[1px] bg-white block"
              />
              <motion.span 
                animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1px] bg-white block"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* OVERLAY MENÚ MÓVIL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[#080808]/98 backdrop-blur-xl flex flex-col items-center justify-center lg:hidden"
          >
            {/* Margen superior para que el contenido no choque con el logo fijo */}
            <nav className="flex flex-col items-center gap-8 text-center w-full px-12 mt-20">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-playfair text-1xl italic text-white hover:text-after-gold transition-colors uppercase tracking-widest"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-playfair text-1xl italic text-white hover:text-after-gold transition-colors uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              
              <div className="w-1/4 h-px bg-after-gold/30 my-4" />

              <div className="flex items-center gap-8 text-[12px] tracking-[0.3em] uppercase font-light text-white/40 mb-2">
                <a 
                  href="/es" 
                  className={`transition-colors hover:text-after-gold ${locale === 'es' ? 'text-after-gold' : ''}`}
                >
                  Español
                </a>
                <span className="text-white/10">|</span>
                <a 
                  href="/en" 
                  className={`transition-colors hover:text-after-gold ${locale === 'en' ? 'text-after-gold' : ''}`}
                >
                  English
                </a>
              </div>

              <a 
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 border border-after-gold text-after-gold px-10 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase hover:bg-after-gold hover:text-black transition-all duration-300"
              >
                {t('cta')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}