import classnames from "classnames";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  type = "button",
  textColor,
  padding,
  buttonWidth,
  label,
  onClick,
  loading,
  icon,
  secondClass = "primary",
  disabled,
  className,
  iconPosition = 'right',
}: ButtonProps) => {
  const renderIcon = () => {
    if (!icon) return null;
    
    if (typeof icon === "string") {
      return <img src={icon} alt="" className={styles.icon} />;
    } else {
      const Icon = icon;
      return <Icon className={styles.icon} />;
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classnames(styles.button, styles[secondClass], className)}
      style={{
        color: textColor,
        padding,
        width: buttonWidth,
      }}
      onClick={onClick}
    >
      {iconPosition === 'left' && !loading && renderIcon()}
      {loading ? "Загрузка..." : label}
      {iconPosition === 'right' && !loading && renderIcon()}
    </button>
  );
};

