import { Button } from 'shared/ui';
import styles from './../ProfileSettings.module.scss';

export const ProfilePassword = () => {
    return (
        <form className={styles.settings__wrapper}>
            <p>Сменить пароль</p>
            <Button kind='secondary' className={styles.settings__btn} type="submit">Изменить</Button>
        </form>
    )
}
