import { forwardRef, useState, InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

export type InputStatus = 'error' | 'warning' | 'success' | 'default';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  status?: InputStatus;
  helpText?: string;
  iconButton?: React.ReactNode;
  strengthSpace?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errorMessage,
      status = 'default',
      onFocus,
      onBlur,
      helpText,
      className,
      iconButton,
      strengthSpace,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const statusClasses = {
      error: styles.input__error,
      warning: styles.input__warning,
      success: styles.input__success,
      default: '',
    };

    return (
      <label className={styles.input}>
        {label && <span className={styles.input__label}>{label}</span>}
        <div className={styles.input__container}>
          <input
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${styles.input__field} ${statusClasses[status]} ${className || ' '}`}
            {...props}
          />
          {iconButton && <div className={styles.input__right}>{iconButton}</div>}
        </div>

        {strengthSpace && <div className={styles.input__bottom}>{strengthSpace}</div>}

        <div className={styles.input__info}>
          {errorMessage && (
            <span className={`${styles.input__message} ${statusClasses[status]}`}>
              {errorMessage}
            </span>
          )}
          {isFocused && helpText && status !== 'error' && (
            <span className={styles.input__help}>{helpText}</span>
          )}
        </div>
      </label>
    );
  },
);

Input.displayName = 'Input';
