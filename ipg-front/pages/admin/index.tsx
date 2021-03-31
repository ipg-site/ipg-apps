import classes from '../../styles/admin.module.scss';
import {NextPage} from 'next';
import Router from 'next/router';
import Link from 'next/link';
import React from 'react';
import {SectionHeader} from '../../components/SectionHeader';
import {isLoggedIn, isAdmin} from '../../utils/fetch';
import {Button} from '../../components/Input';
import {BreadcrumbBar} from '../../components/Breadcrumb';


const AdminPage: NextPage<{}> = () => {
  React.useEffect(() => {
    isLoggedIn().then(async (x) => {
      if (x === 'NG') {
        Router.push('/login?redirect=' + encodeURIComponent(location.pathname + location.search));
        return;
      }
      isAdmin().then((x) => {
        if (x === 'NG') {
          Router.push('/login?redirect=' + encodeURIComponent(location.pathname + location.search));
        }
      });
    });
  }, []);
  return (
    <div className={classes.root}>
      <BreadcrumbBar crumbs={[
        ['/users', 'ログインユーザー画面'],
        ['/admin', '管理者画面トップ'],
      ]} />
      <div className={classes.container}>
        <SectionHeader>管理者画面</SectionHeader>
        <Link href="/admin/users/add">
          <a>
            <Button>ユーザー追加</Button>
          </a>
        </Link>
        <Link href="/admin/users/list">
          <a>
            <Button>ユーザー一覧</Button>
          </a>
        </Link>
        <Link href="/admin/config">
          <a>
            <Button>サイト設定</Button>
          </a>
        </Link>
        <Link href="/admin/history">
          <a>
            <Button>サーバー履歴</Button>
          </a>
        </Link>
      </div>
    </div>
  );
}
;

export default AdminPage
;
