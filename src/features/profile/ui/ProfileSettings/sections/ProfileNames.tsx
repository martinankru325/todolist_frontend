import { Input, Button } from 'shared/ui';
import styles from './../ProfileSettings.module.scss';

export const ProfileNames = () => {
  return (
    <form className={styles.settings__wrapper}>
      <div className={styles.settings__inner}>
        <Input label="Фамилия" placeholder="Иванов" />
        <Input label="Имя" placeholder="Иван" />
      </div>
      <Button kind='secondary' className={styles.settings__btn} type="submit">
        Сохранить
      </Button>
    </form>
  );
};
