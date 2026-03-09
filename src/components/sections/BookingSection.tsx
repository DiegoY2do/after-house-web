'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function BookingSection() {
  const t = useTranslations('Booking');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqKeys = ['how', 'payments', 'booking', 'coverage'] as const;

  return (
    <section id="booking" className="relative w-full py-24 lg:py-40 bg-[#080808] overflow-hidden font-inter text-white scroll-mt-24">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Encabezado con Badge */}
        <div className="flex flex-col items-center text-center mb-20 lg:mb-28">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="w-fit px-8 py-3 rounded-[30px] border border-after-gold/20 bg-after-black/60 backdrop-blur-xl text-after-gold text-[11px] tracking-[0.6em] uppercase font-light">
              {t('badge')}
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-7xl text-white italic leading-tight"
          >
            {t('title')}
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              <div className="relative group">
                <input type="text" placeholder={t('form.name')} className="w-full bg-transparent border-b border-white/10 py-4 px-0 outline-none focus:border-after-gold transition-all duration-500 placeholder:text-white/20 font-light" />
              </div>
              <div className="relative group">
                <input type="email" placeholder={t('form.email')} className="w-full bg-transparent border-b border-white/10 py-4 px-0 outline-none focus:border-after-gold transition-all duration-500 placeholder:text-white/20 font-light" />
              </div>
              <div className="relative group">
                <input type="tel" placeholder={t('form.phone')} className="w-full bg-transparent border-b border-white/10 py-4 px-0 outline-none focus:border-after-gold transition-all duration-500 placeholder:text-white/20 font-light" />
              </div>

              {/* TIPO DE EVENTO */}
              <div className="relative group">
                <select 
                  className="w-full bg-transparent border-b border-white/10 py-4 px-0 outline-none focus:border-after-gold transition-all duration-500 text-white/40 font-light cursor-pointer appearance-none relative z-10"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" disabled selected className="bg-[#080808] text-white/40">{t('form.eventType.label')}</option>
                  <option value="corporate" className="bg-[#080808] text-white">{t('form.eventType.corporate')}</option>
                  <option value="wedding" className="bg-[#080808] text-white">{t('form.eventType.wedding')}</option>
                  <option value="private" className="bg-[#080808] text-white">{t('form.eventType.private')}</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-after-gold transition-colors z-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              {/* SERVICIO REQUERIDO (Añadido) */}
              <div className="md:col-span-2 relative group">
                <select 
                  className="w-full bg-transparent border-b border-white/10 py-4 px-0 outline-none focus:border-after-gold transition-all duration-500 text-white/40 font-light cursor-pointer appearance-none relative z-10"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" disabled selected className="bg-[#080808] text-white/40">{t('form.serviceType.label')}</option>
                  <option value="full_bar" className="bg-[#080808] text-white">{t('form.serviceType.fullBar')}</option>
                  <option value="mixology" className="bg-[#080808] text-white">{t('form.serviceType.mixology')}</option>
                  <option value="tasting" className="bg-[#080808] text-white">{t('form.serviceType.tasting')}</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-after-gold transition-colors z-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              <div className="md:col-span-2 relative group">
                <textarea rows={3} placeholder={t('form.message')} className="w-full bg-transparent border-b border-white/10 py-4 px-0 outline-none focus:border-after-gold transition-all duration-500 placeholder:text-white/20 font-light resize-none"></textarea>
              </div>
              
              <div className="md:col-span-2 pt-8">
                <button className="group relative px-12 py-4 bg-transparent border border-after-gold text-after-gold uppercase text-[11px] tracking-[0.3em] font-medium overflow-hidden transition-all duration-500 hover:text-black">
                  <span className="relative z-10 transition-colors duration-500">{t('form.submit')}</span>
                  <div className="absolute inset-0 bg-after-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </div>
            </form>
          </motion.div>

          {/* COLUMNA DERECHA: FAQS */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h3 className="font-playfair text-2xl text-after-gold italic mb-4">
              {t('faqTitle')}
            </h3>
            
            <div className="space-y-2">
              {faqKeys.map((key, index) => (
                <div key={key} className="border-b border-white/5">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex justify-between items-center text-left py-6 hover:text-after-gold transition-colors group"
                  >
                    <span className="text-sm md:text-base font-light tracking-wide text-white/70 group-hover:text-white">
                      {t(`faqs.${key}.q`)}
                    </span>
                    <span className={`text-after-gold transition-transform duration-500 ${openFaq === index ? 'rotate-45' : ''}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 5v14M5 12h14"/></svg>
                    </span>
                  </button>
                  
                  <motion.div 
                    initial={false}
                    animate={{ 
                      height: openFaq === index ? 'auto' : 0, 
                      opacity: openFaq === index ? 1 : 0 
                    }}
                    transition={{ 
                      duration: 0.35, 
                      ease: [0.25, 1, 0.5, 1] 
                    }}
                    style={{ 
                      overflow: 'hidden',
                      willChange: 'height, opacity' // Esto obliga al móvil a usar la GPU
                    }}
                  >
                    <p className="text-white/40 text-sm font-light leading-relaxed pb-8 pr-12">
                      {t(`faqs.${key}.a`)}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}