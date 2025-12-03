import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { Login } from '@/pages/Login';
import { CabinetLayout, Dashboard } from '@/pages/Cabinet';
import { Catalog } from '@/pages/Cabinet/Catalog/Catalog';
import { Sales } from '@/pages/Cabinet/Sales/Sales';
import { Services } from '@/pages/Cabinet/Services/Services';
import { Content } from '@/pages/Cabinet/Content/Content';
import { Community } from '@/pages/Cabinet/Community/Community';
import { Analytics } from '@/pages/Cabinet/Analytics/Analytics';
import { Settings } from '@/pages/Cabinet/Settings/Settings';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<MainPage />} />
        <Route path="/about" element={<div>О нас</div>} />
        <Route path="/contacts" element={<div>Контакты</div>} />
        <Route path="/blog" element={<div>Блог</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<div>Регистрация</div>} />
        <Route path="/privacy" element={<div>Политика конфиденциальности</div>} />
        <Route path="/terms" element={<div>Пользовательское соглашение</div>} />
        <Route path="/cabinet" element={<CabinetLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="sales" element={<Sales />} />
          <Route path="services" element={<Services />} />
          <Route path="content" element={<Content />} />
          <Route path="community" element={<Community />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

