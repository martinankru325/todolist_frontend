import styles from './Header.module.scss';

import { useMe } from 'entities/user';
import { DateTimeWidget } from './DateTimeWidget';
import { UserAvatar } from 'shared/ui';
import { Link } from 'react-router-dom';
import logo from 'assets/logo.webp';
import logoSmall from 'assets/logo-sm.webp';
import ArchiveIcon from 'assets/archive-icon.svg?react';
import LogoutIcon from 'assets/logout-icon.svg?react';
import { LogoutBtn } from 'features/logout';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from 'app/styles/breakpoints';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  const isTablet = useMediaQuery({ maxWidth: breakpoints.lg });
  const { data } = useMe();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__content}>
          <img className={styles.header__logo} src={isTablet ? logoSmall : logo} alt="логотип TodoList" />

            <div className={styles.header__wrapper}>
              {!isTablet &&
                <>
                  <DateTimeWidget />

                  <div className={styles.header__divider} />

                  <nav className={styles.header__btns}>
                    <Link to={'/profile'}>
                      <UserAvatar src={data?.avatar_path} size={32} />
                    </Link>

                    <Link to={'/archive'} className={styles.header__icon} >
                      <ArchiveIcon/>
                    </Link>

                    <LogoutBtn className={styles.header__icon} >
                      <LogoutIcon/>
                    </LogoutBtn>
                  </nav>
                </>
              }
              {isTablet &&
                <MobileMenu userData={data}/>
              }
            </div>
        </div>
      </div>
    </header>
  );
};
