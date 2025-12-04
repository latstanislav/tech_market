import { Button } from '@/shared/ui';
import styles from './MachinesList.module.css';
import type { Machine } from '@/shared/types/services';

interface MachinesListProps {
  machines: Machine[];
}

export const MachinesList = ({ machines }: MachinesListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Парк оборудования</h2>
        <div className={styles.actions}>
          <Button
            label="Загрузить шильдики/договоры"
            secondClass="secondary"
            onClick={() => console.log('Upload verification')}
          />
          <Button
            label="+ Добавить станок"
            secondClass="primary"
            onClick={() => console.log('Add machine')}
          />
        </div>
      </div>

      <p className={styles.hint}>
        Загрузите фото шильдиков или договоров лизинга для получения галочки «Проверенный парк»
      </p>

      {machines.length === 0 ? (
        <div className={styles.empty}>Нет станков. Добавьте первый станок.</div>
      ) : (
        <div className={styles.list}>
          {machines.map((machine) => (
            <div key={machine.id} className={styles.machine}>
              <div className={styles.info}>
                <div className={styles.name}>{machine.name}</div>
                <div className={styles.details}>
                  {machine.type} • {machine.manufacturer} • {machine.year} год
                </div>
              </div>
              <div className={styles.verification}>
                {machine.verified ? (
                  <span className={styles.verified}>✓ Проверенный парк</span>
                ) : (
                  <span className={styles.notVerified}>Не проверен</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

