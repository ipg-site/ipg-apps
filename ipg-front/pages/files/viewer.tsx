import classes from '../../styles/file.module.scss';
import {NextPage} from 'next';
import Router from 'next/router';
import Head from 'next/head';
import React from 'react';
import {getFile, getUniqueFileName, isLoggedIn} from '../../utils/fetch';
import {SectionHeader} from '../../components/SectionHeader';
import * as qs from 'querystring';
import {Button} from '../../components/Input';
import dynamic from 'next/dynamic';
const PdfViewer = dynamic(import( '../../components/PDFViewer'), {ssr: false});


const PdfBox: React.FC<{file: string}> = ({file}) => {
  const [pdfWidth, setWidth] = React.useState(0);
  const [scale, setScale] = React.useState(1.0);
  const [page, setPage] = React.useState(1);
  const [maxPage, setMaxPage] = React.useState(-1);
  React.useEffect(() => {
    setWidth(window.innerWidth > 800 ? 800 : window.innerWidth);
  }, []);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.buttonContainer}>
          <div className={classes.buttonHalf}>
            <Button onAction={() => setPage((c) => c - 1 < 1 ? 1 : c - 1)}>Prev</Button>
          </div>
          <div className={classes.buttonHalf}>
            <Button onAction={() => setPage((c) => maxPage >= 0 && c + 1 > maxPage ? c : c + 1)}>Next</Button>
          </div>
        </div>
      </div>
      <div className={classes.fileContainer}>
        <PdfViewer file={'data:application/pdf;base64,' + file} pageNumber={page} width={pdfWidth} scale={scale} onReachMax={() => {
          setMaxPage(page - 1);
          setPage((c) => c - 1);
        }}/>
      </div>
      <div className={classes.container}>
        <div className={classes.buttonContainer}>
          <div className={classes.buttonHalf}>
            <Button onAction={() => setScale((c) => c / 1.5 <= 1.0 ? 1.0 : c / 1.5)}>Zoom out</Button>
          </div>
          <div className={classes.buttonHalf}>
            <Button onAction={() => setScale((c) => c * 1.5 >= 3.0 ? 3.0 : c * 1.5)}>Zoom in</Button>
          </div>
        </div>
      </div>
    </>
  );
};

const ViewerPage: NextPage<{}> = () => {
  const [file, setFile] = React.useState<string>(null);
  const [status, setStatus] = React.useState<string>('通信中...');
  const [type, setType] = React.useState<'abstract' | 'presentation' | 'movie'>(null);
  React.useEffect(() => {
    isLoggedIn().then(async (x) => {
      if (x === 'NG') {
        Router.push('/login');
        return;
      }
      const query = qs.decode(location.search.slice(1));
      const file = await getFile(query.type as 'abstract' | 'presentation' | 'movie', Number(query.fid));
      setType(query.type as 'abstract' | 'presentation' | 'movie');
      if (file.status === 'NG') {
        setStatus('ファイルが見つかりませんでした。');
        return;
      }
      if (query.type !== 'movie') {
        setFile(file.data);
      } else {
        setFile(file.link);
      }
      const res = await getUniqueFileName(Number(query.fid));
      if (res.status === 'NG') {
        setStatus('ファイル名が不明です');
      }
      setStatus(res.data.fileName);
    });
  }, []);

  if (file === null) {
    return (
      <div className={classes.root}>
        <Head>
          <title>
          第15回関東学生研究論文講演会
          </title>
        </Head>
        <div className={classes.container}>
          <SectionHeader>{status}</SectionHeader>
        </div>
      </div>
    );
  }

  if (type !== 'movie' && type !== null) {
    return (
      <div className={classes.root}>
        <Head>
          <title>
            第15回関東学生研究論文講演会
          </title>
        </Head>
        <div className={classes.container}>
          <SectionHeader>{status}</SectionHeader>
        </div>
        <PdfBox file={file} />
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Head>
        <title>
          第15回関東学生研究論文講演会
        </title>
      </Head>
      <div className={classes.container}>
        <SectionHeader>{status}</SectionHeader>
        <video controlsList="nodownload" src={file} controls autoPlay onContextMenu={(e) => {
          e.preventDefault();
        }} className={classes.video}>
        </video>
      </div>
    </div>
  );
};


export default ViewerPage;
