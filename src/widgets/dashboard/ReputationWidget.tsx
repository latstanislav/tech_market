import { Link } from 'react-router-dom';
import styles from './ReputationWidget.module.css';

interface ReputationWidgetProps {
  rating: number;
  unansweredQuestions: number;
  pendingReviews: number;
  pendingReviewsHoursLeft: number;
}

export const ReputationWidget = ({
  rating,
  unansweredQuestions,
  pendingReviews,
  pendingReviewsHoursLeft,
}: ReputationWidgetProps) => {
  return (
    <div className={styles.widget}>
      <h3 className={styles.title}>Репутация</h3>
      <div className={styles.content}>
        <div className={styles.rating}>
          <div className={styles.ratingValue}>{rating.toFixed(1)}</div>
          <div className={styles.ratingStars}>
            {'★'.repeat(Math.floor(rating))}
            {rating % 1 >= 0.5 && '☆'}
          </div>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Неотвеченные вопросы:</span>
            <span className={styles.statValue}>{unansweredQuestions}</span>
          </div>
        </div>
      </div>
      {pendingReviews > 0 && (
        <div className={styles.alert}>
          ⚠️ У вас {pendingReviews} новый отзыв в карантине (осталось {pendingReviewsHoursLeft} часов на решение)
        </div>
      )}
      <Link to="/cabinet/community" className={styles.link}>
        Перейти к Q&A и отзывам →
      </Link>
    </div>
  );
};

