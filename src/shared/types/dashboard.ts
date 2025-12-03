export interface DashboardStats {
  newRequests: number;
  matches: number;
  rating: number;
  unansweredQuestions: number;
  pendingReviews: number;
  pendingReviewsHoursLeft: number;
  productionStatus: 'free' | 'busy';
}

export interface Lead {
  id: string;
  companyName: string;
  equipmentName: string;
  date: string;
  status: 'new' | 'viewed' | 'in_progress' | 'rejected' | 'deal';
}

export interface Match {
  id: string;
  companyName: string;
  requirement: string;
  lineNumber: number;
  date: string;
}

