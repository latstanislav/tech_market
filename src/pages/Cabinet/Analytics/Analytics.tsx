import styles from './Analytics.module.css';
import { FunnelWidget } from '@/widgets/analytics/FunnelWidget';
import { CompetitorsWidget } from '@/widgets/analytics/CompetitorsWidget';
import { ViewStatsWidget } from '@/widgets/analytics/ViewStatsWidget';
import type { FunnelStats, CompetitorComparison, ViewStats } from '@/shared/types/analytics';

const mockFunnelStats: FunnelStats = {
  impressions: 10000,
  cardViews: 3500,
  pdfDownloads: 1200,
  drawingDownloads: 800,
  quoteRequests: 450,
};

const mockCompetitors: CompetitorComparison[] = [
  { competitorId: '1', competitorName: 'Компания А', comparisonCount: 125 },
  { competitorId: '2', competitorName: 'Компания Б', comparisonCount: 98 },
  { competitorId: '3', competitorName: 'Компания В', comparisonCount: 76 },
  { competitorId: '4', competitorName: 'Компания Г', comparisonCount: 54 },
  { competitorId: '5', competitorName: 'Компания Д', comparisonCount: 32 },
];

const mockViewStats: ViewStats = {
  geography: [
    { country: 'Россия', views: 8500 },
    { country: 'Казахстан', views: 1200 },
    { country: 'Беларусь', views: 300 },
  ],
  industries: [
    { industry: 'Металлургия', views: 4500 },
    { industry: 'Машиностроение', views: 3200 },
    { industry: 'Строительство', views: 2300 },
  ],
};

export const Analytics = () => {
  return (
    <div className={styles.analytics}>
      <h1 className={styles.title}>Аналитика</h1>
      <p className={styles.subtitle}>Статистика и метрики для понимания эффективности</p>

      <div className={styles.widgets}>
        <FunnelWidget stats={mockFunnelStats} />
        <CompetitorsWidget competitors={mockCompetitors} />
        <ViewStatsWidget stats={mockViewStats} />
      </div>
    </div>
  );
};

