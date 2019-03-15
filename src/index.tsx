import * as React from 'react';
import {getUrl} from './getUrl';
import {Icon} from './types';
import useRefMounted from 'react-use/lib/useRefMounted';

const {useEffect, useState, useRef} = React;

const Svg: React.FunctionComponent<Icon> = (props) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const refMounted = useRefMounted();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    const url = getUrl(props);
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (!refMounted.current) return;
      const {readyState, status, responseXML: doc} = req;
      if (readyState !== 4) return;
      if (status !== 200) return setError(new Error(`SVG loading HTTP ${status} error: ${url}`));
      if (!doc!) return setError(new Error(`Could not load SVG Document: ${url}`));

      const el = ref.current;
      if (!el) return;

      const svg = doc!.getRootNode().childNodes[0] as SVGSVGElement;

      // Set SVG child nodes.
      while (svg.childNodes.length > 0) el.appendChild(svg.childNodes[0]);

      // Set SVG attributes.
      for (let i = 0; i < svg.attributes.length; i++) {
        const {name, value} = svg.attributes[i];
        el.setAttribute(name, value);
      }
    };
    req.open('GET', url, true);
    req.send();
  }, [props.set, props.icon]);

  if (error) {
    const url = getUrl(props);
    return <img src={url} title={error.message} />;
  }

  return <svg ref={ref} />;
};

export {getUrl, Svg};
export default Svg;
