/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShouldExit(true);
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!shouldExit && (
        <motion.div
          id="preloader"
          className="fixed inset-0 bg-neutral-950 text-white z-50 flex flex-col items-center justify-center p-6 select-none"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="max-w-md w-full flex flex-col items-center">
            {/* Logo Text Reveal */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                className="font-montserrat text-3xl md:text-5xl tracking-[0.25em] text-center uppercase"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                MOMENT{" "}
                <span className="font-light text-neutral-400">MAKERZ</span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden mb-12">
              <motion.p
                className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-neutral-400 text-center"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Candid & Fine Art Photography
              </motion.p>
            </div>

            {/* Progressive loading bar */}
            <div className="w-48 h-[1px] bg-neutral-800 relative overflow-hidden rounded-full mb-3">
              <motion.div
                className="absolute left-0 top-0 h-full bg-neutral-100"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>

            {/* Percentage counter */}
            <motion.span
              className="font-mono text-[10px] tracking-wider text-neutral-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {Math.min(progress, 100)}%
            </motion.span>
          </div>

          {/* Luxury corner elements */}
          <div className="absolute top-10 left-10 hidden sm:block">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-600">
              EST. 2020
            </span>
          </div>
          <div className="absolute bottom-10 right-10 hidden sm:block">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-600">
              © 2026 ARCHIVE
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
