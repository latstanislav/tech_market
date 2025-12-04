import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import styles from './CabinetLayout.module.css';

const menuItems = [
  { path: '/cabinet', label: 'Дашборд', icon: '📊' },
  { path: '/cabinet/catalog', label: 'Мой Каталог', icon: '📦' },
  { path: '/cabinet/sales', label: 'Центр Продаж', icon: '💰' },
  { path: '/cabinet/services', label: 'Услуги и Производство', icon: '⚙️' },
  { path: '/cabinet/content', label: 'Контент-маркетинг', icon: '✍️' },
  { path: '/cabinet/community', label: 'Сообщество и Поддержка', icon: '💬' },
  { path: '/cabinet/analytics', label: 'Аналитика', icon: '📈' },
  { path: '/cabinet/settings', label: 'Настройки', icon: '⚙️' },
];

export const CabinetLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={styles.cabinetLayout}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <h2>Личный кабинет</h2>
          <button
            className={styles.toggleButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${
                location.pathname === item.path || 
                (item.path !== '/cabinet' && location.pathname.startsWith(item.path))
                  ? styles.active
                  : ''
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {sidebarOpen && <span className={styles.label}>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

