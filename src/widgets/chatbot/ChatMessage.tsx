import styles from './ChatMessage.module.css';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatMessageProps {
  message: ChatMessage;
}

export const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={`${styles.message} ${styles[`message--${message.role}`]}`}>
      <div className={styles.message__bubble}>{message.content}</div>
      <div className={styles.message__time}>{formatTime(message.timestamp)}</div>
    </div>
  );
};

export const LoadingMessage: React.FC = () => {
  return (
    <div className={`${styles.message} ${styles['message--assistant']}`}>
      <div className={styles.message__loading}>
        <div className={styles.message__loadingDot}></div>
        <div className={styles.message__loadingDot}></div>
        <div className={styles.message__loadingDot}></div>
      </div>
    </div>
  );
};

