/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  category: 'Weddings' | 'Candid' | 'Traditional' | 'Pre-Wedding' | 'Post-Wedding' | 'Couple Portraits';
  year: string;
  imageUrl: string;
  aspectRatio: '1:1' | '16:9' | '4:3' | '3:4' | '9:16';
  description?: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  phase: string;
  description: string;
  imageUrl: string;
  quote?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  priceEstimate?: string;
  features: string[];
}

export interface BentoReason {
  id: string;
  title: string;
  description: string;
  tag?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  partnerName?: string;
  location: string;
  date: string;
  imageUrl?: string;
}

export interface InquirySubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  location: string;
  message: string;
  submittedAt: string;
  status: 'New' | 'Replied' | 'Archived';
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
}
