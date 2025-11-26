export interface EquipmentFilters {
  name: string;
  country: string[];
  capacity: {
    min: number | null;
    max: number | null;
  };
  price: {
    min: number | null;
    max: number | null;
  };
  category: string[];
  manufacturer: string[];
}

