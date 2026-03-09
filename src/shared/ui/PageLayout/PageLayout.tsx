import { Children, isValidElement, ReactNode } from 'react';
import styles from './PageLayout.module.scss';
import { Header } from 'widgets';
import { Breadcrumbs, TBreadcrumb } from 'shared/ui';

type LayoutProps = {
  title: string
  breadcrumbsItems?: TBreadcrumb[];
  children: ReactNode;
}

type SlotProps = {
  children: ReactNode;
}

export const PageLayout = ({ title, breadcrumbsItems, children }: LayoutProps) => {
  let leftBlock: ReactNode = null;
  let rightBlock: ReactNode = null;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === PageLayout.LeftContent) {
      leftBlock = child;
    }
    if (child.type === PageLayout.RightContent) {
      rightBlock = child;
    }
  });

  const mainContent = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    if (child.type === PageLayout.LeftContent || child.type === PageLayout.RightContent) {
      return null;
    }
    return child;
  });

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <div className="container">
          <div className={styles['layout__page-header']}>
            <h1 className={styles.layout__title}>{title}</h1>
            <div className={styles.layout__actions}>
              {leftBlock}
              {rightBlock}
            </div>
            {breadcrumbsItems && <Breadcrumbs className={styles.layout__breadcrumbs} items={breadcrumbsItems}/>}
            <div className={styles.layout__divider} />
          </div>
        </div>

        {mainContent}
      </div>
    </div>
  );
};

PageLayout.LeftContent = ({ children }: SlotProps) => {
  return <div className={styles['left-content']}>{children}</div>;
};

PageLayout.RightContent = ({ children }: SlotProps) => {
  return <div className={styles['right-content']}>{children}</div>;
};
