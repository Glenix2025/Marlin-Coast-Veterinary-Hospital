export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'services' | 'booking' | 'hours' | 'location' | 'emergency' | 'animals' | 'team' | 'payment' | 'other';
  keywords: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isEmergencyAlert?: boolean;
  quickActions?: { label: string; url?: string; isPhone?: boolean; phoneNum?: string }[];
}

export interface QuickIntent {
  id: string;
  label: string;
  prompt: string;
  iconName: string;
}

export interface PetContext {
  type: string;
  label: string;
  icon: string;
}
