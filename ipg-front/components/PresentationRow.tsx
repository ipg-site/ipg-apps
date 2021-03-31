import React from 'react';
import Link from 'next/link';
import {PresentationDTO} from '../../ipg-api-server/src/types/user.types';
import classes from '../styles/program.module.scss';

export const PresentationRow: React.FC<{data: PresentationDTO}> = ({data}) => {
  return (
    <div className={classes.presentationRow}>
      <p>
        {data.presentationId}
      </p>
      <p>
        {data.title}
      </p>
      <p>
        {data.fullName}({data.university})
      </p>
      <p>
        <Link href={'/files/viewer?type=presentation&fid=' + data.fileId}><a>発表・補足資料（PDF）</a></Link>
      </p>
      <p>
        <Link href={'/files/viewer?type=movie&fid=' + data.fileId}><a>ショートプレゼン動画</a></Link>
      </p>
    </div>
  );
}
;
