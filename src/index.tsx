import * as React from 'react';
import {getUrl} from './getUrl';
import {Icon} from './types';
import useRefMounted from 'react-use/lib/useRefMounted';

const {useEffect, useState, useRef} = React;
const cache: {[key: string]: Document} = {};

const loadDoc = (url) =>
  new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      const {readyState, status, responseXML: doc} = req;
      if (readyState !== 4) return;
      if (status !== 200) return reject(new Error(`SVG loading HTTP ${status} error: ${url}`));
      if (!doc!) return reject(new Error(`Could not load SVG Document: ${url}`));
      resolve(doc!);
    };
    req.open('GET', url, true);
    req.send();
  });

const Svg: React.FunctionComponent<Icon & React.SVGAttributes<any>> = ({set, icon, ...rest}) => {
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
      loadDoc(url).then(
        (doc: any) => {
          if (!refMounted.current) return;
          applyDoc((cache[key] = doc!));
        },
        (error) => {
          if (!refMounted.current) return;
          setError(error);
        },
      );
    }
  }, [set, icon]);

  if (error) {
    const url = getUrl({set, icon} as Icon);
    return <img src={url} title={error.message} />;
  }

  return <svg ref={ref} {...rest} />;
};

export {getUrl, Svg};
export default Svg;
