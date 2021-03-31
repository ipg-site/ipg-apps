import React from 'react';
import Link from 'next/link';
import classes from '../styles/program.module.scss';

export const LeftSide: React.FC<{}> = () => {
  const menuItems = [
    ['/program', '予稿集'],
    ['/program/poster1', 'ポスターセッション①'],
    ['/program/poster2', 'ポスターセッション②'],
  ];
  return (
    <div className={classes.leftSide}>
      {
        menuItems.map((menuItem) => (
          <Link key={menuItem[0]} href={menuItem[0]}>
            <a className={classes.menuItem}>
              {menuItem[1]}
            </a>
          </Link>

        ))
      }
    </div>
  );
}
;
