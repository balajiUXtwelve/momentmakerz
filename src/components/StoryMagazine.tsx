/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Quote, Sparkles, BookOpen } from 'lucide-react';
import { STORY_CHAPTERS } from '../data';

export default function StoryMagazine() {
  return (
    <section id="stories" className="py-24 md:py-32 bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white light:bg-stone-100 light:text-neutral-900 overflow-hidden relative">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.02),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Story Intro */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 dark:bg-white/5 light:bg-neutral-200 text-neutral-400 dark:text-neutral-400 light:text-neutral-600 rounded-full text-[10px] tracking-widest uppercase mb-4">
            <BookOpen className="w-3 h-3" />
            <span>FEATURED VISUAL STORY</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight mb-6">
            Ananya & Rahul
          </h2>
          <p className="font-sans text-neutral-400 dark:text-neutral-400 light:text-neutral-600 text-sm md:text-base leading-relaxed">
            We follow the organic rhythm of one extraordinary day. Explore how their moments unfolded in a cinematic sequence of love, legacy, and pure emotion.
          </p>
        </div>

        {/* Stories Container - Alternating Editorial Spreads */}
        <div className="space-y-32 md:space-y-48">
          {STORY_CHAPTERS.map((chapter, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={chapter.id}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 lg:gap-20 items-center`}
              >
                {/* Image Panel with Reveal Mask */}
                <motion.div
                  className="w-full lg:w-1/2 relative group"
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl bg-neutral-800 border border-white/5 dark:border-white/5 light:border-neutral-200">
                    <img
                      src={chapter.imageUrl}
                      alt={chapter.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale dark:grayscale group-hover:grayscale-0 group-hover:dark:grayscale-0 light:grayscale-0 transition-all duration-1000 ease-out scale-102 group-hover:scale-105"
                    />
                    {/* Editorial border overlay inside image */}
                    <div className="absolute inset-4 border border-white/15 dark:border-white/15 light:border-black/5 pointer-events-none rounded-xl" />
                  </div>

                  {/* Aesthetic index tag floating */}
                  <div className={`absolute top-4 ${isEven ? 'left-4' : 'right-4'} px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white font-mono text-[9px] tracking-widest uppercase`}>
                    CHAPTER {index + 1}
                  </div>
                </motion.div>

                {/* Text Editorial Content */}
                <motion.div
                  className="w-full lg:w-1/2 space-y-6 md:space-y-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500 block">
                      {chapter.phase}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight">
                      {chapter.title}
                    </h3>
                  </div>

                  <div className="relative">
                    {/* Large drop cap for first chapter, elegant layout for all */}
                    <p className="text-neutral-300 dark:text-neutral-300 light:text-neutral-600 font-sans text-sm md:text-base leading-relaxed">
                      {chapter.description}
                    </p>
                  </div>

                  {/* Signature block quote */}
                  {chapter.quote && (
                    <div className="border-l border-neutral-700 pl-4 py-1 italic text-neutral-400 dark:text-neutral-400 light:text-neutral-500 font-serif text-sm md:text-base flex gap-2 items-start bg-white/[0.01] dark:bg-white/[0.01] light:bg-neutral-50/50 p-4 rounded-r-lg">
                      <Quote className="w-4 h-4 text-neutral-500 shrink-0 mt-1 transform rotate-180" />
                      <p>"{chapter.quote}"</p>
                    </div>
                  )}

                  {/* Details button with micro-underline animation */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-mono text-[10px] tracking-widest uppercase cursor-pointer group">
                      <span>Explore Gallery Spread</span>
                      <span className="h-[1px] w-8 bg-neutral-500 dark:bg-neutral-500 light:bg-neutral-400 group-hover:w-16 transition-all duration-300" />
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Closing Call to Action in Story Section */}
        <div className="mt-32 md:mt-48 text-center border-t border-white/5 dark:border-white/5 light:border-neutral-200 pt-16">
          <h4 className="font-serif text-2xl md:text-3xl italic tracking-tight text-neutral-300 dark:text-neutral-300 light:text-neutral-800 mb-4">
            Let us draft your visual legacy.
          </h4>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-neutral-500 block mb-6">
            EVERY LOVE STORY MERITS A UNIQUE MAGAZINE SPREAD.
          </p>
          <button
            onClick={() => {
              const contactEl = document.getElementById('contact');
              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-white text-black dark:bg-white dark:text-black light:bg-neutral-900 light:text-white rounded-full text-xs tracking-widest uppercase font-medium hover:scale-102 transition-transform cursor-pointer focus:outline-none"
            id="story-cta-btn"
          >
            Create Your Story
          </button>
        </div>
      </div>
    </section>
  );
}
