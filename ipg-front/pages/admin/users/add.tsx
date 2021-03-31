import classes from '../../../styles/admin.module.scss';
import {NextPage} from 'next';
import Router from 'next/router';
import React from 'react';
import {SectionHeader} from '../../../components/SectionHeader';
import {isLoggedIn, isAdmin, addUser} from '../../../utils/fetch';
import {Button, InputBox, SelectBox} from '../../../components/Input';
import {Grade, Presentation} from '../../../../ipg-api-server/src/types/user.types';
import {BreadcrumbBar} from '../../../components/Breadcrumb';


export const grades = ['B3', 'B4', 'M1', 'M2', 'D1', 'D2', 'D3', 'その他'];
export const pTypes = ['聴講', 'オーラル', 'ポスター1', 'ポスター2'];

const AdminUsersAddPage: NextPage<{}> = () => {
  const [hidden, setHidden] = React.useState(true);
  const [mailTo, setMailTo] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [result, setResult] = React.useState(false);


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

  const addAction = async () => {
    const res = await addUser({
      email,
      fullName,
      grade,
      address,
      university,
      presentationType,
      presentationId,
      title,
    });
    if (res.status === 'NG') {
      alert('ユーザー作成に失敗しました。');
      return;
    }
    setMailTo(true);
    setUsername(res.username);
    setPassword(res.password);
    setResult(true);
  };

  const mailToAction = async () => {
    const lineFeed = '\r\n';
    // 件名
    const subject = '【第15回関東学生研究論文講演会】ログインユーザー作成のお知らせ';
    // 本文
    const body = [
      `お名前：${fullName}`,
      `メールアドレス：${username}`,
      `ご住所：${address}`,
      `大学: ${university}`,
      `学年: ${grade}`,
      `発表者番号: ${presentationId === '' ? 'なし' : presentationId}`,
      `発表形式: ${presentationType}`,
      `タイトル: ${title}`,
      `----`,
      `ログイン用初期パスワード：${password}`,
      `その他連絡事項： ログイン用初期パスワードでログインした後はパスワードの変更が必要です。また初期パスワードを紛失してしまった場合は事務局へご連絡をお願いいたします。`,
    ];

    const mailto = [username,
      '?subject=' + subject,
      '&body=' + body.join(encodeURIComponent(lineFeed))].join('');

    location.href = 'mailto:' + mailto;
  };

  const [fullName, setFullName] = React.useState('');
  const [university, setUniv] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [grade, setGrade] = React.useState<Grade>('B4');
  const [address, setAddress] = React.useState('');
  const [presentationType, setPType] = React.useState<Presentation>('聴講');
  const [presentationId, setPID] = React.useState('');
  const [title, setTitle] = React.useState('');

  if (result) {
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div>ログインメールアドレス: {username}</div>
          <div>ログインパスワード: {password}</div>
          {
            mailTo ? (
              <Button onAction={() => {
                mailToAction();
              }}>初期パスワードを送信(メールアプリが起動します)</Button>
            ) : <></>
          }
          <div style={{height: '4em'}}/>
          <Button onAction={() => {
            setResult(false);
            setMailTo(false);
            setUsername('');
            setPassword('');
            setFullName('');
            setUniv('');
            setEmail('');
            setGrade('B4');
            setAddress('');
            setPType('聴講');
            setPID('');
            setTitle('');
          }}>他の新しいユーザーを作成する</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <BreadcrumbBar crumbs={[
        ['/users', 'ログインユーザー画面'],
        ['/admin', '管理者画面トップ'],
        ['/admin/users/add', 'ユーザー作成'],
      ]} />
      <div className={classes.container}>
        <SectionHeader>ユーザー追加</SectionHeader>
        <InputBox label="名前" onChange={(e) => setFullName(e.input as string)}/>
        <InputBox label="大学名" onChange={(e) => setUniv(e.input as string)} />
        <InputBox label="メールアドレス" onChange={(e) => setEmail(e.input as string)} />
        <SelectBox onAction={(e) => {
          setGrade(e.value as Grade);
        }} label="学年" items={['B3', 'B4', 'M1', 'M2', 'D1', 'D2', 'D3', 'その他']} index={grades.indexOf(grade)}/>
        <InputBox label="住所" onChange={(e) => setAddress(e.input as string)} />
        <SelectBox onAction={(e) => {
          if (e.value !== '聴講') {
            setHidden(false);
          } else {
            setHidden(true);
          }
          setPType(e.value as Presentation);
        }} label="発表形式" items={pTypes} index={pTypes.indexOf(presentationType)}/>
        {hidden ? <></> : (
          <>
            <InputBox label="発表者番号" onChange={(e) => setPID(e.input as string)} />
            <InputBox label="発表タイトル" onChange={(e) => setTitle(e.input as string)} />
          </>
        )}
        <Button onAction={() => {
          addAction();
        }}>登録</Button>
      </div>
    </div>
  );
}
;


export default AdminUsersAddPage
;
