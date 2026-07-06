/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Award, Zap, Smile, Plane, Book, Clapperboard } from 'lucide-react';
import { BENTO_REASONS } from '../data';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  b1: Award,
  b2: Smile,
  b3: Sparkles,
  b4: Zap,
  b5: Shield,
  b6: Plane,
  b7: Book,
  b8: Clapperboard,
};

export default function BentoWhy() {
  return (
    <section id="why-choose-us" className="py-24 md:py-32 bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white light:bg-stone-100 light:text-neutral-900 overflow-hidden relative border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500 block mb-3">
            THE MOMENT MAKERZ DIFFERENCE
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-none">
            Why Trust <br />Your <span className="font-light italic text-neutral-400">Legacy</span> With Us
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="bento-container">
          {BENTO_REASONS.map((reason, index) => {
            const IconComponent = ICON_MAP[reason.id] || Sparkles;
            
            // Generate some sizing styles to create an asymmetrical Bento look
            // We want some cards to span columns or have slightly different weights
            let cardSpan = "col-span-1";
            if (index === 0) cardSpan = "col-span-1 lg:col-span-2"; // Double column
            if (index === 2) cardSpan = "col-span-1 lg:col-span-2"; // Double column
            if (index === 5) cardSpan = "col-span-1 lg:col-span-2"; // Double column

            return (
              <motion.div
                key={reason.id}
                className={`p-8 rounded-2xl bg-neutral-950/40 dark:bg-neutral-950/40 light:bg-white border border-white/[0.04] dark:border-white/[0.04] light:border-neutral-200 hover:border-neutral-700 dark:hover:border-neutral-700 light:hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between min-h-[220px] group relative ${cardSpan}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {/* Decorative glowing gradient circle on hover */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="space-y-4">
                  {/* Card Header Tag */}
                  <div className="flex items-center justify-between">
                    {reason.tag && (
                      <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 dark:text-neutral-500 light:text-neutral-400 uppercase">
                        {reason.tag}
                      </span>
                    )}
                    <IconComponent className="w-5 h-5 text-neutral-400 dark:text-neutral-400 light:text-neutral-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif text-lg md:text-xl tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-950 font-medium">
                    {reason.title}
                  </h3>
                </div>

                {/* Card Description */}
                <p className="text-neutral-400 dark:text-neutral-400 light:text-neutral-600 text-xs md:text-sm leading-relaxed mt-4">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
