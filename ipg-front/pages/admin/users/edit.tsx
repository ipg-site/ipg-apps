import {NextPage} from 'next';
import Router from 'next/router';
import React from 'react';
import {SectionHeader} from '../../../components/SectionHeader';
import classes from '../../../styles/admin.module.scss';
import {isLoggedIn, isAdmin, adminGetUserData, UserFileDTO, adminUpdateUserData, adminChangePassword, adminDeleteUser} from '../../../utils/fetch';
import * as qs from 'querystring';
import {Button, InputBox, SelectBox} from '../../../components/Input';
import {Grade, Presentation} from '../../../../ipg-api-server/src/types/user.types';
import {BreadcrumbBar} from '../../../components/Breadcrumb';
import {grades, pTypes} from './add';

const AdminUserEdit: NextPage<{}> = ()=> {
  const [admin, setAdmin] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<UserFileDTO>(null);


  const [fullName, setFullName] = React.useState('');
  const [university, setUniv] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [grade, setGrade] = React.useState<Grade>('B4');
  const [address, setAddress] = React.useState('');
  const [presentationType, setPType] = React.useState<Presentation>('聴講');
  const [presentationId, setPID] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [hidden, setHidden] = React.useState(true);
  const [reload, setReload] = React.useState(0);

  const [newPassword, setNewPassword] = React.useState('');

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
        setAdmin(true);
      });
    });
  }, []);

  React.useEffect(() => {
    if (!admin) {
      return;
    }
    const query = qs.decode(location.search.slice(1));
    adminGetUserData(Number(query.id)).then((user) => {
      if (user.status === 'NG') {
        return;
      }
      setUser(user.data);
      setFullName(user.data.fullName);
      setAddress(user.data.address);
      setEmail(user.data.email);
      setGrade(user.data.grade);
      setHidden(user.data.presentationType === '聴講');
      setPID(user.data.presentationId);
      setPType(user.data.presentationType);
      setTitle(user.data.title);
      setUniv(user.data.university);
    });
  }, [admin, reload]);
  if (user === null) {
    return (
      <div className={classes.root}>
        <BreadcrumbBar crumbs={[
          ['/admin', '管理者画面トップ'],
          ['/admin/users/list', 'ユーザー一覧'],
          ['/admin/users/edit', 'ユーザー編集'],
        ]} />
        <div className={classes.container}>
          <SectionHeader>ユーザー編集</SectionHeader>
        </div>
      </div>
    );
  }

  const editAction = async () => {
    const res = await adminUpdateUserData(user.id, {
      email,
      fullName,
      grade,
      address,
      university,
      presentationType,
      presentationId,
      title,
    });
    if (res === 'NG') {
      alert('ユーザー作成に失敗しました。');
      return;
    }
    alert('ユーザーデータを更新しました。');
    setReload(Date.now());
  };

  const changePasswordAction = async () => {
    const confirmYesNo = confirm('パスワードをリセットします。よろしいですか？');
    if (!confirmYesNo) {
      return;
    }
    const res = await adminChangePassword(user.id);
    if (res.status === 'NG') {
      alert('パスワードの更新に失敗いたしました。');
      return;
    }
    setNewPassword(res.password);
  };

  const deleteUserAction = async () => {
    const confirmYesNo = confirm(`ユーザー名: ${user.email}を削除します。よろしいですか？`);
    if (!confirmYesNo) {
      return;
    }
    const res = await adminDeleteUser(user.id);
    if (res === 'NG') {
      alert('ユーザー削除に失敗いたしました。');
      return;
    }
    alert('ユーザーを削除しました。');
    Router.push('/admin/users/list');
  };

  return (
    <div className={classes.root}>
      <BreadcrumbBar crumbs={[
        ['/users', 'ログインユーザー画面'],
        ['/admin', '管理者画面トップ'],
        ['/admin/users/list', 'ユーザー一覧'],
        ['/admin/users/edit?id=' + user.id, 'ユーザー編集'],
      ]} />
      <div className={classes.container}>
        <SectionHeader>ユーザー編集</SectionHeader>
      </div>
      <div className={classes.container}>
        <InputBox defaultValue={fullName} label="名前" onChange={(e) => setFullName(e.input as string)}/>
        <InputBox defaultValue={university} label="大学名" onChange={(e) => setUniv(e.input as string)} />
        <InputBox defaultValue={email} label="メールアドレス" onChange={(e) => setEmail(e.input as string)} />
        <SelectBox onAction={(e) => {
          setGrade(e.value as Grade);
        }} label="学年" items={grades} index={grades.indexOf(grade)}/>
        <InputBox label="住所" onChange={(e) => setAddress(e.input as string)} defaultValue={address} />
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
            <InputBox label="発表者番号" onChange={(e) => setPID(e.input as string)} defaultValue={presentationId} />
            <InputBox label="発表タイトル" onChange={(e) => setTitle(e.input as string)} defaultValue={title} />
          </>
        )}
        <Button onAction={() => {
          editAction();
        }}>編集</Button>
        <Button onAction={() => {
          changePasswordAction();
        }} variable="error">パスワードをリセット</Button>
        <div>
          新しいパスワード: {newPassword}
        </div>
        <Button onAction={() => {
          deleteUserAction();
        }} variable="error">ユーザーを削除</Button>
      </div>
    </div>
  );
}
;

export default AdminUserEdit;
