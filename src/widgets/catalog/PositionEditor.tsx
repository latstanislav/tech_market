import { useState, useRef } from 'react';
import { Button, Input } from '@/shared/ui';
import styles from './PositionEditor.module.css';
import type { PositionDetails, CatalogGroup, MarketCategory } from '@/shared/types/catalog';

const PhotoInput = ({ onAdd }: { onAdd: (url: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.mediaInput}>
      <Input
        ref={inputRef}
        type="url"
        placeholder="https://example.com/photo.jpg"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const value = (e.target as HTMLInputElement).value;
            if (value) {
              onAdd(value);
              (e.target as HTMLInputElement).value = '';
            }
          }
        }}
      />
      <Button
        label="Добавить"
        secondClass="secondary"
        onClick={() => {
          if (inputRef.current?.value) {
            onAdd(inputRef.current.value);
            inputRef.current.value = '';
          }
        }}
      />
    </div>
  );
};

const VideoInput = ({ onAdd }: { onAdd: (url: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.mediaInput}>
      <Input
        ref={inputRef}
        type="url"
        placeholder="https://youtube.com/watch?v=..."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const value = (e.target as HTMLInputElement).value;
            if (value) {
              onAdd(value);
              (e.target as HTMLInputElement).value = '';
            }
          }
        }}
      />
      <Button
        label="Добавить"
        secondClass="secondary"
        onClick={() => {
          if (inputRef.current?.value) {
            onAdd(inputRef.current.value);
            inputRef.current.value = '';
          }
        }}
      />
    </div>
  );
};

interface PositionEditorProps {
  position: PositionDetails | null;
  groups: CatalogGroup[];
  categories: MarketCategory[];
  onClose: () => void;
  onSave: (position: Partial<PositionDetails>) => void;
}

