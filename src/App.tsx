/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  Instagram,
  MessageSquare,
  MapPin,
  ChevronRight,
  Calendar,
  ArrowUpRight,
  ChevronDown,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

// Custom components
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import PortfolioGrid from "./components/PortfolioGrid";
import StoryMagazine from "./components/StoryMagazine";
import Services from "./components/Services";
import BentoWhy from "./components/BentoWhy";
import EnquiryInbox from "./components/EnquiryInbox";

// Types and Data
import { InquirySubmission } from "./types";
import { TESTIMONIALS, INSTAGRAM_POSTS } from "./data";

const HERO_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1920",
    title: "Every Love Story Deserves Timeless Memories",
    subtext:
      "Capturing authentic emotions through candid and artistic wedding photography.",
  },
  {
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=85&w=1920",
    title: "Genuine Emotions, Elegantly Framed",
    subtext: "We focus on real moments rather than forced, artificial poses.",
  },
  {
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=85&w=1920",
    title: "The Poetry of Unspoken Promises",
    subtext: "High-end editorial art direction meet raw candid storytelling.",
  },
  {
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=85&w=1920",
    title: "From Udaipur Palaces to Lake Como Shores",
    subtext:
      "Bespoke destination coverage tailored to your luxury celebrations.",
  },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  // Testimonial state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Inquiries State (Local Storage persistent)
  const [submissions, setSubmissions] = useState<InquirySubmission[]>([]);

  // Form State
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  // Initialize Theme and load inquiries
  useEffect(() => {
    // 1. Theme Configuration
    const savedTheme = localStorage.getItem("moment_makerz_theme");
    const initialTheme = (savedTheme as "dark" | "light") || "dark";
    setTheme(initialTheme);
    document.documentElement.className = initialTheme;

    // 2. Load Local Storage submissions
    const savedInquiries = localStorage.getItem("moment_makerz_inquiries");
    if (savedInquiries) {
      try {
        setSubmissions(JSON.parse(savedInquiries));
      } catch (e) {
        console.error("Failed to parse inquiries from localStorage", e);
      }
    }

    // 3. Slide interval for Cinematic Hero
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(slideTimer);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("moment_makerz_theme", newTheme);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName || !formEmail || !formPhone) {
      alert("Please fill out all required fields (*).");
      return;
    }

    const newSubmission: InquirySubmission = {
      id: "sub-" + Date.now(),
      name: formName,
      phone: formPhone,
      email: formEmail,
      eventDate: formDate,
      location: formLocation,
      message: formMessage,
      submittedAt: new Date().toISOString(),
      status: "New",
    };

    const updated = [newSubmission, ...submissions];
    setSubmissions(updated);
    localStorage.setItem("moment_makerz_inquiries", JSON.stringify(updated));

    // Reset Form Fields
    setFormName("");
    setFormPhone("");
    setFormEmail("");
    setFormDate("");
    setFormLocation("");
    setFormMessage("");

    // Trigger feedback
    setIsSubmitSuccess(true);
    setTimeout(() => {
      setIsSubmitSuccess(false);
    }, 6000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* 1. Loader Preloader */}
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main page canvas */}
      <div className="min-h-screen bg-neutral-950 dark:bg-neutral-950 light:bg-stone-50 text-white dark:text-white light:text-neutral-900 font-sans selection:bg-neutral-800 selection:text-white transition-colors duration-500">
        {/* 2. Custom Magnetic Cursor */}
        <CustomCursor />

        {/* 3. Floating Navbar */}
        <Navbar
          theme={theme}
          toggleTheme={handleToggleTheme}
          onOpenInbox={() => setIsInboxOpen(true)}
        />

        {/* 4. Cinematic Fullscreen Hero */}
        <section
          id="home"
          className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        >
          {/* Background Image Slideshow with Ken Burns Effect */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1.01 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <img
                  src={HERO_SLIDES[currentSlide].url}
                  alt="Cinematic Wedding Slide"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-40 dark:brightness-35 light:brightness-50"
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle monochrome gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/40 pointer-events-none" />
          </div>

          {/* Overlapping Typography and CTAs */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between h-full pb-20 md:pb-24 pt-32">
            <div className="max-w-4xl space-y-6">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-neutral-300 dark:text-neutral-300 light:text-neutral-100 rounded-full text-[10px] tracking-widest uppercase font-mono"
              >
                <span>AWWWARDS PORTFOLIO ARCHIVE</span>
              </motion.div>

              {/* Headline */}
              <div className="overflow-hidden">
                <motion.h1
                  key={currentSlide}
                  className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {HERO_SLIDES[currentSlide].title}
                </motion.h1>
              </div>

              {/* Subtext */}
              <motion.p
                key={`sub-${currentSlide}`}
                className="text-neutral-300 font-sans text-sm md:text-lg max-w-xl leading-relaxed tracking-wide font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {HERO_SLIDES[currentSlide].subtext}
              </motion.p>

              {/* Interactive CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3.5 bg-white text-black dark:bg-white dark:text-black light:bg-neutral-900 light:text-white rounded-full text-xs tracking-widest uppercase font-semibold hover:scale-103 transition-transform cursor-pointer focus:outline-none shadow-lg shadow-black/20 flex items-center justify-center gap-2"
                  id="hero-book-btn"
                >
                  <span>Book Your Shoot</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="px-8 py-3.5 bg-white/15 hover:bg-white/20 backdrop-blur-md border border-white/15 rounded-full text-white text-xs tracking-widest uppercase font-semibold transition-all cursor-pointer focus:outline-none flex items-center justify-center gap-2"
                  id="hero-explore-btn"
                >
                  <span>Explore Portfolio</span>
                </button>
              </motion.div>
            </div>

            {/* Subtle Scroll Indicator */}
            <motion.button
              onClick={() => scrollToSection("about")}
              className="hidden md:flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors focus:outline-none cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              id="hero-scroll-btn"
            >
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>

          {/* Live Progress Bar indicator for slideshow */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10 z-20">
            <motion.div
              key={currentSlide}
              className="h-full bg-white dark:bg-white light:bg-neutral-950 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 6, ease: "linear" }}
            />
          </div>
        </section>

        {/* 5. Editorial About Section */}
        <section
          id="about"
          className="py-24 md:py-36 bg-neutral-950 text-white dark:bg-neutral-950 dark:text-white light:bg-stone-50 light:text-neutral-900 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              {/* Left Column: Overlapping Editorial Images */}
              <div className="lg:col-span-5 relative" id="about-image-stack">
                <motion.div
                  className="relative aspect-[3/4] w-[85%] rounded-2xl overflow-hidden shadow-2xl z-10 border border-white/5 dark:border-white/5 light:border-neutral-200"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=85&w=800"
                    alt="Photographer at Work"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale dark:grayscale light:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-neutral-950/10 pointer-events-none" />
                </motion.div>

                <motion.div
                  className="absolute bottom-[-40px] right-0 w-[55%] aspect-square rounded-2xl overflow-hidden shadow-2xl z-25 border-4 border-neutral-950 dark:border-neutral-950 light:border-stone-50"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=85&w=600"
                    alt="Leica Camera Close Up"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale dark:grayscale light:grayscale-0"
                  />
                </motion.div>
              </div>

              {/* Right Column: Editorial Copy */}
              <div className="lg:col-span-7 space-y-8" id="about-text-content">
                <div className="space-y-4">
                  <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500 block">
                    THE VISIONARIES
                  </span>
                  <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-none text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
                    We capture the{" "}
                    <span className="font-light italic text-neutral-400">
                      silences
                    </span>{" "}
                    in between the songs.
                  </h2>
                </div>

                <div className="space-y-6 text-neutral-300 dark:text-neutral-300 light:text-neutral-650 font-sans text-sm md:text-base leading-relaxed">
                  <p>
                    MOMENT MAKERZ was founded on a simple realization: your most
                    treasured wedding memories are never the ones where a
                    photographer told you to freeze and smile. It’s the tear
                    drying on a mother’s cheek, the nervous adjustment of a
                    cufflink, the unscripted burst of laughter when the dupatta
                    gets caught, and the wild, blurry dancing of midnight.
                  </p>
                  <p className="font-serif italic text-lg text-neutral-400 dark:text-neutral-400 light:text-neutral-800">
                    "Authenticity over perfection. Real emotion over forced
                    geometry."
                  </p>
                  <p>
                    With **4–6 years of professional experience** and a suitcase
                    optimized for global travel, we have documented over 180
                    love stories. Armed with specialized silent-shutter gear and
                    an editorial color-palette, we blend seamlessly into the
                    shadows of your wedding day to capture the honest,
                    heart-wrenching beauty of your union.
                  </p>
                </div>

                {/* Legacy stats bar */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.06] dark:border-white/[0.06] light:border-neutral-200">
                  <div className="space-y-1">
                    <span className="font-serif text-3xl md:text-4xl font-light">
                      4-6
                    </span>
                    <p className="font-mono text-[9px] tracking-wider uppercase text-neutral-500">
                      Years Exp
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-serif text-3xl md:text-4xl font-light">
                      180+
                    </span>
                    <p className="font-mono text-[9px] tracking-wider uppercase text-neutral-500">
                      Weddings Shot
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-serif text-3xl md:text-4xl font-light">
                      100%
                    </span>
                    <p className="font-mono text-[9px] tracking-wider uppercase text-neutral-500">
                      Unposed Joy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Portfolio Grid Section */}
        <PortfolioGrid />

        {/* 7. Story Section */}
        <StoryMagazine />

        {/* 8. Services Section */}
        <Services />

        {/* 9. Bento Advantages */}
        <BentoWhy />

        {/* 10. Editorial Testimonials Carousel */}
        <section
          id="testimonials"
          className="py-24 md:py-32 bg-neutral-950 text-white dark:bg-neutral-950 dark:text-white light:bg-stone-50 light:text-neutral-900 relative overflow-hidden border-t border-white/[0.03]"
        >
          <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500 block mb-12">
              CLIENT TESTIMONIALS
            </span>

            {/* Carousel Stage */}
            <div className="min-h-[250px] flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <p className="font-serif text-2xl md:text-3xl lg:text-4xl italic tracking-tight leading-relaxed max-w-4xl mx-auto text-neutral-200 dark:text-neutral-200 light:text-neutral-800">
                    "{TESTIMONIALS[activeTestimonial].quote}"
                  </p>

                  {/* Client Portrait + Name */}
                  <div className="flex flex-col items-center gap-3">
                    {TESTIMONIALS[activeTestimonial].imageUrl && (
                      <img
                        src={TESTIMONIALS[activeTestimonial].imageUrl}
                        alt={TESTIMONIALS[activeTestimonial].clientName}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover grayscale border border-white/10"
                      />
                    )}
                    <div>
                      <h4 className="font-serif text-base md:text-lg tracking-tight font-semibold">
                        {TESTIMONIALS[activeTestimonial].clientName}
                        {TESTIMONIALS[activeTestimonial].partnerName &&
                          ` & ${TESTIMONIALS[activeTestimonial].partnerName}`}
                      </h4>
                      <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mt-0.5">
                        {TESTIMONIALS[activeTestimonial].location} •{" "}
                        {TESTIMONIALS[activeTestimonial].date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                    activeTestimonial === idx
                      ? "w-8 bg-white dark:bg-white light:bg-neutral-900"
                      : "w-2 bg-neutral-700 dark:bg-neutral-700 light:bg-neutral-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 11. Simulated Instagram Preview */}
        <section
          id="instagram"
          className="py-24 md:py-32 bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white light:bg-stone-100 light:text-neutral-900 overflow-hidden relative border-t border-white/[0.03]"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500 block mb-3">
                  STREET JOURNAL
                </span>
                <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-none flex items-center gap-2">
                  <Instagram className="w-8 h-8 text-neutral-400 shrink-0 stroke-1" />
                  <span>@MomentMakerz</span>
                </h2>
              </div>
              <a
                href="https://www.instagram.com/moment.makerz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-600 hover:text-white dark:hover:text-white light:hover:text-neutral-950 pt-4 md:pt-0 block"
              >
                Follow our feed →
              </a>
            </div>

            {/* Interactive Grid */}
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              id="instagram-grid"
            >
              {INSTAGRAM_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="group relative aspect-square bg-neutral-800 rounded-xl overflow-hidden shadow-md border border-white/[0.02] dark:border-white/[0.02] light:border-neutral-200"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Cover overlay detailing comments and likes */}
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-2 text-white text-xs select-none p-4">
                    <span className="font-mono text-[10px] tracking-wider">
                      LIKES: {post.likes}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider">
                      COMMENTS: {post.comments}
                    </span>
                    <p className="text-[10px] text-neutral-400 text-center line-clamp-2 mt-2 font-sans italic">
                      "{post.caption}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Elegant Contact Section & Inquiries Portal */}
        <section
          id="contact"
          className="py-24 md:py-36 bg-neutral-950 text-white dark:bg-neutral-950 dark:text-white light:bg-stone-50 light:text-neutral-900 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Left Column: Direct contact details */}
              <div className="lg:col-span-5 space-y-10" id="contact-details">
                <div className="space-y-4">
                  <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500 block">
                    LET'S DISCUSS YOUR PROJECT
                  </span>
                  <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-none text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
                    Let’s capture <br />
                    your{" "}
                    <span className="font-light italic text-neutral-400">
                      story.
                    </span>
                  </h2>
                </div>

                {/* <p className="text-neutral-400 dark:text-neutral-400 light:text-neutral-600 font-sans text-sm md:text-base leading-relaxed">
                  We are selective about the commissions we accept, booking only
                  30 weddings a year to ensure every couple gets our absolute
                  artistic attention. Reach out to secure your dates in our
                  archive.
                </p> */}

                <div className="space-y-6 pt-6 border-t border-white/5 dark:border-white/5 light:border-neutral-200">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 dark:bg-white/5 light:bg-neutral-100 rounded-full text-neutral-400 dark:text-neutral-400 light:text-neutral-850">
                      <Phone className="w-5 h-5 stroke-1.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-neutral-500">
                        Phone & SMS
                      </span>
                      <a
                        href="tel:+919789022048"
                        className="block text-sm md:text-base hover:underline text-neutral-200 dark:text-neutral-200 light:text-neutral-850 font-medium mt-0.5"
                      >
                        +91 97890 22048
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 dark:bg-white/5 light:bg-neutral-100 rounded-full text-neutral-400 dark:text-neutral-400 light:text-neutral-850">
                      <Mail className="w-5 h-5 stroke-1.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-neutral-500">
                        General Inquiries
                      </span>
                      <a
                        href="mailto:hello@momentmakerz.com"
                        className="block text-sm md:text-base hover:underline text-neutral-200 dark:text-neutral-200 light:text-neutral-850 font-medium mt-0.5"
                      >
                        hello@momentmakerz.com
                      </a>
                    </div>
                  </div>

                  {/* Instagram handle */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 dark:bg-white/5 light:bg-neutral-100 rounded-full text-neutral-400 dark:text-neutral-400 light:text-neutral-850">
                      <Instagram className="w-5 h-5 stroke-1.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-neutral-500">
                        Instagram direct
                      </span>
                      <a
                        href="https://www.instagram.com/moment.makerz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm md:text-base hover:underline text-neutral-200 dark:text-neutral-200 light:text-neutral-850 font-medium mt-0.5"
                      >
                        @MomentMakerz
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 dark:bg-white/5 light:bg-neutral-100 rounded-full text-neutral-400 dark:text-neutral-400 light:text-neutral-850">
                      <MapPin className="w-5 h-5 stroke-1.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-neutral-500">
                        HQ Studio
                      </span>
                      <p className="block text-sm md:text-base text-neutral-200 dark:text-neutral-200 light:text-neutral-850 font-medium mt-0.5">
                        Chennai, Tamil Nadu, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: React Booking Inquiry Form */}
              <div className="lg:col-span-7">
                <div
                  className="p-8 md:p-10 rounded-2xl bg-neutral-900/50 dark:bg-neutral-900/50 dark:border-white/5 light:bg-white border border-white/5 light:border-neutral-200 shadow-xl relative"
                  id="booking-form-panel"
                >
                  {/* Inline Success Notice */}
                  <AnimatePresence>
                    {isSubmitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30 bg-neutral-950 dark:bg-neutral-950 light:bg-white rounded-2xl p-8 flex flex-col justify-center items-center text-center space-y-4"
                      >
                        <CheckCircle className="w-16 h-16 text-green-400" />
                        <h3 className="font-serif text-2xl tracking-tight">
                          Inquiry Registered Successfully
                        </h3>
                        <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 font-sans max-w-sm leading-relaxed">
                          Your dream wedding details are locked safely in our
                          digital vault. Open the **Inquiries** tab in the
                          top-right corner to inspect or manage your submission.
                          Our lead photographer will email you back within 24
                          hours.
                        </p>
                        <button
                          onClick={() => setIsSubmitSuccess(false)}
                          className="px-6 py-2 bg-white text-black dark:bg-white dark:text-black light:bg-neutral-900 light:text-white rounded-full text-[10px] tracking-widest uppercase font-semibold cursor-pointer"
                        >
                          Send another inquiry
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <h3 className="font-serif text-2xl tracking-tight mb-8">
                    Send an Inquiry
                  </h3>

                  <form
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                    id="client-enquiry-form"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label
                          htmlFor="name-input"
                          className="block font-mono text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500"
                        >
                          Couples Names *
                        </label>
                        <input
                          id="name-input"
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Kabir & Meera"
                          className="w-full bg-neutral-950 dark:bg-neutral-950 light:bg-stone-50 border border-white/10 dark:border-white/10 light:border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-400 light:focus:border-neutral-900 transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label
                          htmlFor="phone-input"
                          className="block font-mono text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="phone-input"
                          type="tel"
                          required
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-neutral-950 dark:bg-neutral-950 light:bg-stone-50 border border-white/10 dark:border-white/10 light:border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-400 light:focus:border-neutral-900 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Email */}
                      <div className="space-y-2 md:col-span-1">
                        <label
                          htmlFor="email-input"
                          className="block font-mono text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500"
                        >
                          Email Address *
                        </label>
                        <input
                          id="email-input"
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="e.g. sanya@example.com"
                          className="w-full bg-neutral-950 dark:bg-neutral-950 light:bg-stone-50 border border-white/10 dark:border-white/10 light:border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-400 light:focus:border-neutral-900 transition-colors"
                        />
                      </div>

                      {/* Event Date */}
                      <div className="space-y-2">
                        <label
                          htmlFor="date-input"
                          className="block font-mono text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500"
                        >
                          Event Date
                        </label>
                        <input
                          id="date-input"
                          type="date"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          className="w-full bg-neutral-950 dark:bg-neutral-950 light:bg-stone-50 border border-white/10 dark:border-white/10 light:border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-400 light:focus:border-neutral-900 transition-colors cursor-pointer"
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-2">
                        <label
                          htmlFor="loc-input"
                          className="block font-mono text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500"
                        >
                          Event Venue / Location
                        </label>
                        <input
                          id="loc-input"
                          type="text"
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          placeholder="e.g. Goa beachfront"
                          className="w-full bg-neutral-950 dark:bg-neutral-950 light:bg-stone-50 border border-white/10 dark:border-white/10 light:border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-400 light:focus:border-neutral-900 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label
                        htmlFor="msg-input"
                        className="block font-mono text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500"
                      >
                        Describe Your Dream Ceremony
                      </label>
                      <textarea
                        id="msg-input"
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Tell us about the vibes, the schedule, or the unique rituals we should capture..."
                        className="w-full bg-neutral-950 dark:bg-neutral-950 light:bg-stone-50 border border-white/10 dark:border-white/10 light:border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-400 light:focus:border-neutral-900 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-white text-black dark:bg-white dark:text-black light:bg-neutral-900 light:text-white rounded-lg text-xs tracking-widest uppercase font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-200 light:hover:bg-neutral-850 transition-colors cursor-pointer focus:outline-none shadow-md"
                      id="contact-submit-btn"
                    >
                      Register My Booking Inquiry
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 13. Minimalist Footer */}
        <footer className="py-16 md:py-24 bg-neutral-950 text-neutral-500 dark:bg-neutral-950 dark:text-neutral-500 light:bg-stone-100 light:text-neutral-600 border-t border-white/5 dark:border-t border-white/5 light:border-neutral-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            {/* Top row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              {/* Brand logo trigger */}
              <button
                onClick={() => scrollToSection("home")}
                className="font-montserrat text-3xl tracking-[0.2em] font-semibold text-white dark:text-white light:text-neutral-950 uppercase focus:outline-none cursor-pointer"
                id="footer-logo-btn"
              >
                MOMENT{" "}
                <span className="font-light text-neutral-400">MAKERZ</span>
              </button>

              {/* Navigation links */}
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {["About", "Portfolio", "Stories", "Services", "Contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="font-mono text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-600 hover:text-white dark:hover:text-white light:hover:text-neutral-950 cursor-pointer focus:outline-none"
                    >
                      {item}
                    </button>
                  ),
                )}
                {/* Admin click portal */}
                <button
                  onClick={() => setIsInboxOpen(true)}
                  className="font-mono text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-600 hover:text-white dark:hover:text-white light:hover:text-neutral-950 cursor-pointer focus:outline-none"
                >
                  Admin Portal
                </button>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-12 border-t border-white/5 dark:border-t border-white/5 light:border-neutral-200 text-[10px] tracking-widest font-mono uppercase">
              <p>© 2026 MOMENT MAKERZ PHOTOGRAPHY. ALL RIGHTS RESERVED.</p>

              {/* Social links */}
              <div className="flex gap-6">
                <a
                  href="https://www.instagram.com/moment.makerz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white dark:hover:text-white light:hover:text-neutral-950"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white dark:hover:text-white light:hover:text-neutral-950"
                >
                  Facebook
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white dark:hover:text-white light:hover:text-neutral-950"
                >
                  Pinterest
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white dark:hover:text-white light:hover:text-neutral-950"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* 14. Sticky WhatsApp Button */}
        <div className="fixed bottom-6 right-6 z-30" id="whatsapp-sticky-slot">
          <motion.a
            href="https://wa.me/919876543210?text=Hello%20Moment%20Makerz!%20I%20would%20like%20to%20inquire%20about%20booking%2520a%2520wedding%2520photography%2520session."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-neutral-900/90 dark:bg-neutral-900/90 light:bg-white text-white dark:text-white light:text-neutral-900 backdrop-blur-md rounded-full shadow-lg border border-white/10 dark:border-white/10 light:border-neutral-250 font-sans font-medium text-xs tracking-widest uppercase hover:scale-105 transition-all focus:outline-none"
            whileHover={{ scale: 1.05 }}
            id="whatsapp-sticky-trigger"
          >
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
            <MessageSquare className="w-4 h-4 text-green-400" />
            <span className="hidden sm:inline">WhatsApp Booking</span>
          </motion.a>
        </div>

        {/* 15. Sliding Enquiry Inbox Modal */}
        <EnquiryInbox
          isOpen={isInboxOpen}
          onClose={() => setIsInboxOpen(false)}
          submissions={submissions}
          setSubmissions={setSubmissions}
        />
      </div>
    </>
  );
}
