import { useState } from 'react';
import { Button } from '@/shared/ui';
import styles from './GroupsManager.module.css';
import type { CatalogGroup } from '@/shared/types/catalog';

interface GroupsManagerProps {
  groups: CatalogGroup[];
  onEdit: (group: CatalogGroup) => void;
  onDelete: (groupId: string) => void;
  onCreate: () => void;
}

export const GroupsManager = ({ groups, onEdit, onDelete, onCreate }: GroupsManagerProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getRootGroups = () => {
    return groups.filter((g) => g.parentId === null);
  };

  const getChildGroups = (parentId: string) => {
    return groups.filter((g) => g.parentId === parentId);
  };

  const getGroupPath = (group: CatalogGroup): string[] => {
    const path: string[] = [];
    let current: CatalogGroup | undefined = group;
    
    while (current) {
      path.unshift(current.name);
      if (current.parentId) {
        current = groups.find((g) => g.id === current!.parentId);
      } else {
        current = undefined;
      }
    }
    
    return path;
  };

  const renderGroup = (group: CatalogGroup, level: number = 0) => {
    const children = getChildGroups(group.id);
    const isExpanded = expandedGroups.has(group.id);
    const hasChildren = children.length > 0;

    return (
      <div key={group.id} className={styles.groupItem}>
        <div
          className={styles.groupHeader}
          style={{ paddingLeft: `${level * 24 + 12}px` }}
        >
          <div className={styles.groupInfo}>
            {hasChildren && (
              <button
                className={styles.expandButton}
                onClick={() => toggleGroup(group.id)}
              >
                {isExpanded ? '▼' : '▶'}
              </button>
            )}
            {!hasChildren && <span className={styles.spacer} />}
            
            {group.photo && (
              <img src={group.photo} alt={group.name} className={styles.groupPhoto} />
            )}
            {!group.photo && <div className={styles.groupPhotoPlaceholder}>📁</div>}
            
            <div className={styles.groupDetails}>
              <div className={styles.groupName}>{group.name}</div>
              <div className={styles.groupMeta}>
                <span className={styles.positionCount}>
                  Позиций: {group.positionCount}
                </span>
                <span className={`${styles.status} ${group.status === 'published' ? styles.published : styles.hidden}`}>
                  {group.status === 'published' ? 'Опубликована' : 'Скрыта'}
                </span>
              </div>
            </div>
          </div>
          
          <div className={styles.groupActions}>
            <Button
              label="Редактировать"
              secondClass="secondary"
              onClick={() => onEdit(group)}
            />
            <button
              className={styles.deleteButton}
              onClick={() => {
                if (confirm(`Удалить группу "${group.name}"?`)) {
                  onDelete(group.id);
                }
              }}
            >
              🗑️
            </button>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className={styles.children}>
            {children.map((child) => renderGroup(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const rootGroups = getRootGroups();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Группы</h2>
        <Button
          label="+ Создать группу"
          secondClass="primary"
          onClick={onCreate}
        />
      </div>

      <div className={styles.groupsList}>
        {rootGroups.length === 0 ? (
          <div className={styles.empty}>
            <p>Нет групп. Создайте первую группу.</p>
            <p className={styles.hint}>
              По умолчанию все позиции добавляются в корневую группу, если не указано иное.
            </p>
          </div>
        ) : (
          rootGroups.map((group) => renderGroup(group))
        )}
      </div>
    </div>
  );
};

