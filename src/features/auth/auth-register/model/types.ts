import { z } from 'zod';

import { emailSchema, passwordSchema } from 'shared/lib/authValidation';

export const registerSchema = z
  .object({
    first_name: z.string().min(2, 'Пожалуйста, заполните все обязательные поля'),
    last_name: z.string().min(2, 'Пожалуйста, заполните все обязательные поля'),
    email: emailSchema,
    password: passwordSchema,
    repeat_password: z.string().min(1, 'Повторите пароль'),
    consent_personal_data: z.boolean().refine((val) => val === true, 'Необходимо согласие'),
    privacy_policy_agreement: z.boolean().refine((val) => val === true, 'Необходимо согласие'),
  })
  .refine(
    (data) => {
      if (!data.repeat_password) return true;

      return data.password === data.repeat_password;
    },
    {
      message: 'Пароли не совпадают. Пожалуйста, введите одинаковые пароли.',
      path: ['repeat_password'],
    },
  )
  .refine(
    (data) => {
      if (!data.email || data.email.length < 3 || !data.email.includes('@')) {
        return true;
      }

      const emailLower = data.email.toLowerCase();
      const passwordLower = data.password.toLowerCase();

      return !passwordLower.includes(emailLower);
    },
    {
      message: 'Пароль не должен содержать email',
      path: ['password'],
    },
  );

export type RegisterFormData = z.infer<typeof registerSchema>;

export interface RegisterResponse {
  message: string;
}
