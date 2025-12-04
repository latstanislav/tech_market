import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input } from '@/shared/ui';
import styles from './Login.module.css';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Простая валидация (в реальном приложении будет запрос к API)
    if (!email || !password) {
      setError('Заполните все поля');
      return;
    }

    // В демо-версии просто перенаправляем в кабинет
    // В реальном приложении здесь будет проверка через API
    console.log('Login attempt:', { email, password });
    
    // Сохраняем "авторизацию" в localStorage для демо
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    
    navigate('/cabinet');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Вход в личный кабинет</h1>
          <p className={styles.subtitle}>
            Войдите, чтобы управлять своим каталогом и продажами
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Пароль</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>

          <div className={styles.options}>
            <label className={styles.remember}>
              <input type="checkbox" />
              <span>Запомнить меня</span>
            </label>
            <Link to="/forgot-password" className={styles.forgotLink}>
              Забыли пароль?
            </Link>
          </div>

          <Button
            label="Войти"
            secondClass="primary"
            type="submit"
          />

          <div className={styles.divider}>
            <span>или</span>
          </div>

          <div className={styles.demoHint}>
            <p>💡 <strong>Демо-режим:</strong> Введите любой email и пароль для входа</p>
          </div>
        </form>

        <div className={styles.footer}>
          <p>
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

