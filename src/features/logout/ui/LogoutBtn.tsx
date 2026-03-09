import { useLogoutBtn } from '../model/useLogoutBtn';
import { FC, ReactNode } from 'react';

type TProps = {
  children: ReactNode;
  className?: string;
}

export const LogoutBtn: FC<TProps> = ({ children, className }) => {
  const { mutate } = useLogoutBtn();

  return (
    <button
      className={className}
      onClick={() => mutate()}
    >
      {children}
    </button>
  )
}
