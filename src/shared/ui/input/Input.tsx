import classnames from "classnames";
import { type InputProps } from "./Input.types";
import styles from "./Input.module.css";
import { forwardRef, useState } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, message, type, placeholder, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className={styles.input__container}>
        {label && <label className={styles.input__label}>{label}</label>}
        <div className={classnames(styles.input__wrapper, className)}>
          <input
            ref={ref}
            className={classnames(styles.input, { [styles.input__error]: error })}
            type={type}
            placeholder={isFocused ? "" : placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </div>
        {message && (
          <span
            className={classnames(styles.input__message, {
              [styles.input__message_error]: error,
            })}
          >
            {message}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export const InputText = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input ref={ref} {...props} type="text" />
);

InputText.displayName = "InputText";

export const InputEmail = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input ref={ref} {...props} type="email" />
);

InputEmail.displayName = "InputEmail";

export const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input ref={ref} {...props} type="password" />
);

InputPassword.displayName = "InputPassword";
