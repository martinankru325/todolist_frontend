import clsx from 'clsx';
import styles from './Overlay.module.scss';
import { createPortal } from 'react-dom';
import { FC, ReactNode } from 'react';

type TProps = {
  onClick?: () => void;
  zIndex?: number;
  className?: string;
  children?: ReactNode;
}

export const Overlay: FC<TProps> = ({ onClick, zIndex = 200, className, children }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return (
    createPortal(
      <div
        className={clsx(styles.overlay, className)}
        onClick={onClick}
        style={{zIndex}}
      >
        {children}
      </div>,
      modalRoot
    )
  )
}
