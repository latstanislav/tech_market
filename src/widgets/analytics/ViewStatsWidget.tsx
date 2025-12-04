import styles from './ViewStatsWidget.module.css';
import type { ViewStats } from '@/shared/types/analytics';

interface ViewStatsWidgetProps {
  stats: ViewStats;
}

export const ViewStatsWidget = ({ stats }: ViewStatsWidgetProps) => {
  const maxGeoViews = Math.max(...stats.geography.map((g) => g.views));
  const maxIndustryViews = Math.max(...stats.industries.map((i) => i.views));

  return (
    <div className={styles.widget}>
      <h2 className={styles.title}>Кто нас смотрит?</h2>
      <p className={styles.subtitle}>
        География и отрасли (без названий компаний, просто статистика)
      </p>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>География</h3>
          <div className={styles.list}>
            {stats.geography.map((geo) => (
              <div key={geo.country} className={styles.item}>
                <div className={styles.label}>{geo.country}</div>
                <div className={styles.bar}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${(geo.views / maxGeoViews) * 100}%` }}
                  ></div>
                </div>
                <div className={styles.value}>{geo.views.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Отрасли</h3>
          <div className={styles.list}>
            {stats.industries.map((industry) => (
              <div key={industry.industry} className={styles.item}>
                <div className={styles.label}>{industry.industry}</div>
                <div className={styles.bar}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${(industry.views / maxIndustryViews) * 100}%` }}
                  ></div>
                </div>
                <div className={styles.value}>{industry.views.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

