import { useState } from 'react';
import styles from './ArticleEditor.module.css';
import { Button, Input } from '@/shared/ui';
import type { Article } from '@/shared/types/content';
import type { Product } from '@/shared/types/catalog';

interface ArticleEditorProps {
  article: Article | null;
  onClose: () => void;
  onSave: (article: Partial<Article>) => void;
}

// Моковые данные товаров (в реальном приложении будут загружаться из API)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Плавильная печь ПП-1000',
    category: 'Печи',
    series: 'ПП-серия',
    status: 'published',
    completeness: 85,
    photos: [],
    mainSpecs: [
      { id: '1', name: 'Мощность', value: '1000 кВт' },
      { id: '2', name: 'Температура', value: '1600°C' },
    ],
    specifications: [],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: '2',
    name: 'Токарный станок ТС-500',
    category: 'Станки',
    status: 'published',
    completeness: 90,
    photos: [],
    mainSpecs: [],
    specifications: [],
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
  },
];

export const ArticleEditor = ({ article, onSave, onClose }: ArticleEditorProps) => {
  const [formData, setFormData] = useState<Partial<Article>>({
    title: article?.title || '',
    content: article?.content || '',
    status: article?.status || 'draft',
    products: article?.products || [],
    caseStudy: article?.caseStudy,
  });

  const [isCaseStudy, setIsCaseStudy] = useState(!!article?.caseStudy);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleInputChange = (field: keyof Article, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCaseStudyChange = (field: 'problem' | 'solution' | 'result', value: string) => {
    setFormData((prev) => ({
      ...prev,
      caseStudy: {
        ...(prev.caseStudy || { problem: '', solution: '', result: '' }),
        [field]: value,
      },
    }));
  };

  const handleInsertProduct = (product: Product) => {
    const productCard = `[PRODUCT:${product.id}:${product.name}]`;
    const content = formData.content || '';
    const newContent =
      content.slice(0, cursorPosition) + productCard + content.slice(cursorPosition);
    
    setFormData((prev) => ({
      ...prev,
      content: newContent,
      products: [...(prev.products || []), product.id].filter(
        (id, index, self) => self.indexOf(id) === index
      ),
    }));
    
    setShowProductSelector(false);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCursorPosition(e.target.selectionStart || 0);
    handleInputChange('content', e.target.value);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h2>{article ? 'Редактирование статьи' : 'Новая статья'}</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.field}>
          <label>Название статьи *</label>
          <Input
            type="text"
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Введите название статьи"
          />
        </div>

        <div className={styles.field}>
          <div className={styles.textareaHeader}>
            <label>Содержание</label>
            <Button
              label="📦 Упомянуть мое оборудование"
              secondClass="secondary"
              onClick={() => setShowProductSelector(!showProductSelector)}
            />
          </div>
          {showProductSelector && (
            <div className={styles.productSelector}>
              <h4>Выберите товар для вставки:</h4>
              <div className={styles.productList}>
                {mockProducts
                  .filter((p) => p.status === 'published')
                  .map((product) => (
                    <div
                      key={product.id}
                      className={styles.productItem}
                      onClick={() => handleInsertProduct(product)}
                    >
                      <div className={styles.productName}>{product.name}</div>
                      <div className={styles.productCategory}>{product.category}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <textarea
            className={styles.textarea}
            value={formData.content || ''}
            onChange={handleTextareaChange}
            onSelect={(e) => {
              const target = e.target as HTMLTextAreaElement;
              setCursorPosition(target.selectionStart || 0);
            }}
            placeholder="Введите текст статьи..."
            rows={15}
          />
          <p className={styles.hint}>
            Используйте кнопку "Упомянуть мое оборудование" для вставки карточки товара в текст
          </p>
        </div>

        <div className={styles.field}>
          <label>
            <input
              type="checkbox"
              checked={isCaseStudy}
              onChange={(e) => setIsCaseStudy(e.target.checked)}
            />
            Кейс внедрения (Проблема → Решение → Результат)
          </label>
          {isCaseStudy && (
            <div className={styles.caseStudyFields}>
              <div className={styles.field}>
                <label>Проблема</label>
                <Input
                  type="text"
                  value={formData.caseStudy?.problem || ''}
                  onChange={(e) => handleCaseStudyChange('problem', e.target.value)}
                  placeholder="Опишите проблему"
                />
              </div>
              <div className={styles.field}>
                <label>Решение</label>
                <Input
                  type="text"
                  value={formData.caseStudy?.solution || ''}
                  onChange={(e) => handleCaseStudyChange('solution', e.target.value)}
                  placeholder="Опишите решение"
                />
              </div>
              <div className={styles.field}>
                <label>Результат</label>
                <Input
                  type="text"
                  value={formData.caseStudy?.result || ''}
                  onChange={(e) => handleCaseStudyChange('result', e.target.value)}
                  placeholder="Опишите результат"
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.field}>
          <label>Статус</label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className={styles.select}
          >
            <option value="draft">Черновик</option>
            <option value="published">Опубликовано</option>
          </select>
        </div>
      </div>

      <div className={styles.footer}>
        <Button label="Отмена" secondClass="secondary" onClick={onClose} />
        <Button
          label="Сохранить"
          secondClass="primary"
          onClick={() => onSave(formData)}
        />
      </div>
    </div>
  );
};

