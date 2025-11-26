import { useState } from 'react';
import styles from './EquipmentFilters.module.css';
import { Input, Dropdown } from '@/shared/ui';
import { Button } from '@/shared/ui';

export interface EquipmentFiltersProps {
  onFilterChange?: (filters: {
    name: string;
    country: string[];
    capacity: { min: number | null; max: number | null };
    price: { min: number | null; max: number | null };
    category: string[];
    manufacturer: string[];
  }) => void;
  onReset?: () => void;
}

const countries = [
  { value: 'kz', label: 'Казахстан' },
  { value: 'ru', label: 'Россия' },
  { value: 'de', label: 'Германия' },
  { value: 'cn', label: 'Китай' },
  { value: 'us', label: 'США' },
  { value: 'jp', label: 'Япония' },
];

const categories = [
  { value: 'machinery', label: 'Станки' },
  { value: 'tools', label: 'Инструменты' },
  { value: 'vehicles', label: 'Транспорт' },
  { value: 'electronics', label: 'Электроника' },
  { value: 'materials', label: 'Материалы' },
];

const manufacturers = [
  { value: 'caterpillar', label: 'Caterpillar' },
  { value: 'komatsu', label: 'Komatsu' },
  { value: 'volvo', label: 'Volvo' },
  { value: 'liebherr', label: 'Liebherr' },
  { value: 'hitachi', label: 'Hitachi' },
];

export const EquipmentFilters: React.FC<EquipmentFiltersProps> = ({
  onFilterChange,
  onReset,
}) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState<string[]>([]);
  const [capacityMin, setCapacityMin] = useState<string>('');
  const [capacityMax, setCapacityMax] = useState<string>('');
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [category, setCategory] = useState<string[]>([]);
  const [manufacturer, setManufacturer] = useState<string[]>([]);

  const handleApply = () => {
    onFilterChange?.({
      name,
      country,
      capacity: {
        min: capacityMin ? parseFloat(capacityMin) : null,
        max: capacityMax ? parseFloat(capacityMax) : null,
      },
      price: {
        min: priceMin ? parseFloat(priceMin) : null,
        max: priceMax ? parseFloat(priceMax) : null,
      },
      category,
      manufacturer,
    });
  };

  const handleReset = () => {
    setName('');
    setCountry([]);
    setCapacityMin('');
    setCapacityMax('');
    setPriceMin('');
    setPriceMax('');
    setCategory([]);
    setManufacturer([]);
    onReset?.();
  };

  return (
    <div className={styles.filters}>
      <h3 className={styles.filters__title}>Фильтры</h3>

      <div className={styles.filters__section}>
        <Input
          label="Название оборудования"
          placeholder="Введите название..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.filters__section}>
        <Dropdown
          label="Страна производитель"
          placeholder="Выберите страну..."
          options={countries}
          value={country}
          onChange={(value) => setCountry(value as string[])}
          multi={true}
          fullWidth={true}
        />
      </div>

      <div className={styles.filters__section}>
        <label className={styles.filters__label}>Производительность</label>
        <div className={styles.filters__range}>
          <Input
            type="number"
            placeholder="Мин."
            value={capacityMin}
            onChange={(e) => setCapacityMin(e.target.value)}
          />
          <span className={styles.filters__range_separator}>-</span>
          <Input
            type="number"
            placeholder="Макс."
            value={capacityMax}
            onChange={(e) => setCapacityMax(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.filters__section}>
        <label className={styles.filters__label}>Цена</label>
        <div className={styles.filters__range}>
          <Input
            type="number"
            placeholder="Мин."
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
          <span className={styles.filters__range_separator}>-</span>
          <Input
            type="number"
            placeholder="Макс."
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.filters__section}>
        <Dropdown
          label="Категория"
          placeholder="Выберите категорию..."
          options={categories}
          value={category}
          onChange={(value) => setCategory(value as string[])}
          multi={true}
          fullWidth={true}
        />
      </div>

      <div className={styles.filters__section}>
        <Dropdown
          label="Производитель"
          placeholder="Выберите производителя..."
          options={manufacturers}
          value={manufacturer}
          onChange={(value) => setManufacturer(value as string[])}
          multi={true}
          fullWidth={true}
        />
      </div>

      <div className={styles.filters__actions}>
        <Button
          label="Применить"
          secondClass="primary"
          onClick={handleApply}
          buttonWidth="100%"
        />
        <Button
          label="Сбросить"
          secondClass="secondary"
          onClick={handleReset}
          buttonWidth="100%"
        />
      </div>
    </div>
  );
};

