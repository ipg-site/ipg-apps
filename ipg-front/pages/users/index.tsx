import classes from '../../styles/users.module.scss';
import {NextPage} from 'next';
import Link from 'next/link';
import Router from 'next/router';
import Head from 'next/head';
import React from 'react';
import {getAdminConfig, getUserData, isAdmin, isLoggedIn, UserFileDTO} from '../../utils/fetch';
import {SectionHeader} from '../../components/SectionHeader';
import {UploadBigButton} from '../../components/UploadBigButton';

const UserTable: React.FC<{user: UserFileDTO, admin: boolean}> = ({user, admin}) => {
  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          <th>お名前</th>
          <td>{user?.fullName}</td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td>{user?.email}</td>
        </tr>
        <tr>
          <th>所属機関</th>
          <td>{user?.university}</td>
        </tr>
        <tr>
          <th>学年</th>
          <td>{user?.grade}</td>
        </tr>
        <tr>
          <th>発表形式</th>
          <td>{user?.presentationType}</td>
        </tr>
        {user?.presentationType === '聴講' && !user?.isAdmin ? <></> : (
            <>
              <tr>
                <th>発表者番号</th>
                <td>{user?.presentationId}</td>
              </tr>
              <tr>
                <th>発表タイトル</th>
                <td>{user?.title}</td>
              </tr>
            </>
            )}
        {admin ? (
            <tr>
              <th>管理者権限</th>
              <td>{admin ? (
                <Link href="/admin"><a>クリックして管理者画面へ</a></Link>
              ) : 'なし'}</td>
            </tr>
            ) : <></>}
      </tbody>
    </table>
  );
};

const UsersIndex: NextPage<{}> = () => {
  const [admin, setAdmin] = React.useState(false);
  const [user, setUser] = React.useState<UserFileDTO>(null);
  const [uploadStatus, setStatus] = React.useState<{
    abstract?: boolean;
    movie?: boolean;
    presentation?: boolean;
    consent?: boolean;
  }>({abstract: false, consent: false, presentation: false, movie: false});

  const [visible, setVisible] = React.useState<{
    abstract?: boolean;
    movie?: boolean;
    presentation?: boolean;
    consent?: boolean;
  }>({
    consent: true,
    presentation: true,
    abstract: true,
  });

  React.useEffect(() => {
    isLoggedIn().then(async (x) => {
      if (x === 'NG') {
        Router.push('/login?redirect=' + encodeURIComponent(location.pathname + location.search));
        return;
      }
      const _admin = await isAdmin().then((x) => {
        setAdmin(x === 'OK');
        return x === 'OK';
      });
      const adminConfig = await getAdminConfig();
      if (adminConfig.status === 'NG') {
        Router.push('/login?redirect=' + encodeURIComponent(location.pathname + location.search));
        return;
      }
      if (adminConfig.data.redirect && !_admin) {
        Router.push('/program');
        return;
      }
      const res = await getUserData();
      if (res.status === 'NG') {
        return;
      }
      setUser(res.data);
      if (res.data.presentationType === 'オーラル') {
        setVisible((c) => ({
          ...c,
          movie: false,
        }));
      }
      if (res.data.presentationType === 'ポスター1' || res.data.presentationType === 'ポスター2') {
        setVisible((c) => ({
          ...c,
          movie: true,
        }));
      }
      const abstract = !!res.data?.file?.abstractPath && res.data?.file?.abstractPath !== '';
      const movie = !!res.data?.file?.moviePath && res.data?.file?.moviePath !== '';
      const presentation = !!res.data?.file?.presentationPath && res.data?.file?.presentationPath !== '';
      const consent = !!res.data?.file?.consentPath && res.data?.file?.consentPath !== '';
      setStatus({
        abstract, movie, presentation, consent,
      });
    });
  }, []);
  if (user?.presentationType === '聴講' && !admin) {
    return (
      <div className={classes.root}>
        <Head>
          <title>
            第15回関東学生研究論文講演会 | 管理画面
          </title>
        </Head>
        <div className={classes.container}>
          <SectionHeader>ユーザー情報</SectionHeader>
          <UserTable user={user} admin={admin}/>
        </div>
      </div>
    );
  }
  const getUserAgain = async () => {
    const res = await getUserData();
    if (res.status === 'NG') {
      return;
    }
    setUser(res.data);
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>
          第15回関東学生研究論文講演会 | 管理画面
        </title>
      </Head>
      <div className={classes.container}>
        <SectionHeader>ユーザー情報</SectionHeader>
        <UserTable user={user} admin={admin}/>
        <SectionHeader>アップロード状況</SectionHeader>
        <div className={classes.buttonContainer}>
          {visible.abstract ? (
            <UploadBigButton
              endpoint="/file/abstract"
              title="予稿資料"
              verify={uploadStatus.abstract}
              imgSrc="/imgs/article.svg"
              mimeType="application/pdf"
              filePath={user && user.file ? `/files/viewer?type=abstract&fid=${user.file.id}` : ''}
              onUpload={(e) => {
                if (e === 'OK') {
                  getUserAgain();
                }
              }}
            />
          ) : <></>}
          {visible.movie ? (
          <UploadBigButton
            endpoint="/file/movie"
            title="ショート動画"
            verify={uploadStatus.movie}
            imgSrc="/imgs/movie.svg"
            mimeType="video/mp4"
            filePath={user && user.file ? `/files/viewer?type=movie&fid=${user.file.id}` : ''}
            onUpload={(e) => {
              if (e === 'OK') {
                getUserAgain();
              }
            }}/>
            ) : <></>}
          {visible.presentation ? (
          <UploadBigButton
            endpoint="/file/presentation"
            title="発表資料"
            verify={uploadStatus.presentation}
            imgSrc="/imgs/presentation.svg"
            mimeType="application/pdf"
            filePath={user && user.file ? `/files/viewer?type=presentation&fid=${user.file.id}` : ''}
            onUpload={(e) => {
              if (e === 'OK') {
                getUserAgain();
              }
            }}/>
            ) : <></>}
          {visible.consent ? (
          <UploadBigButton
            endpoint="/file/consent"
            title="著作権同意書"
            verify={uploadStatus.consent}
            imgSrc="/imgs/consent.svg"
            mimeType="application/pdf"
            filePath={user && user.file ? `/files/viewer?type=consent&fid=${user.file.id}` : ''}
            onUpload={(e) => {
              if (e === 'OK') {
                getUserAgain();
              }
            }}/>
            ) : <></>}
        </div>
      </div>
    </div>
  );
};


export default UsersIndex;
