import clsx from 'clsx';
import { useEffect, useState } from 'react';

import styles from './Timer.module.scss';

type TProps = {
  storageKey: string;
  seconds: number;
  onFinish?: () => void;
  className?: string;
};

export const Timer = ({ storageKey, seconds, onFinish, className }: TProps) => {
  const [time, setTime] = useState(seconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const savedEndTime = localStorage.getItem(storageKey);
    if (!savedEndTime) return;

    const remain = Math.ceil((Number(savedEndTime) - Date.now()) / 1000);

    if (remain > 0) {
      setTime(remain);
      setIsActive(true);
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!isActive && time > 0) setIsActive(true);
  }, [time, isActive]);

  useEffect(() => {
    if (!isActive || time <= 0) return;

    const endTime = Date.now() + time * 1000;
    localStorage.setItem(storageKey, String(endTime));

    const id = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [isActive, storageKey]);

  useEffect(() => {
    if (time > 0) return;

    setIsActive(false);
    localStorage.removeItem(storageKey);
    onFinish?.();
  }, [time, storageKey, onFinish]);

  if (!isActive) return null;

  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const secs = String(time % 60).padStart(2, '0');

  return (
    <span className={clsx(styles.timer, className)}>
      {minutes}:{secs}
    </span>
  );
};
