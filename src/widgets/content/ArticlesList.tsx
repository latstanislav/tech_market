import styles from './ArticlesList.module.css';
import type { Article } from '@/shared/types/content';

interface ArticlesListProps {
  articles: Article[];
  onEdit: (article: Article) => void;
}

const getStatusLabel = (status: Article['status']) => {
  return status === 'published' ? 'Опубликовано' : 'Черновик';
};

const getStatusClass = (status: Article['status']) => {
  return status === 'published' ? styles.published : styles.draft;
};

export const ArticlesList = ({ articles, onEdit }: ArticlesListProps) => {
  return (
    <div className={styles.container}>
      {articles.length === 0 ? (
        <div className={styles.empty}>Нет статей. Создайте первую статью.</div>
      ) : (
        <div className={styles.list}>
          {articles.map((article) => (
            <div key={article.id} className={styles.article}>
              <div className={styles.info}>
                <div className={styles.header}>
                  <h3 className={styles.title}>{article.title}</h3>
                  <span className={`${styles.status} ${getStatusClass(article.status)}`}>
                    {getStatusLabel(article.status)}
                  </span>
                </div>
                <div className={styles.meta}>
                  {article.publishedAt && (
                    <span>Опубликовано: {article.publishedAt}</span>
                  )}
                  <span>Просмотры: {article.views}</span>
                  {article.products.length > 0 && (
                    <span>Товаров упомянуто: {article.products.length}</span>
                  )}
                </div>
                {article.caseStudy && (
                  <div className={styles.caseStudy}>
                    <strong>Кейс:</strong> {article.caseStudy.problem} → {article.caseStudy.solution} → {article.caseStudy.result}
                  </div>
                )}
              </div>
              <button
                className={styles.editButton}
                onClick={() => onEdit(article)}
              >
                Редактировать
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

