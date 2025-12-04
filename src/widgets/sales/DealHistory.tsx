import styles from './DealHistory.module.css';
import type { Lead } from '@/shared/types/dashboard';

interface DealHistoryProps {
  deals: Lead[];
}

const getStatusLabel = (status: Lead['status']) => {
  switch (status) {
    case 'viewed':
      return 'Просмотрено';
    case 'in_progress':
      return 'В работе';
    case 'rejected':
      return 'Отказ';
    case 'deal':
      return 'Сделка';
    default:
      return status;
  }
};

const getStatusClass = (status: Lead['status']) => {
  switch (status) {
    case 'viewed':
      return styles.statusViewed;
    case 'in_progress':
      return styles.statusInProgress;
    case 'rejected':
      return styles.statusRejected;
    case 'deal':
      return styles.statusDeal;
    default:
      return '';
  }
};

export const DealHistory = ({ deals }: DealHistoryProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>История сделок</h2>
      <p className={styles.subtitle}>
        Архив отправленных КП и статусы
      </p>

      {deals.length === 0 ? (
        <div className={styles.empty}>Нет истории сделок</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Компания</th>
              <th>Оборудование</th>
              <th>Дата</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id}>
                <td>{deal.companyName}</td>
                <td>{deal.equipmentName}</td>
                <td>{deal.date}</td>
                <td>
                  <span className={`${styles.status} ${getStatusClass(deal.status)}`}>
                    {getStatusLabel(deal.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

