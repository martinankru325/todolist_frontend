import { useState } from 'react';
import styles from './UserAvatar.module.scss';
import defaultIcon from 'assets/defaultAvatar-icon.svg';

type TProps = {
  src: string | null | undefined;
  size: number;
}

export const UserAvatar = ({ src, size }: TProps) => {
  const [avatar, setAvatar] = useState( src || defaultIcon);
  return (
    <img
      src={avatar || defaultIcon}
      alt="User Avatar"
      width={size}
      height={size}
      className={styles.avatar}
      onError={() => setAvatar(defaultIcon)}
    />
  )
}