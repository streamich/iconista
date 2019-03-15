import * as React from 'react';
import {getUrl} from './getUrl';
import {Icon} from './types';
import usePromise from 'react-use/lib/usePromise';

const {useEffect, useState, useRef} = React;

const loadSvg = (url: string): Promise<Document> => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        const status = req.status;
        if (status === 200) {
          // tslint:disable-next-line
          // console.log(req.responseXML, req.responseText.trim());
          if (req.responseXML) {
            resolve(req.responseXML);
          } else {
            reject(new Error(`Could not load SVG Document: ${url}`));
          }
        } else if (status >= 400) { // request status is error (4xx or 5xx)
          reject(new Error(`SVG loading HTTP ${status} error: ${url}`));
        } else if (status === 0) { // request status 0 can indicate a failed cross-domain call
          reject(new Error(`Could not load SVG cross domain: ${url}`));
        }
      }
    };
    req.open('GET', url, true);
    req.send();
  });
};

const Svg: React.FunctionComponent<Icon> = (props) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const mounted = usePromise();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    const url = getUrl(props);
    mounted<Document>(loadSvg(url))
      .then(doc => {
        const el = ref.current;
        if (!el) return;
        const svg = doc.getRootNode().childNodes[0] as SVGSVGElement;

        // Set SVG child nodes.
        while (svg.childNodes.length > 0) {
          el.appendChild(svg.childNodes[0]);
        }

        // Set SVG attributes.
        for (let i = 0; i < svg.attributes.length; i++) {
          const {name, value} = svg.attributes[i];
          el.setAttribute(name, value);
        }
      })
      .catch(error => {
        // tslint:disable-next-line
        console.error(error);
        setError(error);
      });
  }, [props.set, props.icon]);

  if (error) {
    const url = getUrl(props);
    return <img src={url} />
  }

  return <svg ref={ref} />;
};

export {getUrl, Svg};
export default Svg;
