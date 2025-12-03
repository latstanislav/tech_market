export interface FunnelStats {
  impressions: number;
  cardViews: number;
  pdfDownloads: number;
  drawingDownloads: number;
  quoteRequests: number;
}

export interface CompetitorComparison {
  competitorId: string;
  competitorName: string;
  comparisonCount: number;
}

export interface ViewStats {
  geography: GeographyStats[];
  industries: IndustryStats[];
}

export interface GeographyStats {
  country: string;
  views: number;
}

export interface IndustryStats {
  industry: string;
  views: number;
}

