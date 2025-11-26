import classnames from "classnames";
import styles from "./Radio.module.css";
import type { RadioProps } from "./Radio.types";

export const Radio: React.FC<RadioProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  className,
  disabled = false,
}) => {
  const handleChange = (optionValue: string) => {
    if (disabled) return;
    onChange?.(optionValue);
  };

  return (
    <div className={classnames(styles.radio__container, className)}>
      {label && <label className={styles.radio__label}>{label}</label>}
      <div className={styles.radio__options}>
        {options.map((option) => {
          const isSelected = value === option.value;
          const isDisabled = disabled || option.disabled;

          return (
            <label
              key={option.value}
              className={classnames(styles.radio__option, {
                [styles["radio__option--disabled"]]: isDisabled,
              })}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => handleChange(option.value)}
                disabled={isDisabled}
                className={styles.radio__input}
              />
              <span className={styles.radio__label_text}>{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

