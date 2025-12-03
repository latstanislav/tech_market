export interface Question {
  id: string;
  productId: string;
  productName: string;
  question: string;
  answer?: string;
  askedBy: string;
  askedAt: string;
  answeredAt?: string;
  status: 'unanswered' | 'answered';
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  text: string;
  author: string;
  authorCompany?: string;
  status: 'quarantine' | 'published' | 'disputed';
  createdAt: string;
  disputeReason?: string;
  ownershipProof?: string;
}

export interface ForumMention {
  id: string;
  topicId: string;
  topicTitle: string;
  author: string;
  mentionText: string;
  brandName: string;
  createdAt: string;
  read: boolean;
  url?: string;
}

