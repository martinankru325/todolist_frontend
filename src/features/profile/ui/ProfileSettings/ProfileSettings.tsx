import { ProfileNames } from './sections/ProfileNames';
import { ProfileEmail } from './sections/ProfileEmail';
import { ProfilePassword } from './sections/ProfilePassword';
import styles from './ProfileSettings.module.scss';

export const ProfileSettings = () => {
  return (
    <div className={styles.settings}>
      <h1 className={styles.settings__title}>Настройки пользователя</h1>
      <ProfileNames />
      <ProfileEmail />
      <ProfilePassword />
    </div>
  );
};
