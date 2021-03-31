import React from 'react';
import classes from '../styles/BigHeader.module.scss';
import {AppHeader} from './AppHeader';
import {MediaQueryBR} from './MediaQuery';

export const BigHeader: React.FC<{locale?: string, header?: JSX.Element}> = ({locale, children, header}) => {
  const letterContainerRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const appHeaderRef = React.useRef<HTMLDivElement>(null);
  if (locale) {
    console.debug(locale);
  }
  React.useEffect(() => {
    if ([letterContainerRef.current, containerRef.current, appHeaderRef.current].includes(null)) {
      return;
    }
    const moveContainer = () => {
      const ch = letterContainerRef.current.offsetHeight;
      const offset = 96;
      const wh = containerRef.current.offsetHeight;
      const y = window.scrollY;
      const rr = y / (wh);
      const cy = wh / 2 - ch / 2 + rr * (wh / 2 - ch / 2 - offset);
      letterContainerRef.current.style.top = String(cy) + 'px';

      if (y >= wh - offset) {
        appHeaderRef.current.style.transform = 'translateY(0px)';
      } else {
        appHeaderRef.current.style.transform = 'translateY(-50vh)';
      }
    };
    window.addEventListener('scroll', moveContainer, true);
    moveContainer();
    return () => window.removeEventListener('scroll', moveContainer, true);
  }, [letterContainerRef.current, containerRef.current, appHeaderRef.current]);
  return (
    <>
      <div className={classes.root} ref={containerRef}>
        <div className={classes.headerTitle} ref={letterContainerRef}>
            第15回<br />
            関東学生<MediaQueryBR type="md" range="down" />
            研究論文<br />
            講演会
        </div>
        <div className={classes.childrenContainer}>
          <div className={classes.childrenItem}>
            {children}
          </div>
        </div>
      </div>
      <div ref={appHeaderRef} className={classes.appHeaderContainer}>
        {header ? header : <AppHeader />}
      </div>
    </>
  );
}
;
