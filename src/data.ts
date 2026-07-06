/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem, StoryChapter, ServiceItem, BentoReason, TestimonialItem, InstagramPost } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'The Eternal Embrace',
    location: 'Udaipur Palace, Rajasthan',
    category: 'Weddings',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=85&w=1200',
    aspectRatio: '16:9',
    description: 'A cinematic candid moment of pure joy as the couple steps into their forever under the golden arches of Udaipur.'
  },
  {
    id: 'p2',
    title: 'Laughing in the Rain',
    location: 'Gateway of India, Mumbai',
    category: 'Candid',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=85&w=1200',
    aspectRatio: '3:4',
    description: 'An unscripted, raw laugh shared by the bride during a sudden Mumbai drizzle. Real emotion, zero staging.'
  },
  {
    id: 'p3',
    title: 'Vows of Fire and Silk',
    location: 'Amila Haven, Kerala',
    category: 'Traditional',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=1200',
    aspectRatio: '3:4',
    description: 'The rich texture of traditional Kanjeevaram silk and hand-embroidered sherwani meet in an exchange of sacred glances.'
  },
  {
    id: 'p4',
    title: 'A Promise Under the Arch',
    location: 'Masoori Hills, Uttarakhand',
    category: 'Pre-Wedding',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1200',
    aspectRatio: '4:3',
    description: 'Quiet moments at dawn before the celebrations begin. The stillness of the mountains matches their quiet bond.'
  },
  {
    id: 'p5',
    title: 'The Sacred Bond',
    location: 'Golden Temple Corridor, Amritsar',
    category: 'Traditional',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=85&w=1200',
    aspectRatio: '1:1',
    description: 'A close-up of rings and traditional henna, capturing the legacy and cultural beauty of the union.'
  },
  {
    id: 'p6',
    title: 'Dawn on the Sand dunes',
    location: 'Jaisalmer Desert, Rajasthan',
    category: 'Pre-Wedding',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=85&w=1200',
    aspectRatio: '3:4',
    description: 'A breathtaking pre-wedding portrait framing the couple against the majestic expanse of Thar Desert.'
  },
  {
    id: 'p7',
    title: 'Midnight Sparklers',
    location: 'Alila Diwa, Goa',
    category: 'Post-Wedding',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=85&w=1200',
    aspectRatio: '4:3',
    description: 'The grand departure! Guests forming a sparkling tunnel as the newlyweds dash into the midnight Goan breeze.'
  },
  {
    id: 'p8',
    title: 'The Solitary Path',
    location: 'Falaknuma Palace, Hyderabad',
    category: 'Couple Portraits',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1537907690979-ee8e01276184?auto=format&fit=crop&q=85&w=1200',
    aspectRatio: '3:4',
    description: 'An editorial fashion-inspired couple portrait taking advantage of the historic symmetrical architecture.'
  },
  {
    id: 'p9',
    title: 'Coastline Whispers',
    location: 'Cliffside Kovalam, Kerala',
    category: 'Post-Wedding',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1507504038482-76210374c270?auto=format&fit=crop&q=85&w=1200',
    aspectRatio: '4:3',
    description: 'Deep conversations overlooking the ocean waves on a private cliffside after their wedding reception.'
  },
  {
    id: 'p10',
    title: 'Minimalist Symmetry',
    location: 'White Desert of Kutch, Gujarat',
    category: 'Couple Portraits',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1502472545319-97740264129f?auto=format&fit=crop&q=85&w=1200',
    aspectRatio: '16:9',
    description: 'The vast white salt plains create an surreal, minimalist canvas emphasizing the scale of their love.'
  },
  {
    id: 'p11',
    title: 'Tableaux of Elegance',
    location: 'The Leela Kovalam, Kerala',
    category: 'Post-Wedding',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1519225495810-7517cbd140bc?auto=format&fit=crop&q=85&w=1200',
    aspectRatio: '16:9',
    description: 'A beautiful look at the curated tabletop details and atmospheric design of a luxury shoreline wedding.'
  },
  {
    id: 'p12',
    title: 'Modern Vogue Embrace',
    location: 'Suryagarh Fort, Jaisalmer',
    category: 'Couple Portraits',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=85&w=1200',
    aspectRatio: '4:3',
    description: 'High-fashion editorial posing meets soft romantic tones in a modern architectural corridor.'
  }
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 's1',
    title: 'The Silent Preparation',
    phase: 'Morning Rituals — 08:00 AM',
    description: 'A gentle hum of laughter and early morning sunlight fills the room. Henna dries on delicate fingertips, family stories are shared in whispers, and the bride takes a quiet breath before her life changes forever.',
    imageUrl: 'https://images.unsplash.com/photo-1610123598147-f632aa18b875?auto=format&fit=crop&q=85&w=1200',
    quote: 'The room was quiet, except for the soft sound of silk rustling.'
  },
  {
    id: 's2',
    title: 'Where Two Rivers Meet',
    phase: 'The Wedding Ceremony — 11:30 AM',
    description: 'Under a canopy of marigolds and fresh roses, sacred mantras echo in the courtyard. In a flurry of red petals and warm smoke from the holy fire, their hands clasp, committing to seven lives together.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1200',
    quote: 'Time stood still when we stepped around the holy flame.'
  },
  {
    id: 's3',
    title: 'Whispers in Gold',
    phase: 'Golden Hour Portraits — 05:45 PM',
    description: 'The golden hour of Jaipur draping them in a warm embrace. Away from the crowd, they share a quiet walk through the palace gardens, adjusting each other’s rings with soft, disbelieving smiles.',
    imageUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=85&w=1200',
    quote: 'Just us, and the dying light of a perfect day.'
  },
  {
    id: 's4',
    title: 'The Grand Tableaux',
    phase: 'The Reception Setup — 07:30 PM',
    description: 'A sea of floating candles, crystal chandeliers, and rich jazz music setting the scene. The newlyweds are introduced as Mr. & Mrs. to a standing ovation under the midnight canopy.',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=85&w=1200',
    quote: 'The design was like a grand editorial page in Vogue.'
  },
  {
    id: 's5',
    title: 'The Spark of Forever',
    phase: 'Closing Celebration — 11:30 PM',
    description: 'Hand-held sparklers flare in the dark, casting a magical, dancing glow over the laughing crowd. With cheers ringing out and tears of joy in their eyes, the couple leaves for their next chapter.',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=85&w=1200',
    quote: 'An explosion of light and laughter as we walked out.'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'ser1',
    name: 'Candid Wedding Photography',
    description: 'The heartbeat of our brand. We blend into the shadows to capture raw, unprompted laughter, silent tears, and secret glances.',
    priceEstimate: 'From $2,200',
    features: ['Lead photographer + candid specialist', 'Custom high-end editorial color grading', 'Full resolution digital vault', 'Unlimited consultations']
  },
  {
    id: 'ser2',
    name: 'Traditional & Fine-Art Photography',
    description: 'Preserving legacy. Timeless portraiture and documentation of sacred rituals with elegant lighting and symmetric, clean frames.',
    priceEstimate: 'From $1,800',
    features: ['High-resolution ritual tracking', 'Family legacy portraits', 'Polished classic lighting setups', 'Print-ready digital gallery']
  },
  {
    id: 'ser3',
    name: 'Pre-Wedding & Couple Portraits',
    description: 'Cinematic adventures before the storm. A personalized location photoshoot designed to tell your custom love story.',
    priceEstimate: 'From $1,200',
    features: ['Creative direction & styling advice', 'Multiple location options', 'Multi-outfit changes', 'Fine-art signature edits']
  },
  {
    id: 'ser4',
    name: 'Post-Wedding & Trash-The-Dress',
    description: 'Unwinding after the rush. Creative portraiture in serene beaches, deserts, or historical corridors with absolute creative freedom.',
    priceEstimate: 'From $950',
    features: ['Relaxed, non-rushed environment', 'Experimental visual styling', 'Scenic drone options', 'Digital master files']
  },
  {
    id: 'ser5',
    name: 'Destination Weddings',
    description: 'We travel worldwide to capture your celebrations against pristine backdrops, from Udaipur palaces to Lake Como villas.',
    priceEstimate: 'Inquire for Custom Quote',
    features: ['Global scouting & permits assistance', 'Pre-wedding couple session included', 'Multi-day custom coverage', 'Luxe handcrafted physical album']
  },
  {
    id: 'ser6',
    name: 'Cinematic Wedding Films',
    description: 'Moving poetry. Premium 4K cinematic highlight reels and storytelling movies matching the editorial photography style.',
    priceEstimate: 'From $3,000',
    features: ['Ultra HD multi-angle coverage', 'Professional sound recording', 'Licensed custom soundtrack', 'Sleek teaser for social media']
  }
];

