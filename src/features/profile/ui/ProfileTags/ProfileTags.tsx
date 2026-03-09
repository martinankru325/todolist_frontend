import { Button } from 'shared/ui';
import styles from './ProfileTags.module.scss';

export const ProfileTags = () => {
  return (
    <div className={styles.tags}>
      <h1 className={styles.tags__title}>Тэги</h1>
      <div className={styles.tags__wrapper}>
        <p>Сменить пароль</p>
        <Button kind="secondary" className={styles.tags__btn} type="button">
          Изменить
        </Button>
      </div>
    </div>
  );
};
