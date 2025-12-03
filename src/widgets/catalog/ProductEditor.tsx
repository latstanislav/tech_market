import { useState, useEffect } from 'react';
import styles from './ProductEditor.module.css';
import { Button, Input } from '@/shared/ui';
import type { Product, MainSpec, Specification } from '@/shared/types/catalog';

interface ProductEditorProps {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
}

export const ProductEditor = ({ product, onSave, onClose }: ProductEditorProps) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'showcase' | 'specs' | 'pricing'>('basic');
  const [formData, setFormData] = useState<Partial<Product>>({
    name: product?.name || '',
    category: product?.category || '',
    series: product?.series || '',
    photos: product?.photos || [],
    drawing: product?.drawing || '',
    mainSpecs: product?.mainSpecs || [],
    specifications: product?.specifications || [],
    passportFile: product?.passportFile || '',
    model3dFile: product?.model3dFile || '',
    estimatedPrice: product?.estimatedPrice || undefined,
  });

  const handleInputChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddMainSpec = () => {
    const newSpec: MainSpec = { id: Date.now().toString(), name: '', value: '' };
    setFormData((prev) => ({
      ...prev,
      mainSpecs: [...(prev.mainSpecs || []), newSpec],
    }));
  };

  const handleMainSpecChange = (id: string, field: 'name' | 'value', value: string) => {
    setFormData((prev) => ({
      ...prev,
      mainSpecs: prev.mainSpecs?.map((spec) =>
        spec.id === id ? { ...spec, [field]: value } : spec
      ),
    }));
  };

  const handleRemoveMainSpec = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      mainSpecs: prev.mainSpecs?.filter((spec) => spec.id !== id),
    }));
  };

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h2>{product ? 'Редактирование товара' : 'Новый товар'}</h2>
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
          className={`${styles.tab} ${activeTab === 'showcase' ? styles.active : ''}`}
          onClick={() => setActiveTab('showcase')}
        >
          Витрина
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'specs' ? styles.active : ''}`}
          onClick={() => setActiveTab('specs')}
        >
          Спецификация
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'pricing' ? styles.active : ''}`}
          onClick={() => setActiveTab('pricing')}
        >
          Ценообразование
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'basic' && (
          <div className={styles.tabContent}>
            <div className={styles.field}>
              <label>Название *</label>
              <Input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Введите название товара"
              />
            </div>
            <div className={styles.field}>
              <label>Категория *</label>
              <Input
                type="text"
                value={formData.category || ''}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder="Введите категорию"
              />
            </div>
            <div className={styles.field}>
              <label>Серия</label>
              <Input
                type="text"
                value={formData.series || ''}
                onChange={(e) => handleInputChange('series', e.target.value)}
                placeholder="Введите серию"
              />
            </div>
          </div>
        )}

        {activeTab === 'showcase' && (
          <div className={styles.tabContent}>
            <div className={styles.field}>
              <label>Загрузка фото (слайдер)</label>
              <div className={styles.uploadArea}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    // Handle file upload
                    console.log('Upload photos', e.target.files);
                  }}
                />
                <p>Перетащите файлы или нажмите для выбора</p>
              </div>
            </div>
            <div className={styles.field}>
              <label>Загрузка чертежа/схемы</label>
              <div className={styles.uploadArea}>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    // Handle file upload
                    console.log('Upload drawing', e.target.files);
                  }}
                />
                <p>Чертеж будет показан при наведении</p>
              </div>
            </div>
            <div className={styles.field}>
              <label>Главные ТТХ для отображения на плитке (выберите 3)</label>
              {formData.mainSpecs?.map((spec) => (
                <div key={spec.id} className={styles.specRow}>
                  <Input
                    type="text"
                    value={spec.name}
                    onChange={(e) => handleMainSpecChange(spec.id, 'name', e.target.value)}
                    placeholder="Название характеристики"
                  />
                  <Input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleMainSpecChange(spec.id, 'value', e.target.value)}
                    placeholder="Значение"
                  />
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveMainSpec(spec.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {(!formData.mainSpecs || formData.mainSpecs.length < 3) && (
                <Button
                  label="+ Добавить ТТХ"
                  secondClass="secondary"
                  onClick={handleAddMainSpec}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className={styles.tabContent}>
            <div className={styles.field}>
              <label>Подробная таблица характеристик</label>
              <p className={styles.hint}>
                Характеристики заполняются по шаблону категории
              </p>
              <div className={styles.specsTable}>
                <table className={styles.specsTableInner}>
                  <thead>
                    <tr>
                      <th>Характеристика</th>
                      <th>Значение</th>
                      <th>Действия</th>
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
                              onChange={(e) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  specifications: prev.specifications?.map((s) =>
                                    s.id === spec.id ? { ...s, name: e.target.value } : s
                                  ),
                                }));
                              }}
                              placeholder="Название характеристики"
                            />
                          </td>
                          <td>
                            <Input
                              type="text"
                              value={spec.value}
                              onChange={(e) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  specifications: prev.specifications?.map((s) =>
                                    s.id === spec.id ? { ...s, value: e.target.value } : s
                                  ),
                                }));
                              }}
                              placeholder="Значение"
                            />
                          </td>
                          <td>
                            <button
                              className={styles.removeButton}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  specifications: prev.specifications?.filter(
                                    (s) => s.id !== spec.id
                                  ),
                                }));
                              }}
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className={styles.emptySpecs}>
                          Нет характеристик. Добавьте первую характеристику.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Button
                  label="+ Добавить характеристику"
                  secondClass="secondary"
                  onClick={() => {
                    const newSpec: Specification = {
                      id: Date.now().toString(),
                      name: '',
                      value: '',
                      category: formData.category || '',
                    };
                    setFormData((prev) => ({
                      ...prev,
                      specifications: [...(prev.specifications || []), newSpec],
                    }));
                  }}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label>Паспорт (PDF)</label>
              <div className={styles.uploadArea}>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    console.log('Upload passport', e.target.files);
                  }}
                />
                <p>Загрузите паспорт изделия в формате PDF</p>
              </div>
            </div>
            <div className={styles.field}>
              <label>3D-модель (STEP)</label>
              <div className={styles.uploadArea}>
                <input
                  type="file"
                  accept=".step,.stp"
                  onChange={(e) => {
                    console.log('Upload 3D model', e.target.files);
                  }}
                />
                <p>Загрузите 3D-модель в формате STEP</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className={styles.tabContent}>
            <div className={styles.field}>
              <label>Ориентировочная цена (скрыта от публики)</label>
              <Input
                type="number"
                value={formData.estimatedPrice || ''}
                onChange={(e) => handleInputChange('estimatedPrice', Number(e.target.value))}
                placeholder="Введите цену"
              />
              <p className={styles.hint}>
                Используется для работы фильтра «Бюджетный/Премиум» и для AI-агента
              </p>
            </div>
          </div>
        )}
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

