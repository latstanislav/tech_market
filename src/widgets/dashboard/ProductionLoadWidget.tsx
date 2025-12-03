import styles from './ProductionLoadWidget.module.css';

interface ProductionLoadWidgetProps {
  status: 'free' | 'busy';
  onStatusChange: (status: 'free' | 'busy') => void;
}

export const ProductionLoadWidget = ({ status, onStatusChange }: ProductionLoadWidgetProps) => {
  return (
    <div className={styles.widget}>
      <h3 className={styles.title}>Загрузка производства</h3>
      <div className={styles.content}>
        <div className={styles.toggleContainer}>
          <button
            className={`${styles.toggle} ${status === 'free' ? styles.active : ''}`}
            onClick={() => onStatusChange('free')}
          >
            Свободны
          </button>
          <button
            className={`${styles.toggle} ${status === 'busy' ? styles.active : ''}`}
            onClick={() => onStatusChange('busy')}
          >
            Загружены
          </button>
        </div>
        <div className={styles.statusIndicator}>
          <div className={`${styles.indicator} ${styles[status]}`}></div>
          <span className={styles.statusText}>
            {status === 'free' ? 'Производство свободно' : 'Производство загружено'}
          </span>
        </div>
      </div>
    </div>
  );
};

