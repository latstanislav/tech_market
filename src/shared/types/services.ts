export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'machining' | 'assembly' | 'maintenance' | 'other';
  status: 'active' | 'inactive';
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  year: number;
  verified: boolean;
  verificationFiles: string[];
}

export interface ProductionCalendar {
  date: string;
  status: 'free' | 'busy' | 'partial';
  machines: MachineAvailability[];
}

export interface MachineAvailability {
  machineId: string;
  status: 'free' | 'busy';
  hours: number;
}

