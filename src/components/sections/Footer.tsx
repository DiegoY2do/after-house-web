'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#080808] pt-24 pb-10 overflow-hidden font-inter text-white">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* COLUMNA 1: Logo y Misión */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="#home" className="inline-block mb-6">
              {/* Cambia la ruta del src por la ubicación real de tu logo */}
              <img 
                src="/images/logo.png" 
                alt="After House" 
                className="h-10 md:h-14 w-auto opacity-90 hover:opacity-100 transition-opacity" 
              />
            </Link>
            <p className="text-white/40 text-sm font-light leading-relaxed mb-6 pr-4">
              {t('brand.description')}
            </p>
          </motion.div>

          {/* COLUMNA 2: Navegación Rápida */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white uppercase tracking-[0.2em] text-[11px] mb-6">{t('nav.title')}</h4>
            <ul className="space-y-4 text-sm font-light text-white/40">
              <li><Link href="#hero" className="hover:text-after-gold transition-colors">{t('nav.home')}</Link></li>
              <li><Link href="#services" className="hover:text-after-gold transition-colors">{t('nav.services')}</Link></li>
              <li><Link href="#about" className="hover:text-after-gold transition-colors">{t('nav.about')}</Link></li>
              <li><Link href="#favorites" className="hover:text-after-gold transition-colors">{t('nav.favorites')}</Link></li>
              <li><Link href="#testimonials" className="hover:text-after-gold transition-colors">{t('nav.testimonials')}</Link></li>
            </ul>
          </motion.div>

          {/* COLUMNA 3: Contacto Directo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white uppercase tracking-[0.2em] text-[11px] mb-6">{t('contact.title')}</h4>
            <ul className="space-y-5 text-sm font-light text-white/40">
              {/* WhatsApp */}
              <li>
                <a href="https://wa.me/525500000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-after-gold transition-colors group">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-white/30 group-hover:text-after-gold transition-colors"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  {t('contact.whatsapp')}
                </a>
              </li>
              {/* Teléfono */}
              <li>
                <a href="tel:+525637699013" className="flex items-center gap-3 hover:text-after-gold transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-after-gold transition-colors"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {t('contact.phone')}
                </a>
              </li>
              {/* Correo */}
              <li>
                <a href="mailto:contacto@afterhouse.com.mx" className="flex items-center gap-3 hover:text-after-gold transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-after-gold transition-colors"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {t('contact.email')}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* COLUMNA 4: Redes Sociales */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-white uppercase tracking-[0.2em] text-[11px] mb-6">{t('social.title')}</h4>
            <div className="flex flex-wrap gap-4">
              {/* Facebook*/}
              <a href="https://www.facebook.com/AFTERHOUSEMX" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-after-gold hover:border-after-gold transition-all duration-300">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/afterhouse_7/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-after-gold hover:border-after-gold transition-all duration-300">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@after_house7" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-after-gold hover:border-after-gold transition-all duration-300">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.5 3.96-1.82 5.36-1.5 1.49-3.59 2.28-5.69 2.05-2.06-.2-3.96-1.3-5.05-2.92-1.02-1.49-1.34-3.32-.97-5.05.3-1.46.99-2.82 2.05-3.86 1.41-1.37 3.3-2.09 5.25-2.11v4.02c-1.4.03-2.8.69-3.6 1.83-.69 1-1.02 2.26-.85 3.48.16 1.16.8 2.23 1.75 2.86 1.15.75 2.6.93 3.86.49 1.18-.41 2.07-1.36 2.45-2.56.2-.62.27-1.28.25-1.94v-14.65h-1.68z"/></svg>
              </a>
              {/* Spotify */}
              <a href="https://open.spotify.com/user/317hp2d35jahuappgnywht6idfkq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-after-gold hover:border-after-gold transition-all duration-300">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              </a>
            </div>
          </motion.div>

        </div>

        {/* BARRA INFERIOR: Copyright y Legales */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-[11px] font-light tracking-wider text-white/30"
        >
          <p>© {currentYear} After House. {t('legal.rights')}</p>
          <div className="flex gap-6 uppercase tracking-[0.1em]">
            <Link href="/privacy" className="hover:text-after-gold transition-colors">{t('legal.privacy')}</Link>
            <Link href="/terms" className="hover:text-after-gold transition-colors">{t('legal.terms')}</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}