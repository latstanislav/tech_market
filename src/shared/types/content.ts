export interface Article {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  views: number;
  products: string[]; // Product IDs
  caseStudy?: CaseStudy;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  result: string;
  clientId?: string;
  clientName?: string;
}

export interface ArticleBlock {
  type: 'text' | 'heading' | 'image' | 'product' | 'list';
  content: string;
  data?: any;
}

