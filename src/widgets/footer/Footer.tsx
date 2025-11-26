import classnames from "classnames";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className={classnames(styles.footer)}>
      <div className={classnames(styles.left_side)}>
        <Link to="/" className={classnames(styles.logo)}>
          TechMarket
        </Link>
        <p className={classnames(styles.left_side_text)}>
          TechMarket - 2025
        </p>
      </div>
      <div className={classnames(styles.right_side)}>
        <div className={classnames(styles.right_side_item)}>
          <Link to="/about" className={classnames(styles.link)}>
            О проекте
          </Link>
          <Link to="/catalog" className={classnames(styles.link)}>
            Каталог
          </Link>
        </div>
        <div className={classnames(styles.right_side_item)}>
          <Link to="/contacts" className={classnames(styles.link)}>
            Контакты
          </Link>
          <Link to="/blog" className={classnames(styles.link)}>
            Блог
          </Link>
        </div>
        <div className={classnames(styles.right_side_item)}>
          <Link to="/privacy" className={classnames(styles.link)}>
            Политика конфиденциальности
          </Link>
          <Link to="/terms" className={classnames(styles.link)}>
            Пользовательское соглашение
          </Link>
        </div>
      </div>
    </footer>
  );
};

