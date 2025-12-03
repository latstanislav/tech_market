import { useState } from 'react';
import { Button } from '@/shared/ui';
import styles from './ForumMentions.module.css';
import type { ForumMention } from '@/shared/types/community';

interface ForumMentionsProps {
  mentions: ForumMention[];
}

export const ForumMentions = ({ mentions }: ForumMentionsProps) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('unread');

  const filteredMentions = filter === 'unread'
    ? mentions.filter((m) => !m.read)
    : mentions;

  const unreadCount = mentions.filter((m) => !m.read).length;

  const handleMarkAsRead = (id: string) => {
    // Здесь будет логика пометки как прочитанное
    console.log('Mark as read:', id);
  };

  const handleMarkAllAsRead = () => {
    // Здесь будет логика пометки всех как прочитанные
    console.log('Mark all as read');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Форум: Упоминания бренда</h2>
        <div className={styles.actions}>
          {unreadCount > 0 && (
            <Button
              label={`Отметить все прочитанными (${unreadCount})`}
              secondClass="secondary"
              onClick={handleMarkAllAsRead}
            />
          )}
        </div>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filter} ${filter === 'unread' ? styles.active : ''}`}
          onClick={() => setFilter('unread')}
        >
          Непрочитанные ({unreadCount})
        </button>
        <button
          className={`${styles.filter} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          Все ({mentions.length})
        </button>
      </div>

      {filteredMentions.length === 0 ? (
        <div className={styles.empty}>
          {filter === 'unread'
            ? 'Нет непрочитанных упоминаний'
            : 'Нет упоминаний бренда'}
        </div>
      ) : (
        <div className={styles.list}>
          {filteredMentions.map((mention) => (
            <div
              key={mention.id}
              className={`${styles.mention} ${!mention.read ? styles.unread : ''}`}
            >
              <div className={styles.info}>
                <div className={styles.headerRow}>
                  <div className={styles.topicTitle}>{mention.topicTitle}</div>
                  {!mention.read && <span className={styles.badge}>Новое</span>}
                </div>
                <div className={styles.author}>
                  Автор: {mention.author} • {new Date(mention.createdAt).toLocaleDateString('ru-RU')}
                </div>
                <div className={styles.mentionText}>
                  <strong>Упоминание:</strong> "{mention.mentionText}"
                </div>
                <div className={styles.brandName}>
                  Упомянут бренд: <strong>{mention.brandName}</strong>
                </div>
              </div>
              <div className={styles.actions}>
                {!mention.read && (
                  <Button
                    label="Отметить прочитанным"
                    secondClass="secondary"
                    onClick={() => handleMarkAsRead(mention.id)}
                  />
                )}
                {mention.url && (
                  <Button
                    label="Перейти к обсуждению"
                    secondClass="primary"
                    onClick={() => window.open(mention.url, '_blank')}
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