export const PositionEditor = ({
  position,
  groups,
  categories,
  onSave,
  onClose,
}: PositionEditorProps) => {
  const [activeTab, setActiveTab] = useState<
    'basic' | 'description' | 'specs' | 'pricing' | 'delivery' | 'media'
  >('basic');

  const [formData, setFormData] = useState<Partial<PositionDetails>>({
    name: position?.name || '',
    sku: position?.sku || '',
    description: position?.description || '',
    equipment: position?.equipment || '',
    specifications: position?.specifications || [],
    tags: position?.tags || [],
    price: position?.price,
    priceFrom: position?.priceFrom || false,
    availability: position?.availability || 'in_stock',
    stock: position?.stock,
    deliveryDays: position?.deliveryDays,
    type: position?.type || 'product',
    searchQueries: position?.searchQueries || [],
    groupId: position?.groupId || '',
    categoryId: position?.categoryId || '',
    promotionMethod: position?.promotionMethod || '',
    packaging: position?.packaging || '',
    delivery: position?.delivery || '',
    warranty: position?.warranty || '',
    additionalInfo: position?.additionalInfo || '',
    status: position?.status || 'draft',
    photos: position?.photos || [],
    videos: position?.videos || [],
  });

  const handleInputChange = (field: keyof PositionDetails, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSpec = () => {
    const newSpec = { id: Date.now().toString(), name: '', value: '' };
    setFormData((prev) => ({
      ...prev,
      specifications: [...(prev.specifications || []), newSpec],
    }));
  };

  const handleSpecChange = (id: string, field: 'name' | 'value', value: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications?.map((spec) =>
        spec.id === id ? { ...spec, [field]: value } : spec
      ),
    }));
  };

  const handleRemoveSpec = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications?.filter((spec) => spec.id !== id),
    }));
  };

  const handleAddTag = (tag: string) => {
    if (tag && !formData.tags?.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tag],
      }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag),
    }));
  };

  const handleAddSearchQuery = (query: string) => {
    if (query && !formData.searchQueries?.includes(query)) {
      setFormData((prev) => ({
        ...prev,
        searchQueries: [...(prev.searchQueries || []), query],
      }));
    }
  };

  const handleRemoveSearchQuery = (query: string) => {
    setFormData((prev) => ({
      ...prev,
      searchQueries: prev.searchQueries?.filter((q) => q !== query),
    }));
  };

  const handleAddPhoto = (url: string) => {
    if (url && !formData.photos?.includes(url)) {
      setFormData((prev) => ({
        ...prev,
        photos: [...(prev.photos || []), url],
      }));
    }
  };

  const handleRemovePhoto = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos?.filter((p) => p !== url),
    }));
  };

  const handleAddVideo = (url: string) => {
    if (url && !formData.videos?.includes(url)) {
      setFormData((prev) => ({
        ...prev,
        videos: [...(prev.videos || []), url],
      }));
    }
  };

  const handleRemoveVideo = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos?.filter((v) => v !== url),
    }));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{position ? 'Редактирование позиции' : 'Создание позиции'}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'basic' ? styles.active : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            Основное
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'description' ? styles.active : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Описание
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'specs' ? styles.active : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Характеристики
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'pricing' ? styles.active : ''}`}
            onClick={() => setActiveTab('pricing')}
          >
            Цена и наличие
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'delivery' ? styles.active : ''}`}
            onClick={() => setActiveTab('delivery')}
          >
            Доставка и гарантия
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'media' ? styles.active : ''}`}
            onClick={() => setActiveTab('media')}
          >
            Фото и видео
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'basic' && (
            <div className={styles.tabContent}>
              <div className={styles.field}>
                <label>Артикул *</label>
                <Input
                  type="text"
                  value={formData.sku || ''}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                  placeholder="Введите артикул"
                />
              </div>

              <div className={styles.field}>
                <label>Название позиции *</label>
                <Input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Введите название позиции"
                />
              </div>

              <div className={styles.field}>
                <label>Группа *</label>
                <select
                  value={formData.groupId || ''}
                  onChange={(e) => handleInputChange('groupId', e.target.value)}
                  className={styles.select}
                >
                  <option value="">Выберите группу</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label>Категория *</label>
                <select
                  value={formData.categoryId || ''}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  className={styles.select}
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label>Тип</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className={styles.select}
                >
                  <option value="product">Товар</option>
                  <option value="service">Услуга</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Видимость на маркете</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className={styles.select}
                >
                  <option value="published">Опубликована</option>
                  <option value="hidden">Скрыта</option>
                  <option value="draft">Черновик</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Способ продвижения</label>
                <Input
                  type="text"
                  value={formData.promotionMethod || ''}
                  onChange={(e) => handleInputChange('promotionMethod', e.target.value)}
                  placeholder="Опишите способ продвижения"
                />
              </div>

              <div className={styles.field}>
                <label>Поисковые запросы</label>
                <div className={styles.tagInput}>
                  <Input
                    type="text"
                    placeholder="Введите запрос и нажмите Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSearchQuery((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                </div>
                <div className={styles.tags}>
                  {formData.searchQueries?.map((query) => (
                    <span key={query} className={styles.tag}>
                      {query}
                      <button onClick={() => handleRemoveSearchQuery(query)}>✕</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label>Личные метки</label>
                <div className={styles.tagInput}>
                  <Input
                    type="text"
                    placeholder="Введите метку и нажмите Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                </div>
                <div className={styles.tags}>
                  {formData.tags?.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)}>✕</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'description' && (
            <div className={styles.tabContent}>
              <div className={styles.field}>
                <label>Описание позиции</label>
                <p className={styles.hint}>
                  Поддерживается форматирование текста, вставка изображений и таблиц
                </p>
                <textarea
                  className={styles.textarea}
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Введите описание с форматированием..."
                  rows={12}
                />
                <p className={styles.hint}>
                  Используйте HTML или Markdown для форматирования
                </p>
              </div>

              <div className={styles.field}>
                <label>Комплектация</label>
                <textarea
                  className={styles.textarea}
                  value={formData.equipment || ''}
                  onChange={(e) => handleInputChange('equipment', e.target.value)}
                  placeholder="Опишите комплектацию"
                  rows={6}
                />
              </div>

              <div className={styles.field}>
                <label>Дополнительная информация</label>
                <textarea
                  className={styles.textarea}
                  value={formData.additionalInfo || ''}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Дополнительная информация о позиции"
                  rows={6}
                />
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className={styles.tabContent}>
              <div className={styles.field}>
                <label>Характеристики оборудования</label>
                <div className={styles.specsTable}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Характеристика</th>
                        <th>Значение</th>
                        <th>Действие</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.specifications && formData.specifications.length > 0 ? (
                        formData.specifications.map((spec) => (
                          <tr key={spec.id}>
                            <td>
                              <Input
                                type="text"
                                value={spec.name}
                                onChange={(e) => handleSpecChange(spec.id, 'name', e.target.value)}
                                placeholder="Название"
                              />
                            </td>
                            <td>
                              <Input
                                type="text"
                                value={spec.value}
                                onChange={(e) => handleSpecChange(spec.id, 'value', e.target.value)}
                                placeholder="Значение"
                              />
                            </td>
                            <td>
                              <button
                                className={styles.removeButton}
                                onClick={() => handleRemoveSpec(spec.id)}
                              >
                                ✕
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className={styles.emptySpecs}>
                            Нет характеристик
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <Button
                    label="+ Добавить характеристику"
                    secondClass="secondary"
                    onClick={handleAddSpec}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className={styles.tabContent}>
              <div className={styles.field}>
                <label>Цена</label>
                <div className={styles.priceRow}>
                  <Input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => handleInputChange('price', Number(e.target.value))}
                    placeholder="Введите цену"
                  />
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.priceFrom || false}
                      onChange={(e) => handleInputChange('priceFrom', e.target.checked)}
                    />
                    <span>Цена "от"</span>
                  </label>
                </div>
                <p className={styles.hint}>
                  Оставьте пустым, если цена не указывается
                </p>
              </div>

              <div className={styles.field}>
                <label>Наличие</label>
                <select
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  className={styles.select}
                >
                  <option value="in_stock">В наличии</option>
                  <option value="on_order">Под заказ</option>
                </select>
              </div>

              {formData.availability === 'in_stock' && (
                <div className={styles.field}>
                  <label>Остатки (количество)</label>
                  <Input
                    type="number"
                    value={formData.stock || ''}
                    onChange={(e) => handleInputChange('stock', Number(e.target.value))}
                    placeholder="Введите количество"
                  />
                </div>
              )}

              {formData.availability === 'on_order' && (
                <div className={styles.field}>
                  <label>Срок доставки (дней)</label>
                  <Input
                    type="number"
                    value={formData.deliveryDays || ''}
                    onChange={(e) => handleInputChange('deliveryDays', Number(e.target.value))}
                    placeholder="Введите срок доставки"
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className={styles.tabContent}>
              <div className={styles.field}>
                <label>Упаковка</label>
                <Input
                  type="text"
                  value={formData.packaging || ''}
                  onChange={(e) => handleInputChange('packaging', e.target.value)}
                  placeholder="Опишите упаковку"
                />
              </div>

              <div className={styles.field}>
                <label>Доставка</label>
                <textarea
                  className={styles.textarea}
                  value={formData.delivery || ''}
                  onChange={(e) => handleInputChange('delivery', e.target.value)}
                  placeholder="Опишите условия доставки"
                  rows={4}
                />
              </div>

              <div className={styles.field}>
                <label>Гарантия</label>
                <Input
                  type="text"
                  value={formData.warranty || ''}
                  onChange={(e) => handleInputChange('warranty', e.target.value)}
                  placeholder="Опишите гарантийные условия"
                />
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className={styles.tabContent}>
              <div className={styles.field}>
                <label>Фото (по ссылке)</label>
                <PhotoInput onAdd={handleAddPhoto} />
                <div className={styles.mediaGrid}>
                  {formData.photos?.map((photo) => (
                    <div key={photo} className={styles.mediaItem}>
                      <img src={photo} alt="Photo" onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }} />
                      <button onClick={() => handleRemovePhoto(photo)}>✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label>Видео (по ссылке)</label>
                <VideoInput onAdd={handleAddVideo} />
                <div className={styles.videoList}>
                  {formData.videos?.map((video) => (
                    <div key={video} className={styles.videoItem}>
                      <a href={video} target="_blank" rel="noopener noreferrer">
                        {video}
                      </a>
                      <button onClick={() => handleRemoveVideo(video)}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.meta}>
            {position && (
              <>
                <span>Создано: {new Date(position.createdAt).toLocaleDateString('ru-RU')}</span>
                <span>Обновлено: {new Date(position.updatedAt).toLocaleDateString('ru-RU')}</span>
              </>
            )}
          </div>
          <div className={styles.actions}>
            <Button label="Отмена" secondClass="secondary" onClick={onClose} />
            <Button
              label="Сохранить"
              secondClass="primary"
              onClick={() => onSave(formData)}
              disabled={!formData.name || !formData.sku}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

