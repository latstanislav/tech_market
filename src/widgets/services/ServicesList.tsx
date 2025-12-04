import { Button } from '@/shared/ui';
import styles from './ServicesList.module.css';
import type { Service } from '@/shared/types/services';

interface ServicesListProps {
  services: Service[];
}

const getCategoryLabel = (category: Service['category']) => {
  switch (category) {
    case 'machining':
      return 'Металлообработка';
    case 'assembly':
      return 'Сборка';
    case 'maintenance':
      return 'Обслуживание';
    case 'other':
      return 'Другое';
    default:
      return category;
  }
};

export const ServicesList = ({ services }: ServicesListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Мои услуги</h2>
        <Button
          label="+ Добавить услугу"
          secondClass="primary"
          onClick={() => console.log('Add service')}
        />
      </div>

      {services.length === 0 ? (
        <div className={styles.empty}>Нет услуг. Добавьте первую услугу.</div>
      ) : (
        <div className={styles.list}>
          {services.map((service) => (
            <div key={service.id} className={styles.service}>
              <div className={styles.info}>
                <div className={styles.name}>{service.name}</div>
                <div className={styles.category}>{getCategoryLabel(service.category)}</div>
                <div className={styles.description}>{service.description}</div>
              </div>
              <div className={styles.actions}>
                <span className={`${styles.status} ${service.status === 'active' ? styles.active : ''}`}>
                  {service.status === 'active' ? 'Активна' : 'Неактивна'}
                </span>
                <Button
                  label="Редактировать"
                  secondClass="secondary"
                  onClick={() => console.log('Edit service', service.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

