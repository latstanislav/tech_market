import { useState } from 'react';
import styles from './Dashboard.module.css';
import { IncomingLeadsWidget } from '@/widgets/dashboard/IncomingLeadsWidget';
import { ReputationWidget } from '@/widgets/dashboard/ReputationWidget';
import { ProductionLoadWidget } from '@/widgets/dashboard/ProductionLoadWidget';
import type { DashboardStats } from '@/shared/types/dashboard';

const mockStats: DashboardStats = {
  newRequests: 5,
  matches: 12,
  rating: 4.8,
  unansweredQuestions: 3,
  pendingReviews: 1,
  pendingReviewsHoursLeft: 48,
  productionStatus: 'free',
};

export const Dashboard = () => {
  const [stats] = useState<DashboardStats>(mockStats);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Дашборд</h1>
      <p className={styles.subtitle}>Пульт управления полетом</p>

      <div className={styles.widgets}>
        <div className={styles.widgetRow}>
          <IncomingLeadsWidget
            newRequests={stats.newRequests}
            matches={stats.matches}
          />
          <ReputationWidget
            rating={stats.rating}
            unansweredQuestions={stats.unansweredQuestions}
            pendingReviews={stats.pendingReviews}
            pendingReviewsHoursLeft={stats.pendingReviewsHoursLeft}
          />
        </div>
        <div className={styles.widgetRow}>
          <ProductionLoadWidget
            status={stats.productionStatus}
            onStatusChange={(status) => {
              console.log('Status changed:', status);
            }}
          />
        </div>
      </div>
    </div>
  );
};

