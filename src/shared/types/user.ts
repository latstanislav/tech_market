export interface User {
  id: string;
  name: string;
  email: string;
  companyName: string;
  avatar?: string;
  role: 'supplier' | 'buyer' | 'admin';
}

export interface CompanyProfile {
  id: string;
  name: string;
  logo?: string;
  description: string;
  certificates: Certificate[];
  team: TeamMember[];
}

export interface Certificate {
  id: string;
  name: string;
  fileUrl: string;
  type: 'dealer' | 'quality' | 'other';
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  avatar?: string;
}

