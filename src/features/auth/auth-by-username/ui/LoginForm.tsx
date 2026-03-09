import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Input, PasswordInput } from 'shared/ui';

import { LoginFormData, loginSchema } from '../model/types';
import { useLoginForm } from '../model/useLoginForm';

import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const { mutate: loginUser, isPending } = useLoginForm();

  const onSubmit = (data: LoginFormData) => {
    loginUser(data, {
      onError: (err: any) => {
        if (err.response?.status === 401) {
          const message = 'Неверный email или пароль';
          setError('email', { type: 'server', message });
          setError('password', { type: 'server', message });
        }
      },
    });
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['login__input-wrapper']}>
        <Input
          label="Email"
          type="email"
          placeholder="Адрес электронной почты"
          errorMessage={errors.email?.message}
          status={errors.email ? 'error' : 'default'}
          {...register('email')}
        />

        <PasswordInput
          label="Пароль"
          placeholder="Пароль"
          status={errors.password ? 'error' : 'default'}
          errorMessage={errors.password?.message}
          {...register('password')}
        />
      </div>

      <Button className={styles.login__btn} type="submit" isLoading={isPending}>
        Войти
      </Button>
    </form>
  );
};
