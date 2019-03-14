import * as React from 'react';
import {getUrl} from './getUrl';
import {Icon} from './types';

const Img: React.SFC<Icon> = (props) => {
  return (
    <img src={getUrl(props)} />
  );
};

export {
  getUrl,
  Img,
};

export default Img;
