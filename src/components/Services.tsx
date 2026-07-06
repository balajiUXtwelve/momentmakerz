/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, Eye, Map, Video, Sparkles, User, Heart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_LIST } from '../data';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ser1: Eye, // Candid Specialist
  ser2: Camera, // Traditional
  ser3: Heart, // Pre-Wedding
  ser4: User, // Post-Wedding
  ser5: Map, // Destination Shoots
  ser6: Video, // Films
};

export default function Services() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 bg-neutral-950 text-white dark:bg-neutral-950 dark:text-white light:bg-stone-50 light:text-neutral-900 overflow-hidden relative border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20 md:mb-24">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500 block mb-3">
            SERVICES & EXPERIENCES
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-none mb-6">
            Our <span className="font-light italic text-neutral-400">Medium</span>
          </h2>
          <p className="max-w-md mx-auto text-neutral-400 dark:text-neutral-400 light:text-neutral-600 font-sans text-sm md:text-base leading-relaxed">
            We offer bespoke photography formats designed around authenticity and premium luxury art-direction.
          </p>
        </div>

        {/* 3-Column Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" id="services-grid">
          {SERVICES_LIST.map((service) => {
            const IconComponent = ICON_MAP[service.id] || Camera;
            const isHovered = hoveredId === service.id;
            const isOpen = activeAccordionId === service.id;

            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveAccordionId(isOpen ? null : service.id)}
                className="group p-8 md:p-10 rounded-2xl bg-neutral-900/40 border border-white/[0.04] dark:bg-neutral-900/40 dark:border-white/[0.04] light:bg-white light:border-neutral-200/80 hover:bg-neutral-900/70 dark:hover:bg-neutral-900/70 light:hover:bg-stone-50 transition-all duration-500 flex flex-col justify-between h-full relative cursor-pointer shadow-sm overflow-hidden clickable-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
              >
                {/* Gold Highlight Stripe on Hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-neutral-600 dark:bg-neutral-600 light:bg-neutral-300 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                <div>
                  {/* Icon Block */}
                  <div className="mb-8 p-4 bg-white/5 dark:bg-white/5 light:bg-stone-100 rounded-2xl w-fit text-white dark:text-white light:text-neutral-900">
                    <IconComponent className="w-6 h-6 stroke-1.5" />
                  </div>

                  {/* Title & Price */}
                  <div className="space-y-2 mb-4">
                    <h3 className="font-serif text-xl md:text-2xl tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 font-medium group-hover:text-white dark:group-hover:text-white transition-colors">
                      {service.name}
                    </h3>
                    {service.priceEstimate && (
                      <span className="font-mono text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-500 block">
                        {service.priceEstimate}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-neutral-400 dark:text-neutral-400 light:text-neutral-600 text-xs md:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Features Accordion inside Card */}
                <div className="pt-4 border-t border-white/[0.05] dark:border-white/[0.05] light:border-neutral-150 mt-auto">
                  <button className="flex items-center justify-between w-full text-left font-mono text-[10px] tracking-widest uppercase text-neutral-400 group-hover:text-white dark:group-hover:text-white light:group-hover:text-neutral-950 transition-colors cursor-pointer">
                    <span>What's Included</span>
                    <motion.div
                      animate={{ rotate: isHovered || isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {(isHovered || isOpen) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-2 pt-4">
                          {service.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-xs text-neutral-300 dark:text-neutral-300 light:text-neutral-650 font-sans">
                              <Sparkles className="w-3 h-3 text-neutral-500 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
