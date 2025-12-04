import { useState } from 'react';
import styles from './Services.module.css';
import { ServicesList } from '@/widgets/services/ServicesList';
import { MachinesList } from '@/widgets/services/MachinesList';
import { ProductionCalendar } from '@/widgets/services/ProductionCalendar';
import type { Service, Machine } from '@/shared/types/services';

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Токарная обработка',
    description: 'Токарная обработка деталей до 500 мм',
    category: 'machining',
    status: 'active',
  },
  {
    id: '2',
    name: 'Фрезерная обработка',
    description: 'Фрезерование деталей любой сложности',
    category: 'machining',
    status: 'active',
  },
];

const mockMachines: Machine[] = [
  {
    id: '1',
    name: 'Токарный станок ТС-500',
    type: 'Токарный',
    manufacturer: 'DMG Mori',
    year: 2020,
    verified: true,
    verificationFiles: [],
  },
  {
    id: '2',
    name: 'Фрезерный станок ФС-300',
    type: 'Фрезерный',
    manufacturer: 'Haas',
    year: 2021,
    verified: false,
    verificationFiles: [],
  },
];

export const Services = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'machines' | 'calendar'>('services');

  return (
    <div className={styles.services}>
      <h1 className={styles.title}>Услуги и Производство</h1>
      <p className={styles.subtitle}>Управление услугами и производственными мощностями</p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'services' ? styles.active : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Мои услуги
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'machines' ? styles.active : ''}`}
          onClick={() => setActiveTab('machines')}
        >
          Парк оборудования
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'calendar' ? styles.active : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          Календарь загрузки
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'services' && <ServicesList services={mockServices} />}
        {activeTab === 'machines' && <MachinesList machines={mockMachines} />}
        {activeTab === 'calendar' && <ProductionCalendar />}
      </div>
    </div>
  );
};

