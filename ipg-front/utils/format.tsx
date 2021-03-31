import {format} from 'date-fns';
import React from 'react';
import {HistoryDTO} from '../../ipg-api-server/src/types/history.types';

export const getDate = (dt: Date) => {
  return format(dt, 'yyyy-MM-dd');
};

export const getJPDate = (dt: Date) => {
  return format(dt, 'yyyy年MM月dd日');
};


export const getTimestamp = (dt: Date) => {
  return format(dt, 'yyyy-MM-dd HH:mm:ss');
};
export const getJPTimestamp = (dt: Date) => {
  return format(dt, 'yyyy年MM月dd日 HH時mm分ss秒');
};

export const getUserProfileUpdateFormat = (history : HistoryDTO) => {
  return `ユーザー "${history.user.fullName}"(ID: ${history.user.id}) のプロフィールが更新されました。`;
}
;

export const getUserCreateFormat = (history : HistoryDTO) => {
  return `ユーザー "${history.user.fullName}"(ID: ${history.user.id})  が${history.value}を作成しました。`;
}
;

export const getUserDeleteFormat = (history : HistoryDTO) => {
  return `ユーザー "${history.user.fullName}"(ID: ${history.user.id})  が${history.value}を削除しました。`;
}
;

export const getUserResetPasswordFormat = (history : HistoryDTO) => {
  return `ユーザー "${history.user.fullName}"(ID: ${history.user.id})  のパスワードがリセットされました。`;
}
;

export const getUserChangePasswordFormat = (history : HistoryDTO) => {
  return `ユーザー "${history.user.fullName}"(ID: ${history.user.id})  のパスワードが変更されました。`;
}
;

export const getUserLoginFormat = (history : HistoryDTO) => {
  return `ユーザー "${history.user.fullName}"(ID: ${history.user.id})  がログインしました。`;
}
;

export const getUserUploadFormat = (history : HistoryDTO) => {
  const reg = /(.+?)@(.+?)/;
  if (!reg.test(history.value)) {
    return `ユーザー "${history.user.fullName}"(ID: ${history.user.id})  が不明なファイルをアップロードしました。`;
  }
  const match = reg.exec(history.value);
  if (!['abstract', 'consent', 'movie', 'presentation'].includes(match[1])) {
    return `ユーザー "${history.user.fullName}"(ID: ${history.user.id})  が不明なファイルをアップロードしました。`;
  }
  const fileType = {
    'consent': '著作権同意書',
    'movie': 'ショートプレゼン動画',
    'presentation': '発表資料',
    'abstract': '発表予稿',
  };
  return (
    <span>ユーザー {'"'}{history.user.fullName}{'"'}(ID: {history.user.id})  が<a style={{textDecoration: 'underline'}} rel="noreferrer" target="_blank" href={process.env.API_SERVER + '/file/' + match[1] + '/' + history.user.file.id}>{fileType[match[1]]}ファイル</a>をアップロードしました。</span>
  );
}
;

