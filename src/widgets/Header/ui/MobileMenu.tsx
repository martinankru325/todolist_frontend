import styles from './MobileMenu.module.scss';
import MenuIcon from 'assets/menu-icon.svg?react';
import { Link } from 'react-router-dom';
import { Overlay, UserAvatar } from 'shared/ui';
import { User } from 'entities/user';
import ArchiveIcon from 'assets/archive-icon.svg?react';
import LogoutIcon from 'assets/logout-icon.svg?react';
import { LogoutBtn } from 'features/logout';
import { useDropdown } from 'shared/lib/useDropdown';

type TProps = {
  userData?: User;
}

export const MobileMenu = ({userData}: TProps) => {
  const {
    isOpen,
    setIsOpen,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
  } = useDropdown({offsetValue: 13});

  return (
    <div className={styles.menu}>
      <button
        className={styles.menu__btn}
        ref={refs.setReference}
        onClick={() => setIsOpen(prev => !prev)}
        {...getReferenceProps()}
      >
        <MenuIcon />
      </button>

      {isOpen &&
        <>
          <Overlay zIndex={149}/>

          <nav
            className={styles.menu__dropdown}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            >
            <Link to={'/profile'} className={styles.menu__item}>
              <UserAvatar src={userData?.avatar_path} size={24}/>
              <span>Профиль</span>
            </Link>

            <Link to={'/archive'} className={styles.menu__item} >
              <ArchiveIcon/>
              <span>Архив</span>
            </Link>

            <LogoutBtn className={styles.menu__item} >
              <LogoutIcon/>
              <span>Выйти из аккаунта</span>
            </LogoutBtn>
          </nav>
        </>
      }
    </div>
  );
};
