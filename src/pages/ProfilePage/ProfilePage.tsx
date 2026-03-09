import styles from './ProfilePage.module.scss';
import { ProfileCard, ProfileSettings, ProfileTags } from 'features/profile';
import { PageLayout } from 'shared/ui';

const ProfilePage = () => {
  return (
    <PageLayout
      title='Аккаунт'
      breadcrumbsItems={[
        {label: 'Мои проекты', href: '/project'},
        {label: 'Аккаунт', href: '/profile'},
      ]}
    >
      <div className={styles.profile}>
        <div className="container">
            <ProfileCard />
            <ProfileSettings />
            <ProfileTags />
        </div>
      </div>

    </PageLayout>
  )
}

export default ProfilePage;
