import { Button } from '@/shared/ui';
import styles from './QuestionsList.module.css';
import type { Question } from '@/shared/types/community';

interface QuestionsListProps {
  questions: Question[];
}

export const QuestionsList = ({ questions }: QuestionsListProps) => {
  const unansweredCount = questions.filter((q) => q.status === 'unanswered').length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Вопросы и Ответы (Q&A)</h2>
        {unansweredCount > 0 && (
          <span className={styles.badge}>Неотвеченных: {unansweredCount}</span>
        )}
      </div>

      {questions.length === 0 ? (
        <div className={styles.empty}>Нет вопросов</div>
      ) : (
        <div className={styles.list}>
          {questions.map((question) => (
            <div key={question.id} className={styles.question}>
              <div className={styles.info}>
                <div className={styles.product}>{question.productName}</div>
                <div className={styles.questionText}>{question.question}</div>
                <div className={styles.meta}>
                  <span>От: {question.askedBy}</span>
                  <span>Дата: {question.askedAt}</span>
                </div>
                {question.answer && (
                  <div className={styles.answer}>
                    <strong>Ответ:</strong> {question.answer}
                    {question.answeredAt && (
                      <span className={styles.answerDate}> ({question.answeredAt})</span>
                    )}
                  </div>
                )}
              </div>
              {question.status === 'unanswered' && (
                <Button
                  label="Ответить"
                  secondClass="primary"
                  onClick={() => console.log('Answer question', question.id)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

