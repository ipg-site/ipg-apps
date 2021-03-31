import {NextPage} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import {BigHeader} from '../components/BigHeader';
import {SectionHeader} from '../components/SectionHeader';
import classes from '../styles/index.module.scss';

const Index: NextPage<{}> = () => {
  return (
    <div>
      <Head>
        <title>
          第15回関東学生研究論文講演会
        </title>
        <meta content="一般社団法人日本光学会 情報フォトニクス研究グループが主催する第15回関東学生研究論文講演会の公式サイトです。今年度の大会はZoomでのオンライン開催を予定しています。" name="description" />
        <meta charSet="utf-8" />
        <meta property="og:title" content="第15回関東学生研究論文講演会" />
        <meta property="og:description" content="一般社団法人日本光学会 情報フォトニクス研究グループが主催する第15回関東学生研究論文講演会の公式サイトです。" />
        <meta property="og:type" content="" />
        <meta property="og:url" content="https://ipg-site.github.io/" />
        <meta property="og:image" content="https://ipg-site.github.io/imgs/thumbnail_big.png" />
        <meta property="og:site_name" content="第15回関東学生研究論文講演会" />
        <meta property="og:locale" content="ja_JP" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="keywords" content="関東学生研究論文講演会,情報フォトニクス研究グループ,日本光学会"></meta>
      </Head>
      <BigHeader>
        <Link href="/login"><a className={classes.bigHeaderLink}>発表者・聴講者ログイン</a></Link>
      </BigHeader>
      <div className={classes.root}>
        <div className={classes.container}>
          <SectionHeader>主催</SectionHeader>
          <p>
            一般社団法人日本光学会 情報フォトニクス研究グループ
          </p>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          <SectionHeader>趣旨</SectionHeader>
          <p>
            研究活動を行っている学生にとっては，自身の研究の価値を他人に対してできるだけ分かりやすく説明する能力が，全国的な学術会議や学会の年次大会における研究発表において重要になる．研究活動以外に視野を広げると，他人に対して自分自身をプレゼンテーションしてアピールすること，いわゆるセルフプロモーションは，社会における様々な場面において求められる能力である．
          </p>
          <p>
            そこで，セルフプロモーション力を向上させる機会を兼ねて，学会発表を志す学部学生の登竜門として，関東方面の大学における学生を対象とした研究論文講演会を開催する．本講演会は，当日の進行や運営を学生諸氏に任せることで，参加学生が自由に発言，議論しやすい環境を提供する．これにより，研究内容のディスカッションを通じた学生間の人的ネットワーク構築を促すとともに，情報フォトニクス分野の次代を担う若手研究者の育成を促進する効果も期待できる．
          </p>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          <SectionHeader>日時</SectionHeader>
          <p>
            2021年3月9日（火）10:00-17:30（時間は変更の可能性あり）
          </p>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          <SectionHeader>場所</SectionHeader>
          <p>
            Zoomによるオンライン開催
          </p>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          <SectionHeader>発表形式</SectionHeader>
          <p>
            各研究室につきオーラル発表者1名，その他の方はポスター発表.
          </p>
          <p>
            優れた講演には優秀講演賞を贈呈予定．
          </p>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          <SectionHeader>登壇資格</SectionHeader>
          <p>
            指導教員が情報フォトニクス研究グループの会員であること．
          </p>
          <p>
            今年はオンライン開催のため，関東方面の大学だけでなく，東日本の大学から広く登壇を募集します．
          </p>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          <SectionHeader>講演・聴講申込</SectionHeader>
          <p>
            電子メールにて参加される方の情報（下記の1～8）をご連絡ください．
          </p>
          <p>
            申込締切：2021年2月23日（火）17:00<br />
            1. 氏名<br />
            2. 役職または学年<br />
            3. 所属先<br />
            4. 所属先住所<br />
            5. メールアドレス<br />
            6. 聴講または登壇（登壇者は7, 8を回答）<br />
            7. 講演題目<br />
            8. 発表形式（オーラルまたはポスター）<br />
          </p>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          <SectionHeader>原稿提出（オーラル発表）</SectionHeader>
          <p>
            Webサイト（2/24にご案内します）から以下のファイルをご提出ください．<br />
            提出締切：2021年3月2日（火）17:00
          </p>
          <p>
            <a rel="noreferrer" href="http://www.i-photonics.jp/meetings/template/20210302IPGEgakusei.docx" target="_blank">原稿ファイル</a>（PDF形式）<br />
            <a rel="noreferrer" href="http://www.i-photonics.jp/meetings/template/20210302IPGEConsentForm.pdf" target="_blank">著作権譲渡同意書 </a>（自著のうえスキャンしたPDF形式データ）<br />
          </p>
          <SectionHeader>原稿提出（ポスター発表）</SectionHeader>
          <p>
            Webサイト（2/24にご案内します）から以下のファイルをご提出ください．<br />
            提出締切：2021年3月2日（火）17:00
          </p>
          <p>
            <a rel="noreferrer" href="http://www.i-photonics.jp/meetings/template/20210302IPGEgakusei.docx" target="_blank">原稿ファイル</a>（PDF形式）<br />
            <a rel="noreferrer" href="http://www.i-photonics.jp/meetings/template/20210302IPGEConsentForm.pdf" target="_blank">著作権譲渡同意書 </a>（自著のうえスキャンしたPDF形式データ）<br />
            ショートプレゼン動画（45秒程度）
          </p>
          <SectionHeader>ポスター発表資料</SectionHeader>
          <p>
            ポスター発表者はWebサイト（2/24にご案内します）から発表資料をご提出ください．<br />
            発表資料は発表当日にWebサイト上で閲覧できるようにします．<br />
            提出締切：2021年3月8日（月）18:00
          </p>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          <SectionHeader>参加費</SectionHeader>
          <p>
            無料
          </p>
          <SectionHeader>申込・問合せ先</SectionHeader>
          <p>
            児玉 周太朗（電気通信大学 情報理工学研究科）<br />
            メールアドレス: <a href="mailto:k1933052@edu.cc.uec.ac.jp">k1933052@edu.cc.uec.ac.jp</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
