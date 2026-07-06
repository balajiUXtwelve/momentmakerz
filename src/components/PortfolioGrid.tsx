/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Maximize2, MapPin, Calendar, Heart } from 'lucide-react';
import { PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS } from '../data';

export default function PortfolioGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isHoveredId, setIsHoveredId] = useState<string | null>(null);

  const categories = [
    'All',
    'Weddings',
    'Candid',
    'Traditional',
    'Pre-Wedding',
    'Post-Wedding',
    'Couple Portraits',
  ];

  // Filter items
  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const openLightbox = (id: string) => {
    const index = filteredItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  // Split filtered items into columns for asymmetrical masonry
  const col1 = filteredItems.filter((_, idx) => idx % 3 === 0);
  const col2 = filteredItems.filter((_, idx) => idx % 3 === 1);
  const col3 = filteredItems.filter((_, idx) => idx % 3 === 2);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-neutral-950 text-white dark:bg-neutral-950 dark:text-white light:bg-stone-50 light:text-neutral-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20">
          <div className="max-w-xl">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500 block mb-3">
              THE PORTFOLIO
            </span>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-none mb-6">
              Featured <br className="hidden md:block" /><span className="font-light italic text-neutral-400">Masterpieces</span>
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 dark:text-neutral-400 light:text-neutral-600 font-sans text-sm md:text-base leading-relaxed">
            Every smile has a pulse, and every glance carries a legacy. We present a selection of moments captured in their rawest, most emotional states.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12 pb-4 border-b border-white/[0.06] dark:border-white/[0.06] light:border-neutral-200 overflow-x-auto scrollbar-none" id="portfolio-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer focus:outline-none whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white text-black dark:bg-white dark:text-black light:bg-neutral-900 light:text-white font-medium shadow-md'
                  : 'bg-neutral-900/50 text-neutral-400 dark:bg-neutral-900/50 dark:text-neutral-400 light:bg-stone-200/55 light:text-neutral-600 hover:text-white dark:hover:text-white light:hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start"
          id="portfolio-masonry"
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {col1.map((item) => (
                <PortfolioCard 
                  key={item.id} 
                  item={item} 
                  onOpen={() => openLightbox(item.id)} 
                  isHovered={isHoveredId === item.id}
                  onHover={(hover) => setIsHoveredId(hover ? item.id : null)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6 md:gap-8 md:mt-12 lg:mt-6">
            <AnimatePresence mode="popLayout">
              {col2.map((item) => (
                <PortfolioCard 
                  key={item.id} 
                  item={item} 
                  onOpen={() => openLightbox(item.id)}
                  isHovered={isHoveredId === item.id}
                  onHover={(hover) => setIsHoveredId(hover ? item.id : null)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6 md:gap-8 lg:mt-12">
            <AnimatePresence mode="popLayout">
              {col3.map((item) => (
                <PortfolioCard 
                  key={item.id} 
                  item={item} 
                  onOpen={() => openLightbox(item.id)}
                  isHovered={isHoveredId === item.id}
                  onHover={(hover) => setIsHoveredId(hover ? item.id : null)}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Editorial Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            id="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-neutral-950 flex flex-col md:flex-row select-none"
          >
            {/* Close trigger */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all cursor-pointer focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left and Right Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all cursor-pointer focus:outline-none"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all cursor-pointer focus:outline-none"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Immersive Stage */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-12 relative h-[70vh] md:h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={filteredItems[lightboxIndex].id}
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="max-h-full max-w-full object-contain shadow-2xl rounded-lg"
                />
              </AnimatePresence>
            </div>

            {/* Sidebar metadata (Editorial design) */}
            <div className="w-full md:w-[380px] bg-neutral-900 border-t md:border-t-0 md:border-l border-white/10 p-8 md:p-12 flex flex-col justify-between text-white h-[30vh] md:h-full overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 block uppercase mb-1">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                </div>

                {filteredItems[lightboxIndex].description && (
                  <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                    {filteredItems[lightboxIndex].description}
                  </p>
                )}

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-neutral-300 text-xs">
                    <MapPin className="w-4 h-4 text-neutral-500" />
                    <span>{filteredItems[lightboxIndex].location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300 text-xs">
                    <Calendar className="w-4 h-4 text-neutral-500" />
                    <span>Year: {filteredItems[lightboxIndex].year}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300 text-xs">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
                    <span>Shot on Leica Signature Digital Color Profiles</span>
                  </div>
                </div>
              </div>

              {/* Index counter */}
              <div className="pt-8 md:pt-0">
                <span className="font-mono text-xs text-neutral-500">
                  {String(lightboxIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Sub-component for clean animations and readability
interface PortfolioCardProps {
  key?: string;
  item: PortfolioItem;
  onOpen: () => void;
  isHovered: boolean;
  onHover: (hover: boolean) => void;
}

function PortfolioCard({ item, onOpen, isHovered, onHover }: PortfolioCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onOpen}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-neutral-900/50 border border-white/[0.04] dark:bg-neutral-900/50 dark:border-white/[0.04] light:bg-white light:border-neutral-200/60 shadow-sm relative cursor-view-target"
    >
      {/* Image container */}
      <div className="relative overflow-hidden w-full h-auto aspect-square" style={{
        aspectRatio: item.aspectRatio === '16:9' ? '16/9' : item.aspectRatio === '4:3' ? '4/3' : item.aspectRatio === '3:4' ? '3/4' : item.aspectRatio === '9:16' ? '9/16' : '1/1'
      }}>
        {/* Soft grayscale to color transition */}
        <motion.img
          src={item.imageUrl}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover origin-center transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0 dark:grayscale group-hover:dark:grayscale-0 light:grayscale-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Hover overlay mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 select-none">
          <div className="space-y-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
            <span className="font-mono text-[9px] tracking-widest text-neutral-300 uppercase block">
              {item.category}
            </span>
            <h4 className="font-serif text-lg md:text-xl text-white tracking-tight font-medium">
              {item.title}
            </h4>
            <div className="flex items-center justify-between text-[11px] text-neutral-300 pt-1 border-t border-white/10 mt-2">
              <span>{item.location}</span>
              <span className="font-mono">{item.year}</span>
            </div>
          </div>
        </div>

        {/* Top bar indicators */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white inline-flex">
            <Maximize2 className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Simple elegant label shown in light theme or when not hovered */}
      <div className="p-4 md:p-5 group-hover:opacity-60 transition-opacity flex justify-between items-center block lg:hidden">
        <div>
          <h4 className="font-serif text-base tracking-tight font-medium text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
            {item.title}
          </h4>
          <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-500">
            {item.location}
          </p>
        </div>
        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-400 light:text-neutral-500">
          {item.year}
        </span>
      </div>
    </motion.div>
  );
}
