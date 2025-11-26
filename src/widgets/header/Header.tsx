import styles from "./Header.module.css";
import { Button, Input } from "@/shared/ui";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export interface HeaderProps {
  searchText?: string;
  onSearchChange?: (value: string) => void;
  userName?: string;
  isAuthenticated?: boolean;
}

export const Header = ({
  searchText = "",
  onSearchChange,
  userName,
  isAuthenticated = false,
}: HeaderProps) => {
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState(searchText);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearchChange?.(value);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo} onClick={handleLogoClick}>
        TechMarket
      </Link>

      <nav className={styles.nav}>
        <Link to="/catalog">
          <Button label="Каталог" secondClass="secondary" />
        </Link>
        <Link to="/about">
          <Button label="О нас" secondClass="secondary" />
        </Link>
      </nav>

      <div className={styles.search}>
        <Input
          type="text"
          placeholder="Поиск оборудования..."
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>

      <div className={styles.actions}>
        {isAuthenticated ? (
          <div className={styles.userInfo}>
            <span className={styles.userName}>{userName || "Пользователь"}</span>
            <div className={styles.avatar}>
              {(userName?.[0] || "U").toUpperCase()}
            </div>
          </div>
        ) : (
          <>
            <Button
              label="Войти"
              secondClass="secondary"
              onClick={handleLogin}
            />
            <Button
              label="Регистрация"
              secondClass="primary"
              onClick={handleRegister}
            />
          </>
        )}
      </div>
    </header>
  );
};

