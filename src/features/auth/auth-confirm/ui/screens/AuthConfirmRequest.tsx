import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import ClockIcon from 'assets/clock-icon.svg?react';
import { Button, Timer } from 'shared/ui';

import { resendRequest } from '../../api/confirm';

import styles from './AuthConfirmRequest.module.scss';

export const AuthConfirmRequest = () => {
  const locationState = useLocation().state as { email?: string } | undefined;
  const email = locationState?.email;

  const STORAGE_KEY = `confirm_email_timer`;
  const [isActiveTimer, setIsActiveTimer] = useState(Boolean(localStorage.getItem(STORAGE_KEY)));

  const { mutate: resendEmail, isPending } = useMutation({
    mutationFn: () => resendRequest(email!),
    onSuccess: () => {
      setIsActiveTimer(true);
    },
    onError: (err) => {
      console.error('Ошибка переотправки:', err);
    },
  });

  if (!email) return <Navigate to="/auth" replace />;

  return (
    <div className={styles.card}>
      <h2 className={styles.card__title}>
        Подтвердите
        <br className={styles.card__title_break} />
        свой адрес электронной почты
      </h2>
      <p className={clsx(styles.card__descr, isActiveTimer && styles.card__descr_position)}>
        Письмо с подтверждением отправлено на <br className={styles.card__descr_break} />
        <strong className={styles.card__descr_email}>{email}</strong>
      </p>

      {isActiveTimer && (
        <p className={styles.card__wrapper}>
          <ClockIcon className={styles.card__icon} aria-hidden="true" />
          <span>Отправить письмо повторно можно через</span>
          <Timer storageKey={STORAGE_KEY} seconds={15} onFinish={() => setIsActiveTimer(false)} />
        </p>
      )}

      <Button
        className={styles.card__btn}
        kind="primary"
        onClick={() => resendEmail()}
        disabled={isActiveTimer || isPending}
        isLoading={isPending}
      >
        Отправить письмо еще раз
      </Button>

      <Link to={'/auth'} className={styles.card__link}>
        Вернуться на главную
      </Link>
    </div>
  );
};
