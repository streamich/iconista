import {Icon} from './types';

export const getUrl = ({set, icon}: Icon): string => {
  return `https://unpkg.com/katex@latest/sets/${set}/${icon}.svg`;
};

export default getUrl;
