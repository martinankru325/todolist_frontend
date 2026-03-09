import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.loader__dot}></span>
      <span className={styles.loader__dot}></span>
      <span className={styles.loader__dot}></span>
    </div>
  );
};