export const BENTO_REASONS: BentoReason[] = [
  {
    id: 'b1',
    title: '4–6 Years Experience',
    description: 'We have shot over 180 weddings across the subcontinent, from grand palace celebrations to intimate modern elopements.',
    tag: 'Legacy'
  },
  {
    id: 'b2',
    title: 'Natural Storytelling',
    description: 'We hate "smile for the camera". We capture real tears, untamed laughter, and fleeting intimate interactions as they unfold naturally.',
    tag: 'Core Value'
  },
  {
    id: 'b3',
    title: 'High-End Editorial Color Grading',
    description: 'Our signatures are soft highlights, rich velvet blacks, and creamy organic skin tones. We treat every image like a Vogue cover.',
    tag: 'Aesthetic'
  },
  {
    id: 'b4',
    title: 'Quick 30-Day Master Delivery',
    description: 'No endless waiting. We deliver a curated digital sneak-peek within 72 hours, and the full master gallery within 30 days.',
    tag: 'Commitment'
  },
  {
    id: 'b5',
    title: 'Personalized Art Direction',
    description: 'We consult closely with couples on wardrobe styling, venue lighting, and event flow to ensure your photos look breathtaking.',
    tag: 'Service'
  },
  {
    id: 'b6',
    title: 'Global Travel & Destination ready',
    description: 'Equipped with lightweight, top-of-the-line Leica and Sony gear, we are optimized to capture stories anywhere on earth.',
    tag: 'Mobility'
  },
  {
    id: 'b7',
    title: 'Luxury Physical Albums',
    description: 'Handcrafted premium leather and silk albums imported from Italy, using heavy museum-grade archival fine-art papers.',
    tag: 'Tangible'
  },
  {
    id: 'b8',
    title: 'Cinematic High-Frame-Rate Style',
    description: 'We capture still imagery with a high-shutter cinematic crop, giving your wedding photos the scale of modern indie films.',
    tag: 'Style'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote: "MOMENT MAKERZ captured the silent tears, the messy laughter, and the crazy dancing. Looking at the gallery feels like reliving the most emotional day of our lives. They didn't just photograph a wedding; they captured our souls.",
    clientName: "Ananya",
    partnerName: "Rahul",
    location: "Jaipur",
    date: "November 2025",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=150"
  },
  {
    id: 't2',
    quote: "Absolute wizards. We were so nervous about feeling stiff, but they made us laugh and act completely ourselves. The colors, the compositions, the oversized framing—it feels like we are characters in a luxury romance film.",
    clientName: "Rhea",
    partnerName: "Karan",
    location: "Goa Beachfront",
    date: "February 2026",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=85&w=150"
  },
  {
    id: 't3',
    quote: "Their team was practically invisible yet captured everything. The sheer detail in the traditional portraits combined with the raw, blurry high-contrast black and whites of the late-night afterparty is pure art.",
    clientName: "Meera",
    partnerName: "Aditya",
    location: "Hyderabad Palace",
    date: "December 2025",
    imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=85&w=150"
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'i1',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=85&w=400',
    likes: 1204,
    comments: 42,
    caption: 'Love in velvet shadows. Shot on location at Udaipur Palace.'
  },
  {
    id: 'i2',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=85&w=400',
    likes: 938,
    comments: 19,
    caption: 'Raw smiles only. Captured mid-laughter in Mumbai. #candid'
  },
  {
    id: 'i3',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=400',
    likes: 2150,
    comments: 88,
    caption: 'The beautiful geometry of traditional drapes and glances.'
  },
  {
    id: 'i4',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=400',
    likes: 1840,
    comments: 54,
    caption: 'Standing still in the rush. Uttarakhand pre-wedding dawn.'
  },
  {
    id: 'i5',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=85&w=400',
    likes: 1530,
    comments: 31,
    caption: 'Dashing into forever. Sparklers exit under Goan skies.'
  },
  {
    id: 'i6',
    imageUrl: 'https://images.unsplash.com/photo-1537907690979-ee8e01276184?auto=format&fit=crop&q=85&w=400',
    likes: 1112,
    comments: 25,
    caption: 'Architectural shadows and royal embraces.'
  }
];
