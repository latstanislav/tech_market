import { Button } from '@/shared/ui';
import styles from './ExchangeRequests.module.css';
import type { Match } from '@/shared/types/dashboard';

interface ExchangeRequestsProps {
  matches: Match[];
}

export const ExchangeRequests = ({ matches }: ExchangeRequestsProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Биржа заявок (AI-Агент)</h2>
      <p className={styles.subtitle}>
        Найдено совпадение из списка снабженца
      </p>

      {matches.length === 0 ? (
        <div className={styles.empty}>Нет совпадений</div>
      ) : (
        <div className={styles.list}>
          {matches.map((match) => (
            <div key={match.id} className={styles.match}>
              <div className={styles.info}>
                <div className={styles.company}>
                  Компании {match.companyName} требуется:
                </div>
                <div className={styles.requirement}>
                  {match.requirement} (строка {match.lineNumber} из сметы)
                </div>
                <div className={styles.date}>{match.date}</div>
              </div>
              <div className={styles.actions}>
                <Button
                  label="Отправить КП"
                  secondClass="primary"
                  onClick={() => console.log('Send quote', match.id)}
                />
                <Button
                  label="Задать вопрос"
                  secondClass="secondary"
                  onClick={() => console.log('Ask question', match.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

