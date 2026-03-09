import { apiClient } from 'shared/api';

import { UserSchema } from '../model/types/user';

import { getUser } from './userApi';

jest.mock('shared/api');

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('getUser', () => {
  test('Возвращает валидного пользователя', async () => {
    const mockResponse = {
      id: 123123,
      email: 'test@mail.ru',
      first_name: 'firstName',
      last_name: 'lastName',
      avatar_path: 'string',
      created_at: 'string',
      updated_at: 'string',
    };

    mockedApiClient.get.mockResolvedValue({ data: mockResponse });

    const result = await getUser();

    expect(UserSchema.safeParse(result).success).toBe(true);
    expect(mockedApiClient.get).toHaveBeenCalledWith('/profile');
  });

  test('Выбрасывает ошибку при некорректных данных', async () => {
    const mockResponse = { foo: 'bar' };

    mockedApiClient.get.mockResolvedValue({ data: mockResponse });

    await expect(getUser()).rejects.toThrow();
  });
});
