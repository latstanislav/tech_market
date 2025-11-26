import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<MainPage />} />
        <Route path="/about" element={<div>О нас</div>} />
        <Route path="/contacts" element={<div>Контакты</div>} />
        <Route path="/blog" element={<div>Блог</div>} />
        <Route path="/login" element={<div>Вход</div>} />
        <Route path="/register" element={<div>Регистрация</div>} />
        <Route path="/privacy" element={<div>Политика конфиденциальности</div>} />
        <Route path="/terms" element={<div>Пользовательское соглашение</div>} />
      </Routes>
    </BrowserRouter>
  );
};

