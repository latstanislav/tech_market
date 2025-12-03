import { Link } from 'react-router-dom';
import styles from './IncomingLeadsWidget.module.css';

interface IncomingLeadsWidgetProps {
  newRequests: number;
  matches: number;
}

export const IncomingLeadsWidget = ({ newRequests, matches }: IncomingLeadsWidgetProps) => {
  return (
    <div className={styles.widget}>
      <h3 className={styles.title}>Входящие лиды</h3>
      <div className={styles.content}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{newRequests}</div>
          <div className={styles.statLabel}>Новые запросы КП</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{matches}</div>
          <div className={styles.statLabel}>Совпадения от «Агента закупок»</div>
        </div>
      </div>
      <Link to="/cabinet/sales" className={styles.link}>
        Перейти к запросам →
      </Link>
    </div>
  );
};

