import * as React from 'react';
import {getUrl} from './getUrl';
import {Icon} from './types';
import useRefMounted from 'react-use/lib/useRefMounted';

const {useEffect, useState, useRef} = React;
const cache: {[key: string]: Document} = {};

const Svg: React.FunctionComponent<Icon & React.SVGAttributes<any>> = ({set, icon, ...rest}) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const refMounted = useRefMounted();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    const applyDoc = (doc: Document) => {
      const el = ref.current;
      if (!el) return;

      const svg = doc!.getRootNode().childNodes[0] as SVGSVGElement;
      const {childNodes} = svg;

      // Set SVG child nodes.
      for (let i = 0; i < childNodes.length; i++)
        el.appendChild(childNodes[i].cloneNode(true));

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
      const req = new XMLHttpRequest();
      req.onreadystatechange = () => {
        if (!refMounted.current) return;
        const {readyState, status, responseXML: doc} = req;
        if (readyState !== 4) return;
        if (status !== 200) return setError(new Error(`SVG loading HTTP ${status} error: ${url}`));
        if (!doc!) return setError(new Error(`Could not load SVG Document: ${url}`));
        applyDoc(cache[key] = doc!);
      };
      req.open('GET', url, true);
      req.send();
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
