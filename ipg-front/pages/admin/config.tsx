import classes from '../../styles/admin.module.scss';
import {NextPage} from 'next';
import Router from 'next/router';
import React from 'react';
import {SectionHeader} from '../../components/SectionHeader';
import {isLoggedIn, isAdmin, getAdminConfig, setAbstractFlag, setPresentationFlag, setRedirectFlag, setMovieFlag, setProgramPageVisible} from '../../utils/fetch';
import {Button} from '../../components/Input';
import {BreadcrumbBar} from '../../components/Breadcrumb';
import {AdminConfigDTO} from '../../../ipg-api-server/src/types/admin.types';


const AdminConfigPage: NextPage<{}> = () => {
  const [admin, setAdmin] = React.useState(false);
  const [config, setConfig] = React.useState<AdminConfigDTO>(null);
  const [reload, setReload] = React.useState(0);
  React.useEffect(() => {
    isLoggedIn().then(async (x) => {
      if (x === 'NG') {
        Router.push('/login?redirect=' + encodeURIComponent(location.pathname + location.search));
        return;
      }
      isAdmin().then((x) => {
        if (x === 'NG') {
          Router.push('/login?redirect=' + encodeURIComponent(location.pathname + location.search));
          return;
        }
        setAdmin(true);
      });
    });
  }, []);

  React.useEffect(() => {
    getAdminConfig().then((res) => {
      if (res.status === 'NG') {
        return;
      }
      setConfig(res.data);
      console.log(res.data);
    });
  }, [admin, reload]);
  if (config === null) {
    return (
      <div className={classes.root}>
        <BreadcrumbBar crumbs={[
          ['/users', 'ログインユーザー画面'],
          ['/admin', '管理者画面トップ'],
          ['/admin/config', 'サイト設定'],
        ]} />
        <div className={classes.container}>
          <SectionHeader>サイト設定</SectionHeader>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <BreadcrumbBar crumbs={[
        ['/users', 'ログインユーザー画面'],
        ['/admin', '管理者画面トップ'],
        ['/admin/config', 'サイト設定'],
      ]} />
      <div className={classes.container}>
        <SectionHeader>サイト設定</SectionHeader>
        <Button onAction={() => {
          setAbstractFlag().then(() => setReload(Date.now()));
        }} variable={config.abstractUpload ? 'verify' : 'error'}>予稿アップロードは現在{config.abstractUpload ? '許可' : '禁止'}されています</Button>
        <Button onAction={() => {
          setMovieFlag().then(() => setReload(Date.now()));
        }} variable={config.movieUpload ? 'verify' : 'error'}>動画アップロードは現在{config.movieUpload ? '許可' : '禁止'}されています</Button>
        <Button onAction={() => {
          setPresentationFlag().then(() => setReload(Date.now()));
        }} variable={config.presentationUpload ? 'verify' : 'error'}>発表資料アップロードは現在{config.presentationUpload ? '許可' : '禁止'}されています</Button>
        <Button onAction={() => {
          setRedirectFlag().then(() => setReload(Date.now()));
        }} variable={config.redirect ? 'verify' : 'error'}>アップロードサイトからのリダイレクトは現在設定されて{config.redirect ? 'います' : 'いません'}</Button>
        <Button onAction={() => {
          setProgramPageVisible().then(() => setReload(Date.now()));
        }} variable={config.programPage ? 'verify' : 'error'}>特設サイトは現在{config.programPage ? '公開' : '非公開'}に設定されています。</Button>
      </div>
    </div>
  );
}
;

export default AdminConfigPage
;
