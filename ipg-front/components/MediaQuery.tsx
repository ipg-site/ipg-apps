import React from 'react';
import {useMediaQuery} from 'react-responsive';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '4k';
type Range = 'up' | 'down' | 'between';

const bp = {
  xs: [0, 600],
  sm: [600, 960],
  md: [960, 1280],
  lg: [1280, 1920],
  xl: [1920, 2560],
  fk: [2560, 9999],
};

export const MediaQueryBR: React.FC<{type: Breakpoints, range?: Range}> = ({type, range}) => {
  range = !range ? 'between' : range;
  const mWidth = range === 'up' ? 'min-width' : 'max-width';
  const offset = range === 'up' ? 0 : 1;
  const enable = range === 'between' ?
    useMediaQuery({query: `(min-width: ${bp[type][0]}px) and (max-width: ${bp[type][1]}px)`}) :
    useMediaQuery({query: `(${mWidth}: ${bp[type][offset]}px)`});
  if (enable) {
    return <br />;
  }
  return <></>;
};

export const Hidden: React.FC<{type: Breakpoints, range?: Range}> = ({type, range, children}) => {
  range = !range ? 'between' : range;
  const mWidth = range === 'up' ? 'min-width' : 'max-width';
  const offset = range === 'up' ? 0 : 1;
  const enable = range === 'between' ?
    useMediaQuery({query: `(min-width: ${bp[type][0]}px) and (max-width: ${bp[type][1]}px)`}) :
    useMediaQuery({query: `(${mWidth}: ${bp[type][offset]}px)`});
  if (enable) {
    return <>{children}</>;
  }
  return <></>;
}
;
