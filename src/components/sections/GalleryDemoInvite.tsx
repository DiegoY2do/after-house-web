'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GalleryDemoInvite() {
  const t = useTranslations('GalleryDemo');
  const locale = useLocale();

  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-after-gold text-[10px] tracking-[0.6em] uppercase font-light block mb-6">
            {t('inviteOverline')}
          </span>
          
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8 italic">
            {t('inviteTitle')} <span className="text-after-gold">{t('inviteTitleItalic')}</span>
          </h2>
          
          <p className="text-white/40 font-inter text-sm md:text-base font-light leading-relaxed mb-12">
            {t('inviteDesc')}
          </p>

          <Link 
            href={`/${locale}/gallery-demo/upload`}
            className="inline-block bg-white text-black px-12 py-5 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-after-gold hover:text-white transition-all duration-500 shadow-xl"
          >
            {t('inviteBtn')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}