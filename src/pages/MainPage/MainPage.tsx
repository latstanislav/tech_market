import { useState } from 'react';
import styles from './MainPage.module.css';
import { Header, Footer, Chatbot } from '@/widgets';
import { EquipmentFilters } from '@/features/filters';
import { EquipmentCard } from '@/entities/equipment';
import type { EquipmentFiltersType } from '@/features/filters';
import type { Equipment } from '@/shared/types/equipment';

const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Экскаватор CAT 320D',
    manufacturer: 'caterpillar',
    country: 'us',
    capacity: 20,
    price: 25000000,
    category: 'machinery',
    description: 'Гусеничный экскаватор с ковшом 1.2 м³',
  },
  {
    id: '2',
    name: 'Бульдозер Komatsu D65',
    manufacturer: 'komatsu',
    country: 'jp',
    capacity: 15,
    price: 18000000,
    category: 'machinery',
    description: 'Бульдозер с отвалом 3.5 м',
  },
  {
    id: '3',
    name: 'Самосвал Volvo FMX',
    manufacturer: 'volvo',
    country: 'de',
    capacity: 25,
    price: 12000000,
    category: 'vehicles',
    description: 'Грузовик грузоподъемностью 20 тонн',
  },
  {
    id: '4',
    name: 'Кран Liebherr LTM 1100',
    manufacturer: 'liebherr',
    country: 'de',
    capacity: 100,
    price: 45000000,
    category: 'machinery',
    description: 'Мобильный кран грузоподъемностью 100 тонн',
  },
  {
    id: '5',
    name: 'Погрузчик Hitachi ZW220',
    manufacturer: 'hitachi',
    country: 'jp',
    capacity: 3.5,
    price: 15000000,
    category: 'machinery',
    description: 'Колесный погрузчик с ковшом 3.5 м³',
  },
];

export const MainPage = () => {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<EquipmentFiltersType | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const handleFilterChange = (newFilters: EquipmentFiltersType) => {
    setFilters(newFilters);
  };

  const filteredEquipment = mockEquipment.filter((item) => {
    if (filters) {
      if (filters.name && !item.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      if (filters.country.length > 0 && !filters.country.includes(item.country)) {
        return false;
      }
      if (filters.category.length > 0 && !filters.category.includes(item.category)) {
        return false;
      }
      if (filters.manufacturer.length > 0 && !filters.manufacturer.includes(item.manufacturer)) {
        return false;
      }
      if (filters.capacity.min !== null && item.capacity < filters.capacity.min) {
        return false;
      }
      if (filters.capacity.max !== null && item.capacity > filters.capacity.max) {
        return false;
      }
      if (filters.price.min !== null && item.price < filters.price.min) {
        return false;
      }
      if (filters.price.max !== null && item.price > filters.price.max) {
        return false;
      }
    }
    if (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className={styles.mainPage}>
      <Header
        searchText={searchText}
        onSearchChange={setSearchText}
        isAuthenticated={false}
      />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <button
            className={styles.filtersToggle}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
          </button>
          {showFilters && (
            <EquipmentFilters
              onFilterChange={handleFilterChange}
              onReset={() => setFilters(null)}
            />
          )}
        </div>
        <div className={styles.equipmentList}>
          <h1 className={styles.title}>Каталог промышленного оборудования</h1>
          <p className={styles.subtitle}>
            Найдено: {filteredEquipment.length} единиц оборудования
          </p>
          <div className={styles.cards}>
            {filteredEquipment.length > 0 ? (
              filteredEquipment.map((item) => (
                <EquipmentCard key={item.id} equipment={item} />
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>Оборудование не найдено</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

