import { useState, useEffect } from 'react';
import { Button, Input } from '@/shared/ui';
import styles from './GroupEditor.module.css';
import type { CatalogGroup } from '@/shared/types/catalog';

interface GroupEditorProps {
  group: CatalogGroup | null;
  allGroups: CatalogGroup[];
  onClose: () => void;
  onSave: (group: Partial<CatalogGroup>) => void;
}

export const GroupEditor = ({ group, allGroups, onSave, onClose }: GroupEditorProps) => {
  const [formData, setFormData] = useState<Partial<CatalogGroup>>({
    name: group?.name || '',
    parentId: group?.parentId || null,
    description: group?.description || '',
    photo: group?.photo || '',
    status: group?.status || 'published',
  });

  const availableParents = allGroups.filter((g) => g.id !== group?.id);

  const handleInputChange = (field: keyof CatalogGroup, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{group ? 'Редактирование группы' : 'Создание группы'}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.field}>
            <label>Название группы *</label>
            <Input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Введите название группы"
            />
          </div>

          <div className={styles.field}>
            <label>Родительская группа</label>
            <select
              value={formData.parentId || ''}
              onChange={(e) => handleInputChange('parentId', e.target.value || null)}
              className={styles.select}
            >
              <option value="">Корневая группа</option>
              {availableParents.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            <p className={styles.hint}>
              Выберите группу, в которую будет входить эта группа, или оставьте пустым для корневой
            </p>
          </div>

          <div className={styles.field}>
            <label>Описание группы</label>
            <textarea
              className={styles.textarea}
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Введите описание группы"
              rows={4}
            />
          </div>

          <div className={styles.field}>
            <label>Фото группы (ссылка)</label>
            <Input
              type="url"
              value={formData.photo || ''}
              onChange={(e) => handleInputChange('photo', e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
            {formData.photo && (
              <div className={styles.photoPreview}>
                <img src={formData.photo} alt="Preview" onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }} />
              </div>
            )}
          </div>

          <div className={styles.field}>
            <label>Статус публикации</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value as 'published' | 'hidden')}
              className={styles.select}
            >
              <option value="published">Опубликована</option>
              <option value="hidden">Скрыта</option>
            </select>
          </div>
        </div>

        <div className={styles.footer}>
          <Button label="Отмена" secondClass="secondary" onClick={onClose} />
          <Button
            label="Сохранить"
            secondClass="primary"
            onClick={() => onSave(formData)}
            disabled={!formData.name}
          />
        </div>
      </div>
    </div>
  );
};

