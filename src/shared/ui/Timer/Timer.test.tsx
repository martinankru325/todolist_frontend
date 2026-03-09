import { render, screen, act } from '@testing-library/react';

import { Timer } from './Timer';

describe('Timer component', () => {
  const storageKey = 'test-timer';

  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
    jest.spyOn(Date, 'now').mockReturnValue(1000000);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('Отображает правильное время при старте', () => {
    render(<Timer storageKey={storageKey} seconds={65} />);
    expect(screen.getByText('01:05')).toBeInTheDocument();
  });

  it('Уменьшает время каждую секунду', () => {
    render(<Timer storageKey={storageKey} seconds={10} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('00:09')).toBeInTheDocument();
  });

  it('Восстанавливает время из localStorage после перезагрузки', () => {
    const futureTime = Date.now() + 30 * 1000;
    localStorage.setItem(storageKey, String(futureTime));

    render(<Timer storageKey={storageKey} seconds={60} />);

    expect(screen.getByText('00:30')).toBeInTheDocument();
  });

  it('Вызывает onFinish и очищает localStorage по окончании', () => {
    const mockFinish = jest.fn();
    render(<Timer storageKey={storageKey} seconds={1} onFinish={mockFinish} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockFinish).toHaveBeenCalled();
    expect(localStorage.getItem(storageKey)).toBeNull();
    expect(screen.queryByText('00:00')).not.toBeInTheDocument();
  });
});
