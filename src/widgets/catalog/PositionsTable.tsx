import { useState } from 'react';
import { Button } from '@/shared/ui';
import styles from './PositionsTable.module.css';
import type { CatalogPosition } from '@/shared/types/catalog';

interface PositionsTableProps {
  positions: CatalogPosition[];
  onEdit: (position: CatalogPosition) => void;
  onDelete: (positionId: string) => void;
  onCopy: (positionId: string) => void;
  onAddDiscount: (positionId: string) => void;
}

export const PositionsTable = ({
  positions,
  onEdit,
  onDelete,
  onCopy,
  onAddDiscount,
}: PositionsTableProps) => {
  const getStatusLabel = (status: CatalogPosition['status']) => {
    switch (status) {
      case 'published':
        return 'Опубликована';
      case 'hidden':
        return 'Скрыта';
      case 'draft':
        return 'Черновик';
      default:
        return status;
    }
  };

  const getStatusClass = (status: CatalogPosition['status']) => {
    switch (status) {
      case 'published':
        return styles.statusPublished;
      case 'hidden':
        return styles.statusHidden;
      case 'draft':
        return styles.statusDraft;
      default:
        return '';
    }
  };

  const getAvailabilityLabel = (position: CatalogPosition) => {
    if (position.availability === 'in_stock') {
      return `В наличии${position.stock ? ` (${position.stock} шт.)` : ''}`;
    }
    return `Под заказ${position.deliveryDays ? ` (${position.deliveryDays} дн.)` : ''}`;
  };

  const getPriceLabel = (position: CatalogPosition) => {
    if (!position.price) return '—';
    return position.priceFrom ? `от ${position.price.toLocaleString('ru-RU')} ₽` : `${position.price.toLocaleString('ru-RU')} ₽`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Название</th>
              <th>Артикул</th>
              <th>Дата добавления</th>
              <th>Отображение</th>
              <th>Статус</th>
              <th>Цена</th>
              <th>Заказов</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {positions.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.empty}>
                  Нет позиций. Добавьте первую позицию в каталог.
                </td>
              </tr>
            ) : (
              positions.map((position) => (
                <tr key={position.id}>
                  <td>
                    <div className={styles.name}>{position.name}</div>
                  </td>
                  <td>
                    <div className={styles.sku}>{position.sku}</div>
                  </td>
                  <td>
                    <div className={styles.date}>
                      {new Date(position.createdAt).toLocaleDateString('ru-RU')}
                    </div>
                  </td>
                  <td>
                    <div className={styles.availability}>
                      {position.availability === 'in_stock' ? (
                        <span className={styles.inStock}>✓ {getAvailabilityLabel(position)}</span>
                      ) : (
                        <span className={styles.onOrder}>⏱ {getAvailabilityLabel(position)}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.status} ${getStatusClass(position.status)}`}>
                      {getStatusLabel(position.status)}
                    </span>
                  </td>
                  <td>
                    <div className={styles.price}>{getPriceLabel(position)}</div>
                  </td>
                  <td>
                    <div className={styles.orderCount}>{position.orderCount}</div>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionButton}
                        onClick={() => onEdit(position)}
                        title="Редактировать"
                      >
                        ✏️
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => onCopy(position.id)}
                        title="Копировать"
                      >
                        📋
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => onAddDiscount(position.id)}
                        title="Добавить скидку"
                      >
                        💰
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => {
                          if (confirm(`Удалить позицию "${position.name}"?`)) {
                            onDelete(position.id);
                          }
                        }}
                        title="Удалить"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

