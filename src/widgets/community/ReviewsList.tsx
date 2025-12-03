import { Button } from '@/shared/ui';
import styles from './ReviewsList.module.css';
import type { Review } from '@/shared/types/community';

interface ReviewsListProps {
  reviews: Review[];
  showQuarantine: boolean;
}

export const ReviewsList = ({ reviews, showQuarantine }: ReviewsListProps) => {
  return (
    <div className={styles.container}>
      {reviews.length === 0 ? (
        <div className={styles.empty}>
          {showQuarantine ? 'Нет отзывов в карантине' : 'Нет опубликованных отзывов'}
        </div>
      ) : (
        <div className={styles.list}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.review}>
              <div className={styles.info}>
                <div className={styles.header}>
                  <div>
                    <div className={styles.product}>{review.productName}</div>
                    <div className={styles.author}>
                      {review.author}
                      {review.authorCompany && ` (${review.authorCompany})`}
                    </div>
                  </div>
                  <div className={styles.rating}>
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <div className={styles.text}>{review.text}</div>
                <div className={styles.date}>{review.createdAt}</div>
                {showQuarantine && review.status === 'quarantine' && (
                  <div className={styles.quarantineAlert}>
                    ⚠️ Отзыв в карантине. Требуется решение.
                  </div>
                )}
                {review.status === 'disputed' && (
                  <div className={styles.disputedAlert}>
                    Отзыв оспорен. Ожидается подтверждение владения.
                  </div>
                )}
              </div>
              <div className={styles.actions}>
                {showQuarantine && review.status === 'quarantine' && (
                  <>
                    <Button
                      label="Опубликовать"
                      secondClass="primary"
                      onClick={() => console.log('Publish review', review.id)}
                    />
                    <Button
                      label="Оспорить"
                      secondClass="secondary"
                      onClick={() => console.log('Dispute review', review.id)}
                    />
                  </>
                )}
                {review.status === 'disputed' && (
                  <Button
                    label="Загрузить доказательства"
                    secondClass="secondary"
                    onClick={() => console.log('Upload proof', review.id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

