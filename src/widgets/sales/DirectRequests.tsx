import { Button } from '@/shared/ui';
import styles from './DirectRequests.module.css';
import type { Lead } from '@/shared/types/dashboard';

interface DirectRequestsProps {
  requests: Lead[];
}

const getStatusLabel = (status: Lead['status']) => {
  switch (status) {
    case 'new':
      return 'Новый';
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
    case 'new':
      return styles.statusNew;
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

export const DirectRequests = ({ requests }: DirectRequestsProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Прямые запросы</h2>
      <p className={styles.subtitle}>
        Заявки, пришедшие с кнопки «Запросить КП» на карточке товара
      </p>

      {requests.length === 0 ? (
        <div className={styles.empty}>Нет новых запросов</div>
      ) : (
        <div className={styles.list}>
          {requests.map((request) => (
            <div key={request.id} className={styles.request}>
              <div className={styles.info}>
                <div className={styles.company}>{request.companyName}</div>
                <div className={styles.equipment}>{request.equipmentName}</div>
                <div className={styles.date}>{request.date}</div>
              </div>
              <div className={styles.actions}>
                <span className={`${styles.status} ${getStatusClass(request.status)}`}>
                  {getStatusLabel(request.status)}
                </span>
                <Button
                  label="Открыть"
                  secondClass="primary"
                  onClick={() => console.log('Open request', request.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

