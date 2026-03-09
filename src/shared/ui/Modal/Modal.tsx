import clsx from 'clsx';
import styles from './Modal.module.scss';

import { FC, ReactNode, useEffect } from 'react';
import { Overlay } from '../Overlay/Overlay';

type TProps = {
  modeX?: 'left' | 'center' | 'right';
  modeY?: 'top' | 'center' | 'bottom';
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<TProps> = ({ modeX = 'center', modeY = 'center', isOpen, onClose, children }) => {

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose} className={clsx(styles[`modal_modeX-${modeX}`], styles[`modal_modeY-${modeY}`])}>
      <div className={styles.modal__content} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        {children}
      </div>
    </Overlay>
  )
};
