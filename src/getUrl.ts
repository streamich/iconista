import {Icon} from './types';

export const getUrl = ({set, icon}: Icon): string => {
  return `https://unpkg.com/iconista@2/sets/${set}/${icon}.svg`;
};
