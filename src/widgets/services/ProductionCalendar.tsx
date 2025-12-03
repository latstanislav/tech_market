import { useState } from 'react';
import styles from './ProductionCalendar.module.css';

export const ProductionCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Mock calendar data
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      status: i % 3 === 0 ? 'busy' : i % 3 === 1 ? 'partial' : 'free',
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'free':
        return '#4caf50';
      case 'busy':
        return '#f44336';
      case 'partial':
        return '#ff9800';
      default:
        return '#e0e0e0';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'free':
        return 'Свободно';
      case 'busy':
        return 'Занято';
      case 'partial':
        return 'Частично';
      default:
        return status;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Календарь загрузки</h2>
      <p className={styles.subtitle}>
        Управление статусом «Свободное машинное время»
      </p>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: '#4caf50' }}></div>
          <span>Свободно</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: '#ff9800' }}></div>
          <span>Частично</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: '#f44336' }}></div>
          <span>Занято</span>
        </div>
      </div>

      <div className={styles.calendar}>
        {days.map((day) => (
          <div
            key={day.date}
            className={styles.day}
            style={{ borderColor: getStatusColor(day.status) }}
            onClick={() => setSelectedDate(day.date)}
          >
            <div className={styles.dayDate}>
              {new Date(day.date).getDate()}
            </div>
            <div
              className={styles.dayStatus}
              style={{ backgroundColor: getStatusColor(day.status) }}
            >
              {getStatusLabel(day.status)}
            </div>
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className={styles.selectedDate}>
          Выбрана дата: {selectedDate}
          <button
            className={styles.editButton}
            onClick={() => console.log('Edit date', selectedDate)}
          >
            Редактировать
          </button>
        </div>
      )}
    </div>
  );
};

