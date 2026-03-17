'use client';

import { useTranslations, useLocale, useMessages } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MoreFavorites({ currentId }: { currentId: string }) {
  const t = useTranslations('Favorites');
  const tMenu = useTranslations('Menu'); // Asumiendo que crearás textos para Menu
  const locale = useLocale();
  const messages = useMessages();

  // 1. Extracción dinámica de las llaves desde el JSON
  const cocktailsData = (messages as any)?.Favorites?.cocktails || {};
  const cocktailKeys = Object.keys(cocktailsData);

  const safeT = (path: string, translationObj: any = t) => {
    try {
      const val = translationObj(path as any);
      return val.includes(path) ? '' : val;
    } catch { return ''; }
  };

  // 2. Filtramos la bebida actual y tomamos 3 opciones para mostrar
  const otherFavorites = cocktailKeys.filter(key => key !== currentId).slice(0, 3);

  // Textos para la sección de invitación al menú (puedes ajustarlos en tu JSON)
  const menuBadge = safeT('badge', tMenu) || 'LA COLECCIÓN COMPLETA';
  const menuTitle = safeT('title', tMenu) || 'Descubre nuestro Menú Interactivo';
  const menuSubtitle = safeT('subtitle', tMenu) || 'Explora todas nuestras creaciones de autor, clásicos reinventados y botellas exclusivas seleccionadas para transformar la energía de tu noche.';
  const menuBtn = safeT('cta', tMenu) || 'VER MENÚ COMPLETO';

  if (otherFavorites.length === 0) return null;

  return (
    <>
      {/* 1. INVITACIÓN AL MENÚ COMPLETO (MOVIDO ARRIBA) */}
      <section className="w-full bg-[#080808] mt-24 py-32 text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[800px] mx-auto flex flex-col items-center"
        >
          {/* Badge dinámico unificado */}
          <div className="border border-after-gold/30 px-6 py-2 rounded-full mb-8">
            <span className="text-after-gold text-[10px] tracking-[0.6em] uppercase font-light">
              {menuBadge}
            </span>
          </div>
          
          <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white italic mb-10 leading-tight">
            {menuTitle}
          </h2>
          <p className="text-white/60 font-inter font-light tracking-wide mb-12 max-w-[500px] leading-relaxed">
            {menuSubtitle}
          </p>
          
          <Link 
            href={`menu.pdf`} 
            target='_blank'
            className="group relative inline-flex items-center justify-center px-10 py-4 border border-white/20 hover:border-after-gold transition-all duration-500 overflow-hidden w-fit"
          >
            <div className="absolute inset-0 bg-after-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 font-inter text-[10px] tracking-[0.2em] uppercase font-medium text-white group-hover:text-black transition-colors duration-500">
              {menuBtn}
            </span>
          </Link>
        </motion.div>
      </section>

      {/* 2. OTROS FAVORITOS (MOVIDO ABAJO) */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 my-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             {/* Badge dinámico para Continuar Experiencia */}
             <div className="mb-4">
                <span className="text-after-gold text-[10px] tracking-[0.4em] uppercase font-semibold block">
                  {safeT('global.continueExperience') || 'Continúa la experiencia'}
                </span>
             </div>
            <h3 className="font-playfair text-4xl lg:text-5xl text-white italic">
              {safeT('global.otherFavoritesTitle') || 'Otros Favoritos'}
            </h3>
          </motion.div>
          <Link href={`/${locale}/#favorites`} className="text-white/40 hover:text-after-gold text-[10px] tracking-[0.2em] uppercase transition-colors mb-2">
            {safeT('global.viewAll') || 'Ver todos'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {otherFavorites.map((key, index) => {
            const otherName = safeT(`cocktails.${key}.name`);
            const otherCategory = safeT(`cocktails.${key}.category`);
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/${locale}/favorites/${key}`} className="group block">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#050505] mb-6">
                    <Image
                      src={`/images/cocktails/${key}.webp`}
                      alt={otherName}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  </div>
                  <span className="text-after-gold text-[9px] tracking-[0.3em] uppercase block mb-2">
                    {otherCategory}
                  </span>
                  <h4 className="font-playfair text-2xl text-white group-hover:text-after-gold transition-colors">
                    {otherName}
                  </h4>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>
    </>
  );
}