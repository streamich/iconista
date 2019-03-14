import * as React from 'react';
import {Icon} from './types';

export const getUrl = ({set, icon}: Icon): string => {
  return `https://unpkg.com/iconista@latest/sets/${set}/${icon}.svg`;
};

// export interface ImgProps extends Icon {}

export const Img: React.SFC<Icon> = (props) => {
  return (
    <img src={getUrl(props)} />
  );
};

export default getUrl;
