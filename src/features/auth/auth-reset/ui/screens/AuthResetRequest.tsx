import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

import { Button, Input } from 'shared/ui';

import { forgotPasswordRequest } from '../../api/reset';
import { resetRequestSchema, ResetRequestFormData } from '../../model/types/reset';

import styles from './AuthResetRequest.module.scss';

export const AuthResetRequest = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetRequestFormData>({
    resolver: zodResolver(resetRequestSchema),
    mode: 'onChange',
  });

  const { mutate: sendResetLink, isPending } = useMutation({
    mutationFn: forgotPasswordRequest,
    onSuccess: (_, variables) => {
      navigate('sent', { state: { email: variables }, replace: true });
    },
    onError: () => {
      navigate('sent');
    },
  });

  const onSubmit = (data: ResetRequestFormData) => sendResetLink(data.email);

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h2 className={styles.card__title}>Восстановление пароля</h2>

        <p className={styles.card__descr}>
          Укажите вашу почту, на неё придёт ссылка для восстановления пароля
        </p>
      </div>

      <form className={styles.card__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.card__input}
          label="Почта"
          placeholder="email@mail.com"
          {...register('email')}
          status={errors.email ? 'error' : 'default'}
          errorMessage={errors.email?.message}
        />

        <Button type="submit" disabled={!isValid} isLoading={isPending}>
          Получить ссылку
        </Button>
      </form>

      <Link className={styles.card__link} to={'/auth'}>
        Назад к регистрации
      </Link>
    </div>
  );
};
