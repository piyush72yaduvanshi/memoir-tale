/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  linkText: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
  tip?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subject: string;
  excerpt: string;
  fullStory: string;
  image: string;
  year: string;
  pageCount: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  stars: number;
  quote: string;
  avatar: string;
  category: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Process' | 'Shipping' | 'Privacy';
}
