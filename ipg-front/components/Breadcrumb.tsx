import React, {Fragment} from 'react';
import Link from 'next/link';
import classes from '../styles/BreadcrumbBar.module.scss';

type LinkString = string
type DisplayText = string

export const BreadcrumbBar: React.FC<{crumbs: [LinkString, DisplayText][]}> = ({crumbs}) => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {
          crumbs.map((crumb, ci) => (
            <Fragment key={'crumb-' + ci}>
              <Link key={crumb[0]} href={crumb[0]}><a>{crumb[1]}</a></Link>
              {ci < crumbs.length - 1 ? <span className={classes.crumbArrow}>&gt;</span> : <></>}
            </Fragment>
          ))
        }
      </div>
    </div>
  );
}
;
