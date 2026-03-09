import { Input, Button } from 'shared/ui';
import styles from './../ProfileSettings.module.scss';

export const ProfileEmail = () => {
  return (
    <form className={styles.settings__wrapper}>
      <div className={styles.settings__inner}>
        <Input label="Email" type="email" placeholder="Адрес электронной почты" />
      </div>

      <Button kind="secondary" className={styles.settings__btn} type="submit">
        Сохранить
      </Button>
    </form>
  );
};
