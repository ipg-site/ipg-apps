import React from 'react';
import classes from '../styles/SectionHeader.module.scss';

export const SectionHeader: React.FC<{}> = ({children}) => {
  return (
    <div className={classes.sectionHeader}>
      {children}
    </div>
  );
}
;
