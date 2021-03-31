import {NextPage} from 'next';
import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {InputBox, Button} from '../components/Input';
import classes from '../styles/login.module.scss';
import {login, loginWithNewPassword} from '../utils/fetch';
import * as qs from 'querystring';

const LoginPage: NextPage<{API_SERVER: string}> = ({API_SERVER}) => {
  const [username, setUN] = React.useState<string>();
  const [password, setPW] = React.useState<string>();
  const [newPassword, setNewPW] = React.useState<string>('');
  const [hidden, setHidden] = React.useState<Boolean>(true);
  const loginAction = async () => {
    const res = newPassword === '' ? await login(username, password) : await loginWithNewPassword(username, password, newPassword);
    if (res === 'CHANGE') {
      setHidden(false);
      alert('新しいパスワードを入力してください。');
      return;
    }
    if (res === 'OK') {
      const query = qs.decode(location.search.slice(1));
      if (!query.redirect) {
        Router.push('/users/');
      } else {
        Router.push(query.redirect as string);
      }
      return;
    }
    alert('ユーザー名、もしくはパスワードが異なります。');
  };
  return (
    <div className={classes.root}>
      <Head>
        <title>
        第15回関東学生研究論文講演会 | ログイン画面
        </title>
      </Head>
      <div className={classes.inputContainer}>
        <InputBox label="メールアドレス" onChange={(e) => setUN(e.input as string)} onKeyPressed={loginAction}/>
        <InputBox label="パスワード" onChange={(e) => setPW(e.input as string)} onKeyPressed={loginAction} secure />
        {
          hidden ? '' : (
            <InputBox label="新しいパスワード" onChange={(e) => setNewPW(e.input as string)} onKeyPressed={loginAction} secure />
          )
        }
        <Button onAction={loginAction}>ログイン</Button>
      </div>
    </div>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      API_SERVER: process.env.API_SERVER,
    },
  };
};

export default LoginPage
;
