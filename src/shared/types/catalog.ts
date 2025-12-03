// Старые типы (для обратной совместимости)
export interface Product {
  id: string;
  name: string;
  category: string;
  series?: string;
  status: 'draft' | 'published' | 'archived';
  completeness: number; // 0-100
  photos: string[];
  drawing?: string;
  mainSpecs: MainSpec[];
  specifications: Specification[];
  passportFile?: string;
  model3dFile?: string;
  estimatedPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface MainSpec {
  id: string;
  name: string;
  value: string;
}

export interface Specification {
  id: string;
  name: string;
  value: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  template: SpecificationTemplate[];
}

export interface SpecificationTemplate {
  name: string;
  type: 'text' | 'number' | 'select' | 'file';
  required: boolean;
  options?: string[];
}

// Новые типы для групп и позиций
export interface CatalogGroup {
  id: string;
  name: string;
  parentId: string | null; // null для корневой группы
  description?: string;
  photo?: string;
  status: 'published' | 'hidden';
  positionCount: number; // Количество позиций в группе
  createdAt: string;
  updatedAt: string;
}

export interface CatalogPosition {
  id: string;
  name: string;
  sku: string; // Артикул/код
  createdAt: string;
  updatedAt: string;
  availability: 'in_stock' | 'on_order';
  deliveryDays?: number; // Срок доставки, если под заказ
  status: 'published' | 'hidden' | 'draft';
  price?: number;
  priceFrom?: boolean; // Цена "от"
  orderCount: number; // Количество заказов
  groupId: string; // ID группы, в которую входит
  categoryId: string; // ID категории (машиностроение, электротехника и т.д.)
  type: 'product' | 'service';
  stock?: number; // Остатки, если в наличии
}

export interface PositionDetails extends CatalogPosition {
  description: string; // С форматированием
  equipment: string; // Комплектация
  specifications: PositionSpecification[];
  tags: string[]; // Личные метки
  searchQueries: string[]; // Поисковые запросы
  promotionMethod?: string; // Способ продвижения
  packaging?: string; // Упаковка
  delivery?: string; // Доставка
  warranty?: string; // Гарантия
  additionalInfo?: string; // Дополнительная информация
  photos: string[]; // Фото по ссылке
  videos: string[]; // Видео по ссылке
}

export interface PositionSpecification {
  id: string;
  name: string;
  value: string;
}

export interface MarketCategory {
  id: string;
  name: string; // машиностроение, электротехника и т.д.
}

