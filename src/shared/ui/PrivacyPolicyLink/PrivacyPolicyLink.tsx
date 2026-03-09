import styles from './PrivacyPolicyLink.module.scss';

export const PrivacyPolicyLink = () => (
  <a className={styles['policy-link']} href="/files/PrivacyPolicy.pdf" download="PrivacyPolicy.pdf">
    Политика конфиденциальности
  </a>
);
