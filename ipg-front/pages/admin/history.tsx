import classes from '../../styles/admin.module.scss';
import {NextPage} from 'next';
import Router from 'next/router';
import React from 'react';
import {SectionHeader} from '../../components/SectionHeader';
import {isLoggedIn, isAdmin, adminGetHistory, adminGetHistoryByUserId} from '../../utils/fetch';
import {BreadcrumbBar} from '../../components/Breadcrumb';
import {HistoryDTO} from '../../../ipg-api-server/src/types/history.types';
import * as utilFormats from '../../utils/format';
import {getJPTimestamp} from '../../utils/format';
import * as qs from 'querystring';


const AdminHistoryPage: NextPage<{}> = () => {
  const [admin, setAdmin] = React.useState(false);
  const [histories, setHistories] = React.useState<HistoryDTO[]>([]);

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
    const query = qs.decode(location.search.slice(1));

    if (query.id === undefined) {
      adminGetHistory().then((res) => {
        if (res.status === 'OK') {
          setHistories(res.data);
        }
      });
    } else {
      adminGetHistoryByUserId(Number(query.id)).then((res) => {
        if (res.status === 'OK') {
          setHistories(res.data);
        }
      });
    }
  }, [admin]);
  const getDetailText = (history: HistoryDTO) => {
    switch (history.type) {
      case 'fileUpload':
        return utilFormats.getUserUploadFormat(history);
      case 'userChangePassword':
        return utilFormats.getUserChangePasswordFormat(history);
      case 'userCreate':
        return utilFormats.getUserCreateFormat(history);
      case 'userDelete':
        return utilFormats.getUserDeleteFormat(history);
      case 'userEdit':
        return utilFormats.getUserProfileUpdateFormat(history);
      case 'userLogin':
        return utilFormats.getUserLoginFormat(history);
      case 'userResetPassword':
        return utilFormats.getUserResetPasswordFormat(history);
      default:
        return '不明な履歴';
    }
  };
  return (
    <div className={classes.root}>
      <BreadcrumbBar crumbs={[
        ['/users', 'ログインユーザー画面'],
        ['/admin', '管理者画面トップ'],
        ['/admin/history', 'サーバー履歴'],
      ]} />
      <div className={classes.container}>
        <SectionHeader>履歴確認画面</SectionHeader>
        {
          histories.map((history) => (
            <div key={history.createdAt.toISOString()}>
              <p>
                {getJPTimestamp(history.createdAt)}
              </p>
              <p>
                {
                  getDetailText(history)
                }
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
;

export default AdminHistoryPage
;
