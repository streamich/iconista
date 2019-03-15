import {Icon} from './types';

export const getUrl = ({set, icon}: Icon): string => {
  return `https://unpkg.com/iconista@1/sets/${set}/${icon}.svg`;
};
