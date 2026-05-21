export type AppTab = 'HISTORY' | 'EXHIBITION' | 'ARCHIVE' | 'SHOP' | 'TICKETS';

export type AppTheme = 'YELLOW' | 'CMYK';

export interface DispatchArticle {
  id: string;
  title: string;
  koreanTitle: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface RetroProduct {
  id: string;
  name: string;
  koreanName: string;
  price: number;
  description: string;
  image: string;
  category: 'bread' | 'merch';
  badges: string[];
}

export interface AnniversaryTicket {
  id: string;
  name: string;
  issueDate: string;
  ticketType: 'VIP' | 'STANDARD' | 'BAKER_PASS';
  specialtyBadge: string;
  serialNumber: string;
}

export interface ExhibitionSlide {
  id: string;
  title: string;
  koreanTitle: string;
  year: string;
  description: string;
  funFact: string;
  image: string;
  soundBubble: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  koreanTitle: string;
  description: string;
  fact: string;
  icon: string;
  badgeText: string;
}
