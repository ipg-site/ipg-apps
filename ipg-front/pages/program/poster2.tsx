import {NextPage} from 'next';
import React from 'react';
import {LeftSide} from '../../components/LeftSide';
import classes from '../../styles/program.module.scss';
import Router from 'next/router';
import {getUserListByType, isLoggedIn} from '../../utils/fetch';
import {PresentationDTO} from '../../../ipg-api-server/src/types/user.types';
import {PresentationRow} from '../../components/PresentationRow';

const Poster1Page: NextPage<{}> = ()=> {
  const [auth, setAuth] = React.useState(false);
  const [presentationList, setList] = React.useState<PresentationDTO[]>([]);
  React.useEffect(() => {
    isLoggedIn().then((res) => {
      if (res === 'NG') {
        Router.push('/login?redirect=' + encodeURIComponent(location.pathname + location.search));
      } else {
        setAuth(true);
      }
    });
  }, []);


  React.useEffect(() => {
    getUserListByType('ポスター2').then((res) => {
      if (!res) {
        alert('一覧の取得に失敗しました。');
      }
      setList(res.data);
    });
  }, [auth]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <LeftSide />
        </div>
        <div className={classes.rightContainer}>
          {presentationList?.map((presentation, i) => (
            <PresentationRow data={presentation} key={'presentation-row-' + i}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Poster1Page;
