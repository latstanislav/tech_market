import { useState } from 'react';
import styles from './Content.module.css';
import { ArticlesList } from '@/widgets/content/ArticlesList';
import { ArticleEditor } from '@/widgets/content/ArticleEditor';
import { Button } from '@/shared/ui';
import type { Article } from '@/shared/types/content';

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Как выбрать плавильную печь',
    content: '',
    status: 'published',
    publishedAt: '2024-01-15',
    views: 1250,
    products: ['1'],
  },
  {
    id: '2',
    title: 'Кейс: Внедрение токарного станка на заводе',
    content: '',
    status: 'draft',
    views: 0,
    products: ['2'],
    caseStudy: {
      problem: 'Низкая производительность',
      solution: 'Внедрение нового станка',
      result: 'Увеличение производительности на 40%',
    },
  },
];

export const Content = () => {
  const [articles] = useState<Article[]>(mockArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleCreateArticle = () => {
    setSelectedArticle(null);
    setShowEditor(true);
  };

  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setSelectedArticle(null);
  };

  if (showEditor) {
    return (
      <ArticleEditor
        article={selectedArticle}
        onClose={handleCloseEditor}
        onSave={(article) => {
          console.log('Saving article:', article);
          handleCloseEditor();
        }}
      />
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Контент-маркетинг</h1>
          <p className={styles.subtitle}>Ваш «Хабр» для привлечения трафика</p>
        </div>
        <div className={styles.actions}>
          <Button
            label="+ Новая статья"
            secondClass="primary"
            onClick={handleCreateArticle}
          />
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>Мои статьи</button>
        <button className={styles.tab}>Кейсы внедрения</button>
      </div>

      <ArticlesList articles={articles} onEdit={handleEditArticle} />
    </div>
  );
};

