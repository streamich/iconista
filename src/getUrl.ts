import {Icon} from './types';

export const getUrl = ({set, icon, version = '2'}: Icon): string => {
  return `https://unpkg.com/iconista@${version}/sets/${set}/${icon}.svg`;
};
