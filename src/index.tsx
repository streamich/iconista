import * as React from 'react';
import {getUrl} from './getUrl';
import {Icon} from './types';

const Img: React.SFC<React.ImgHTMLAttributes<any> & Icon> = ({set, icon, ...rest}) => {
  return (
    <img {...rest} src={getUrl({set, icon} as Icon)} />
  );
};

export {
  getUrl,
  Img,
};

export default Img;
