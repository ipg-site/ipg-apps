import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import {PageTransition} from '../components/PageTransition';
import {AppContextType} from 'next/dist/next-server/lib/utils';
import {Router} from 'next/router';
import '../styles/main.css';
import {AppHeader} from '../components/AppHeader';

class CustomApp extends App {
  static async getInitialProps({Component, ctx}: AppContextType<Router>) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
  }

  render() {
    const {Component: SsrComponent, pageProps: ssrPageProps} = this.props;
    const hiddenAppHeader = this.props.router.route === '/' ? true : false;
    return (
      <div>
        <Head>
          <title>第15回関東学生研究論文講演会</title>
        </Head>
        {hiddenAppHeader ? '' : <AppHeader locale={this.props.router.route}/>}
        <PageTransition>
          {({Component, pageProps}) => {
            return Component ? (
                <Component {...pageProps} />
            ) : (
                <SsrComponent {...ssrPageProps} />
            );
          }}
        </PageTransition>
      </div>
    );
  }
}

export default CustomApp;
