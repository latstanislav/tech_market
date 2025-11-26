import styles from './EquipmentCard.module.css';
import type { Equipment } from '@/shared/types/equipment';

export interface EquipmentCardProps {
  equipment: Equipment;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCountryName = (code: string) => {
    const countries: Record<string, string> = {
      kz: 'Казахстан',
      ru: 'Россия',
      de: 'Германия',
      cn: 'Китай',
      us: 'США',
      jp: 'Япония',
    };
    return countries[code] || code;
  };

  const getManufacturerName = (code: string) => {
    const manufacturers: Record<string, string> = {
      caterpillar: 'Caterpillar',
      komatsu: 'Komatsu',
      volvo: 'Volvo',
      liebherr: 'Liebherr',
      hitachi: 'Hitachi',
    };
    return manufacturers[code] || code;
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        {equipment.image ? (
          <img src={equipment.image} alt={equipment.name} />
        ) : (
          <div className={styles.card__imagePlaceholder}>
            <span>Изображение</span>
          </div>
        )}
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{equipment.name}</h3>
        <p className={styles.card__description}>{equipment.description}</p>
        <div className={styles.card__details}>
          <div className={styles.card__detail}>
            <span className={styles.card__detailLabel}>Производитель:</span>
            <span className={styles.card__detailValue}>
              {getManufacturerName(equipment.manufacturer)}
            </span>
          </div>
          <div className={styles.card__detail}>
            <span className={styles.card__detailLabel}>Страна:</span>
            <span className={styles.card__detailValue}>
              {getCountryName(equipment.country)}
            </span>
          </div>
          <div className={styles.card__detail}>
            <span className={styles.card__detailLabel}>Производительность:</span>
            <span className={styles.card__detailValue}>
              {equipment.capacity} {equipment.category === 'vehicles' ? 'т' : 'м³'}
            </span>
          </div>
        </div>
        <div className={styles.card__footer}>
          <div className={styles.card__price}>{formatPrice(equipment.price)}</div>
          <button className={styles.card__button}>Подробнее</button>
        </div>
      </div>
    </div>
  );
};

