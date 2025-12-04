import styles from './ProductTable.module.css';
import type { Product } from '@/shared/types/catalog';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

export const ProductTable = ({ products, onEdit }: ProductTableProps) => {
  const getStatusLabel = (status: Product['status']) => {
    switch (status) {
      case 'published':
        return 'Опубликован';
      case 'draft':
        return 'Черновик';
      case 'archived':
        return 'Архив';
      default:
        return status;
    }
  };

  const getStatusClass = (status: Product['status']) => {
    switch (status) {
      case 'published':
        return styles.statusPublished;
      case 'draft':
        return styles.statusDraft;
      case 'archived':
        return styles.statusArchived;
      default:
        return '';
    }
  };

  const getCompletenessColor = (completeness: number) => {
    if (completeness >= 80) return '#4caf50';
    if (completeness >= 50) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Название</th>
            <th>Статус</th>
            <th>Полнота заполнения</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className={styles.empty}>
                Нет товаров. Добавьте первый товар в каталог.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className={styles.photo}>
                    {product.photos && product.photos.length > 0 ? (
                      <img src={product.photos[0]} alt={product.name} />
                    ) : (
                      <div className={styles.photoPlaceholder}>📷</div>
                    )}
                  </div>
                </td>
                <td>
                  <div className={styles.name}>{product.name}</div>
                  {product.category && (
                    <div className={styles.category}>{product.category}</div>
                  )}
                </td>
                <td>
                  <span className={`${styles.status} ${getStatusClass(product.status)}`}>
                    {getStatusLabel(product.status)}
                  </span>
                </td>
                <td>
                  <div className={styles.completeness}>
                    <div className={styles.completenessBar}>
                      <div
                        className={styles.completenessFill}
                        style={{
                          width: `${product.completeness}%`,
                          backgroundColor: getCompletenessColor(product.completeness),
                        }}
                      />
                    </div>
                    <span className={styles.completenessText}>{product.completeness}%</span>
                  </div>
                </td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => onEdit(product)}
                  >
                    Редактировать
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

