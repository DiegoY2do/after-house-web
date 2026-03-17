'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutTeam() {
  const t = useTranslations('AboutTeam');

  const safeT = (path: string) => {
    try {
      const val = t(path as any);
      return val.includes(path) ? '' : val;
    } catch { return ''; }
  };

  const teamMembers = [0, 1]; // Ajusta este array dependiendo de cuántos miembros quieras mostrar (2 es ideal para simetría)

  return (
    <section className="w-full bg-[#080808] py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-24 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-after-gold text-[10px] tracking-[0.4em] uppercase font-semibold mb-4 block border-l border-after-gold pl-4">
              {safeT('badge') || 'LOS CREADORES'}
            </span>
            <h2 className="font-playfair text-4xl lg:text-6xl text-white italic">
              {safeT('title') || 'Mentes Maestras'}
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/60 font-inter font-light max-w-sm text-sm md:text-base leading-relaxed text-right md:text-left"
          >
            {safeT('description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {teamMembers.map((index) => {
            const name = safeT(`members.${index}.name`);
            const role = safeT(`members.${index}.role`);
            const bio = safeT(`members.${index}.bio`);
            const image = safeT(`members.${index}.image`) || `/images/team/member-${index + 1}.jpg`;

            if (!name) return null;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="group cursor-pointer"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#122A30] mb-8">
                  <Image 
                    src={image}
                    alt={name}
                    fill
                    className="object-cover grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
                  />
                  {/* Etiqueta flotante dorada sobre la imagen */}
                  <div className="absolute bottom-6 left-6 border border-after-gold/50 bg-[#080808]/60 backdrop-blur-md px-6 py-2">
                    <span className="text-after-gold text-[9px] tracking-[0.3em] uppercase font-semibold block">
                      {role}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-playfair text-3xl text-white mb-4 group-hover:text-after-gold transition-colors">
                  {name}
                </h3>
                <p className="text-white/60 font-inter text-sm leading-relaxed font-light italic">
                  "{bio}"
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}