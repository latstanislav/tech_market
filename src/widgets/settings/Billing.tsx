import styles from './Billing.module.css';
import { Button } from '@/shared/ui';

export const Billing = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Биллинг</h2>
      <p className={styles.subtitle}>
        Оплата доступа к контактам лидов или подписка
      </p>

      <div className={styles.plans}>
        <div className={styles.plan}>
          <h3 className={styles.planName}>Базовый</h3>
          <div className={styles.planPrice}>Бесплатно</div>
          <ul className={styles.planFeatures}>
            <li>До 10 товаров в каталоге</li>
            <li>Базовая аналитика</li>
            <li>Ограниченный доступ к лидам</li>
          </ul>
          <Button label="Текущий план" secondClass="secondary" />
        </div>

        <div className={styles.plan}>
          <h3 className={styles.planName}>Профессиональный</h3>
          <div className={styles.planPrice}>5 000 ₽/мес</div>
          <ul className={styles.planFeatures}>
            <li>Неограниченное количество товаров</li>
            <li>Полная аналитика</li>
            <li>Доступ к контактам всех лидов</li>
            <li>Приоритетная поддержка</li>
          </ul>
          <Button label="Выбрать план" secondClass="primary" />
        </div>

        <div className={styles.plan}>
          <h3 className={styles.planName}>Премиум</h3>
          <div className={styles.planPrice}>15 000 ₽/мес</div>
          <ul className={styles.planFeatures}>
            <li>Все из Профессионального</li>
            <li>AI-агент для поиска заявок</li>
            <li>Персональный менеджер</li>
            <li>Кастомные интеграции</li>
          </ul>
          <Button label="Выбрать план" secondClass="primary" />
        </div>
      </div>

      <div className={styles.paymentHistory}>
        <h3 className={styles.sectionTitle}>История платежей</h3>
        <div className={styles.empty}>Нет истории платежей</div>
      </div>
    </div>
  );
};

