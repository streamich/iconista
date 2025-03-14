import React from 'react';
import {getUrl as getUrlDefault} from './getUrl';
import {Icon} from './types';
import useRefMounted from 'react-use/lib/useRefMounted';

const {useEffect, useState, useRef} = React;
const cache: {[key: string]: Document} = {};

export type Props = Icon &
  React.SVGAttributes<any> & {
    getUrl?: (icon: Icon) => string;
  };

const Svg: React.FC<Props> = ({set, icon, getUrl = getUrlDefault, ...rest}) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const refMounted = useRefMounted();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    const applyDoc = (doc: Document) => {
      const el = ref.current;
      if (!el) return;

      const svg = (doc as any).getRootNode().childNodes[0] as SVGSVGElement;
      const {childNodes} = svg;

      // Set SVG child nodes.
      for (let i = 0; i < childNodes.length; i++) el.appendChild(childNodes[i].cloneNode(true));

      // Set SVG attributes.
      for (let i = 0; i < svg.attributes.length; i++) {
        const {name, value} = svg.attributes[i];
        el.setAttribute(name, value);
      }
    };

    const key = `${set}:${icon}`;
    if (cache[key]) applyDoc(cache[key]);
    else {
      const url = getUrl({set, icon} as Icon);
      fetch(url, {cache: 'force-cache'})
        .then(r => r.text())
        .then(text => {
          if (!refMounted.current) return;
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'application/xml');
          applyDoc((cache[key] = doc));
        })
        .catch((error) => {
          if (!refMounted.current) return;
          setError(error);
        });
    }
  }, [set, icon]);

  if (error) {
    const url = getUrl({set, icon} as Icon);
    return <img {...rest} src={url} title={error.message} />;
  }

  return <svg ref={ref} {...rest} />;
};

export default Svg;
