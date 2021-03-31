import React from 'react';
import Link from 'next/link';
import classes from '../styles/AppHeader.module.scss';
import {isLoggedIn, getAdminConfig, isAdmin} from '../utils/fetch';

export const AppHeader: React.FC<{locale?: string}> = ({locale}) => {
  const presenterMode = locale === '/login' || locale?.startsWith('/user');
  const programMode = locale?.startsWith('/program');
  const adminMode = locale?.startsWith('/admin');
  const [hidden, setHidden] = React.useState(true);


  React.useEffect(() => {
    isLoggedIn().then(async (x) => {
      if (x === 'NG') {
        return;
      }
      const adminConfig = await getAdminConfig();
      if (adminConfig.status === 'NG') {
        return;
      }
      const admin = await isAdmin().then((x) => x === 'OK');
      if (adminConfig.data.programPage || admin) {
        setHidden(false);
        return;
      }
    });
  }, []);


  if (adminMode) {
    return (
      <div className={classes.userRoot}>
        <div className={classes.headerTitle}>
              管理者パネル
        </div>
        <div className={classes.headerLinkContainer}>
          <Link href="/"><a className={classes.appHeaderLink}>トップページへ</a></Link>
        </div>
      </div>
    );
  }
  if (presenterMode) {
    return (
      <div className={classes.userRoot}>
        <div className={classes.headerTitle}>
              管理画面
        </div>
        <div className={classes.headerLinkContainer}>
          {hidden ? <></> : <Link href="/program"><a className={classes.appHeaderLink}>特設サイトへ</a></Link>}
          <Link href="/"><a className={classes.appHeaderLink}>トップページへ</a></Link>
        </div>
      </div>
    );
  }
  if (programMode) {
    return (
      <div className={classes.userRoot}>
        <div className={classes.headerTitle}>
          <Link href="/"><a>第15回関東学生研究論文講演会</a></Link>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.headerTitle}>
        <Link href="/"><a>第15回関東学生研究論文講演会</a></Link>
      </div>
      <div className={classes.headerLinkContainer}>
        <Link href="/login"><a className={classes.appHeaderLink}>発表者・聴講者ログイン</a></Link>
      </div>
    </div>
  );
}
;
