import styles from './CompetitorsWidget.module.css';
import type { CompetitorComparison } from '@/shared/types/analytics';

interface CompetitorsWidgetProps {
  competitors: CompetitorComparison[];
}

export const CompetitorsWidget = ({ competitors }: CompetitorsWidgetProps) => {
  const maxCount = Math.max(...competitors.map((c) => c.comparisonCount));

  return (
    <div className={styles.widget}>
      <h2 className={styles.title}>С чем нас сравнивают?</h2>
      <p className={styles.subtitle}>
        Топ-5 конкурентов, с которыми вас добавляли в таблицу сравнения
      </p>

      <div className={styles.list}>
        {competitors.map((competitor, index) => (
          <div key={competitor.competitorId} className={styles.item}>
            <div className={styles.rank}>#{index + 1}</div>
            <div className={styles.info}>
              <div className={styles.name}>{competitor.competitorName}</div>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{ width: `${(competitor.comparisonCount / maxCount) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className={styles.count}>{competitor.comparisonCount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

