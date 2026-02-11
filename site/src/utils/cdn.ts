const ICONISTA_VERSION = '2';
const CDN_BASE = `https://cdn.jsdelivr.net/npm/iconista@${ICONISTA_VERSION}/sets`;

export function getIconUrl(set: string, icon: string): string {
  return `${CDN_BASE}/${set}/${icon}.svg`;
}

export function getCdnUrl(set: string, icon: string): string {
  return `https://cdn.jsdelivr.net/npm/iconista@${ICONISTA_VERSION}/sets/${set}/${icon}.svg`;
}

export function getReactCode(set: string, icon: string): string {
  return `import Icon from 'iconista';

<Icon set="${set}" icon="${icon}" width={24} height={24} />`;
}

export function getImgTagCode(set: string, icon: string): string {
  const url = getCdnUrl(set, icon);
  return `<img src="${url}" alt="${icon}" width="24" height="24" />`;
}
