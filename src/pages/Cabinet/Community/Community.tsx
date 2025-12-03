import { useState } from 'react';
import styles from './Community.module.css';
import { QuestionsList, ReviewsList, ForumMentions } from '@/widgets/community';
import type { Question, Review, ForumMention } from '@/shared/types/community';

const mockQuestions: Question[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Плавильная печь ПП-1000',
    question: 'Какая максимальная температура?',
    askedBy: 'Иван Петров',
    askedAt: '2024-01-20',
    status: 'unanswered',
  },
  {
    id: '2',
    productId: '2',
    productName: 'Токарный станок ТС-500',
    question: 'Есть ли гарантия?',
    answer: 'Да, гарантия 2 года',
    askedBy: 'Мария Сидорова',
    askedAt: '2024-01-19',
    answeredAt: '2024-01-19',
    status: 'answered',
  },
];

const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Плавильная печь ПП-1000',
    rating: 5,
    text: 'Отличная печь, работает без нареканий',
    author: 'Алексей Иванов',
    authorCompany: 'ООО "Металл"',
    status: 'quarantine',
    createdAt: '2024-01-20',
  },
  {
    id: '2',
    productId: '2',
    productName: 'Токарный станок ТС-500',
    rating: 4,
    text: 'Хороший станок, но есть небольшие недочеты',
    author: 'Петр Сидоров',
    status: 'published',
    createdAt: '2024-01-15',
  },
];

const mockForumMentions: ForumMention[] = [
  {
    id: '1',
    topicId: '101',
    topicTitle: 'Обсуждение плавильных печей для металлургии',
    author: 'Иван Смирнов',
    mentionText: 'Я слышал, что ПромТех делает отличные печи',
    brandName: 'ПромТех',
    createdAt: '2024-01-20',
    read: false,
    url: '/forum/topic/101',
  },
  {
    id: '2',
    topicId: '102',
    topicTitle: 'Рекомендации по выбору токарных станков',
    author: 'Мария Козлова',
    mentionText: 'ПромТех предлагает хорошие цены на станки',
    brandName: 'ПромТех',
    createdAt: '2024-01-19',
    read: true,
    url: '/forum/topic/102',
  },
];

export const Community = () => {
  const [activeTab, setActiveTab] = useState<'questions' | 'reviews' | 'forum'>('questions');
  const [reviewTab, setReviewTab] = useState<'quarantine' | 'published'>('quarantine');

  const quarantineReviews = mockReviews.filter((r) => r.status === 'quarantine');
  const publishedReviews = mockReviews.filter((r) => r.status === 'published');

  return (
    <div className={styles.community}>
      <h1 className={styles.title}>Сообщество и Поддержка</h1>
      <p className={styles.subtitle}>Работа с инженерами и защита репутации</p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'questions' ? styles.active : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          Вопросы и Ответы (Q&A)
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Отзывы и Эксплуатация
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'forum' ? styles.active : ''}`}
          onClick={() => setActiveTab('forum')}
        >
          Форум
          {mockForumMentions.filter((m) => !m.read).length > 0 && (
            <span className={styles.badge}>
              {mockForumMentions.filter((m) => !m.read).length}
            </span>
          )}
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'questions' && <QuestionsList questions={mockQuestions} />}
        {activeTab === 'reviews' && (
          <div>
            <div className={styles.reviewTabs}>
              <button
                className={`${styles.reviewTab} ${reviewTab === 'quarantine' ? styles.active : ''}`}
                onClick={() => setReviewTab('quarantine')}
              >
                Карантин ({quarantineReviews.length})
              </button>
              <button
                className={`${styles.reviewTab} ${reviewTab === 'published' ? styles.active : ''}`}
                onClick={() => setReviewTab('published')}
              >
                Опубликованные ({publishedReviews.length})
              </button>
            </div>
            <ReviewsList
              reviews={reviewTab === 'quarantine' ? quarantineReviews : publishedReviews}
              showQuarantine={reviewTab === 'quarantine'}
            />
          </div>
        )}
        {activeTab === 'forum' && <ForumMentions mentions={mockForumMentions} />}
      </div>
    </div>
  );
};

