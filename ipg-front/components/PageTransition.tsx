import React, {useContext} from 'react';
import {useTransition, animated} from 'react-spring';

import {withRouter, Router} from 'next/router';

const Context = React.createContext<Router>(null);

const Provider = ({router, children}) => (
  <Context.Provider value={router}>{children}</Context.Provider>
);

const useRouter = () => useContext(Context);
const RouterContextProvider = withRouter(Provider);

const Transition = ({children}) => {
  const router = useRouter();
  const transitions = useTransition(router, (router) => router.pathname, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      position: 'absolute',
      top: 8 + 96,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0,
    },
  });

  return (
    <>
      {transitions.map(({item, props: style, key}) => {
        if (item.components === undefined) {
          return (
            <Page key={key} style={style}>
              {children(item ? {Component: null, pageProps: {}} : {})}
            </Page>
          );
        }
        const {Component, props} = item.components[item.pathname] || {};
        return (
          <Page key={key} style={style}>
            {children(item ? {Component, pageProps: props && props.pageProps} : {})}
          </Page>
        );
      })}
    </>
  );
};

export const PageTransition: React.FC<any> = ({children, ...props}) => {
  return (
    <RouterContextProvider>
      <Transition {...props}>{children}</Transition>
    </RouterContextProvider>
  );
};

const Page = animated.main;
