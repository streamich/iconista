import {Icon} from './types';

export const getUrl = ({set, icon}: Icon): string => {
  return `https://unpkg.com/iconista@latest/sets/${set}/${icon}.svg`;
};
