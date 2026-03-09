import { UserAvatar } from 'shared/ui';
import { Button } from 'shared/ui';
import { useMe } from 'entities/user';

import styles from './ProfileCard.module.scss';

export const ProfileCard = () => {
  const { data } = useMe();

  return (
    <div className={styles.card}>
      {/* <div className={styles.card__left}>
        <UserAvatar src={data?.avatar_url} size={190} />
        <span>ID {data?.id}</span>
      </div> */}
      <div className={styles.card__left}>
        <UserAvatar src={data?.avatar_path} size={190} />
        <span className={styles.card__id}>ID 1888888888</span>
      </div>

      <div className={styles.card__right}>
        {/* <h1 className={styles.card__name}>
            {`${data?.first_name || ''} ${data?.last_name || ''}`}
          </h1> */}
        <h1 className={styles.card__name}>Иванов Иван</h1>

        <div className={styles.card__date}>
          <span>Дата создания</span>
          {/* <span>{data?.created_at}</span> */}
          <span>23 дек. 2025</span>
        </div>

        <p className={styles.card__help}>
          Рекомендуется использоваться максимальный размер 2 МБ JPG или PNG
        </p>

        <div className={styles.card__btns}>
          <Button className={styles.card__btn} type="button" kind="primary">
            Изменить фото
          </Button>
          <Button className={styles.card__btn} type="button" kind="secondary">
            Удалить фото
          </Button>
        </div>
      </div>
    </div>
  );
};
