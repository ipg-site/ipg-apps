import React from 'react';
import Link from 'next/link';
import classes from '../styles/UploadBigButton.module.scss';
import {uploadFile} from '../utils/fetch';

export const UploadBigButton: React.FC<{title: string, verify: boolean, imgSrc?: string, mimeType: 'application/pdf' | 'video/mp4', endpoint: string, filePath: string, onUpload?: (status: 'OK' | 'NG') => void}> = ({title, verify, imgSrc, mimeType, endpoint, filePath, onUpload}) => {
  const fileInputRef = React.useRef<HTMLInputElement>();
  const [localVerify, setVerify] = React.useState(verify);
  const [uploadStatus, setStatus] = React.useState<string>('通信中...');
  React.useEffect(() => {
    setVerify(verify);
    setStatus(verify ? 'アップロードされています' : 'まだアップロードされていません');
  }, [verify]);
  const classRootName = localVerify ? classes.verifyRoot : classes.errorRoot;
  const uploadAction = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const res = await uploadFile(endpoint, event.target.files[0]);
    if (res.status === 'OK') {
      alert('アップロードされました。');
      setStatus('アップロードされています');
      setVerify(true);
      onUpload('OK');
    } else {
      if (res.statusCode === 413) {
        alert('ファイルサイズが大きすぎます。');
      } else if (res.statusCode === 400) {
        alert(res.message);
      } else {
        alert('アップロードに失敗しました。');
      }
      setStatus('アップロードに失敗しました');
      onUpload('NG');
    }
  };
  return (
    <div className={classRootName}>
      <div className={classes.container}>
        <div className={localVerify ? classes.link : ''}>
          <Link href={filePath}>
            <a>
              {title}
            </a>
          </Link>
        </div>
        <div onClick={() => {
          fileInputRef.current.click();
        }}>
          {imgSrc ? (
          <img src={imgSrc} />

            ): ''}
        </div>
        <div>
          <input ref={fileInputRef} type="file" accept={mimeType} onChange={(e) => {
            if (e.target.files.length === 0) {
              return;
            }
            setStatus('アップロード中です...');
            uploadAction(e);
          }}/><br />
          {uploadStatus}</div>
      </div>
    </div>
  );
}
;
