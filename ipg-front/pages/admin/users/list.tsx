import {NextPage} from 'next';
import Router from 'next/router';
import Link from 'next/link';
import React, {Fragment} from 'react';
import {SectionHeader} from '../../../components/SectionHeader';
import classes from '../../../styles/admin.module.scss';
import {isLoggedIn, isAdmin, getUserList, UserFileDTO} from '../../../utils/fetch';
import {BreadcrumbBar} from '../../../components/Breadcrumb';

const AdminUserList: NextPage<{}> = () => {
  const [userList, setUserList] = React.useState<UserFileDTO[]>([]);
  const [abstracts, setAbstracts] = React.useState<string[]>([]);
  const [movies, setMovies] = React.useState<string[]>([]);
  const [presentations, setPresentations] = React.useState<string[]>([]);
  const [consents, setConsents] = React.useState<string[]>([]);

  const [admin, setAdmin] = React.useState<boolean>();
  const isEmpty = (a: any) => a === null || a === undefined;

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
    getUserList().then((res) => {
      if (res.status === 'NG') {
        return;
      }
      setUserList(res.data);
      setAbstracts(res.data.map((user) => {
        if (isEmpty(user?.file?.abstractPath)) {
          return null;
        }
        return process.env.API_SERVER + `/file/abstract/${user.file.id}`;
      }));

      setMovies(res.data.map((user) => {
        if (isEmpty(user?.file?.moviePath)) {
          return null;
        }
        return process.env.API_SERVER + `/file/movie/${user.file.id}`;
      }));

      setPresentations(res.data.map((user) => {
        if (isEmpty(user?.file?.presentationPath)) {
          return null;
        }
        return process.env.API_SERVER + `/file/presentation/${user.file.id}`;
      }));

      setConsents(res.data.map((user) => {
        if (isEmpty(user?.file?.consentPath)) {
          return null;
        }
        return process.env.API_SERVER + `/file/consent/${user.file.id}`;
      }));
    });
  }, [admin]);

  return (
    <div className={classes.root}>
      <BreadcrumbBar crumbs={[
        ['/users', '??????????????????????????????'],
        ['/admin', '????????????????????????'],
        ['/admin/users/list', '??????????????????'],
      ]} />
      <div className={classes.container}>
        <SectionHeader>??????????????????</SectionHeader>
        <table className={classes.listTable}>
          <thead>
            <tr>
              <td width={100}>??????</td>
              <td rowSpan={2}>??????????????????</td>
              <td rowSpan={2} width={60}></td>
            </tr>
            <tr>
              <td width={100}>????????????</td>
            </tr>
          </thead>
          <tbody>
            {
              userList.map((user, userIndex) => (
                <Fragment key={userIndex}>
                  <tr>
                    <td rowSpan={2}>{user.fullName}</td>
                    <td>{abstracts[userIndex] ? (<Link href={abstracts[userIndex]}><a className={classes.verifyText}>??????</a></Link>) : <span className={classes.errorText}>??????</span>}</td>
                    <td rowSpan={2}><Link href={`/admin/users/edit?id=${user.id}`}><a>?????????</a></Link></td>
                  </tr>
                  <tr>
                    <td>{movies[userIndex] ? (<Link href={movies[userIndex]}><a className={classes.verifyText}>??????</a></Link>) : <span className={classes.errorText}>??????</span>}</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>{user.presentationId}</td>
                    <td>{presentations[userIndex] ? (<Link href={presentations[userIndex]}><a className={classes.verifyText}>????????????</a></Link>) : <span className={classes.errorText}>????????????</span>}</td>
                    <td rowSpan={2}><Link href={`/admin/history/?id=${user.id}`}><a>?????????</a></Link></td>
                  </tr>
                  <tr>
                    <td>{consents[userIndex] ? (<Link href={consents[userIndex]}><a className={classes.verifyText}>?????????</a></Link>) : <span className={classes.errorText}>?????????</span>}</td>
                  </tr>
                </Fragment>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserList;
