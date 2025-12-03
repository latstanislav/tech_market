import styles from './FunnelWidget.module.css';
import type { FunnelStats } from '@/shared/types/analytics';

interface FunnelWidgetProps {
  stats: FunnelStats;
}

export const FunnelWidget = ({ stats }: FunnelWidgetProps) => {
  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) : '0';
  };

  return (
    <div className={styles.widget}>
      <h2 className={styles.title}>Воронка продаж</h2>
      <p className={styles.subtitle}>
        Показы плитки → Раскрытие карточки → Скачивание PDF/Чертежа → Запрос КП
      </p>

      <div className={styles.funnel}>
        <div className={styles.step}>
          <div className={styles.stepLabel}>Показы плитки</div>
          <div className={styles.stepValue}>{stats.impressions.toLocaleString()}</div>
          <div className={styles.stepBar}>
            <div className={styles.stepBarFill} style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepLabel}>
            Раскрытие карточки ({calculatePercentage(stats.cardViews, stats.impressions)}%)
          </div>
          <div className={styles.stepValue}>{stats.cardViews.toLocaleString()}</div>
          <div className={styles.stepBar}>
            <div
              className={styles.stepBarFill}
              style={{ width: `${calculatePercentage(stats.cardViews, stats.impressions)}%` }}
            ></div>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepLabel}>
            Скачивание PDF ({calculatePercentage(stats.pdfDownloads, stats.cardViews)}%)
          </div>
          <div className={styles.stepValue}>{stats.pdfDownloads.toLocaleString()}</div>
          <div className={styles.stepBar}>
            <div
              className={styles.stepBarFill}
              style={{ width: `${calculatePercentage(stats.pdfDownloads, stats.cardViews)}%` }}
            ></div>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepLabel}>
            Скачивание чертежа ({calculatePercentage(stats.drawingDownloads, stats.cardViews)}%)
          </div>
          <div className={styles.stepValue}>{stats.drawingDownloads.toLocaleString()}</div>
          <div className={styles.stepBar}>
            <div
              className={styles.stepBarFill}
              style={{ width: `${calculatePercentage(stats.drawingDownloads, stats.cardViews)}%` }}
            ></div>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepLabel}>
            Запрос КП ({calculatePercentage(stats.quoteRequests, stats.cardViews)}%)
          </div>
          <div className={styles.stepValue}>{stats.quoteRequests.toLocaleString()}</div>
          <div className={styles.stepBar}>
            <div
              className={styles.stepBarFill}
              style={{ width: `${calculatePercentage(stats.quoteRequests, stats.cardViews)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

