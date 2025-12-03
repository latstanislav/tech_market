import { useState } from 'react';
import styles from './Sales.module.css';
import { DirectRequests } from '@/widgets/sales/DirectRequests';
import { ExchangeRequests } from '@/widgets/sales/ExchangeRequests';
import { DealHistory } from '@/widgets/sales/DealHistory';
import type { Lead, Match } from '@/shared/types/dashboard';

const mockDirectRequests: Lead[] = [
  {
    id: '1',
    companyName: 'ООО "Промстрой"',
    equipmentName: 'Плавильная печь ПП-1000',
    date: '2024-01-20',
    status: 'new',
  },
  {
    id: '2',
    companyName: 'АО "Металлург"',
    equipmentName: 'Токарный станок ТС-500',
    date: '2024-01-19',
    status: 'viewed',
  },
];

const mockMatches: Match[] = [
  {
    id: '1',
    companyName: 'ООО "Завод Машин"',
    requirement: 'Плавильная печь',
    lineNumber: 12,
    date: '2024-01-20',
  },
  {
    id: '2',
    companyName: 'ПАО "Промышленность"',
    requirement: 'Токарный станок',
    lineNumber: 5,
    date: '2024-01-19',
  },
];

const mockDeals: Lead[] = [
  {
    id: '1',
    companyName: 'ООО "Стройкомплекс"',
    equipmentName: 'Кран Liebherr LTM 1100',
    date: '2024-01-15',
    status: 'deal',
  },
  {
    id: '2',
    companyName: 'АО "Металл"',
    equipmentName: 'Экскаватор CAT 320D',
    date: '2024-01-10',
    status: 'in_progress',
  },
];

export const Sales = () => {
  const [activeTab, setActiveTab] = useState<'direct' | 'exchange' | 'history'>('direct');

  return (
    <div className={styles.sales}>
      <h1 className={styles.title}>Центр Продаж</h1>
      <p className={styles.subtitle}>CRM-Lite для управления запросами и сделками</p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'direct' ? styles.active : ''}`}
          onClick={() => setActiveTab('direct')}
        >
          Прямые запросы
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'exchange' ? styles.active : ''}`}
          onClick={() => setActiveTab('exchange')}
        >
          Биржа заявок (AI-Агент)
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'history' ? styles.active : ''}`}
          onClick={() => setActiveTab('history')}
        >
          История сделок
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'direct' && <DirectRequests requests={mockDirectRequests} />}
        {activeTab === 'exchange' && <ExchangeRequests matches={mockMatches} />}
        {activeTab === 'history' && <DealHistory deals={mockDeals} />}
      </div>
    </div>
  );
};

