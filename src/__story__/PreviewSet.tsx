import * as React from 'react';
import {Icon} from '../types';
import Svg from '..';
import Tooltip from '@material-ui/core/Tooltip';
import {HoverSensor} from 'libreact/lib/HoverSensor';

const styles = {
  set: {
    width: '100%',
    overflow: 'hidden',
    padding: '30px 50px 100px',
    boxSizing: 'border-box',
  } as React.CSSProperties,
};

const PreviewIcon: React.FC<Icon & {size?: number}> = ({set, icon, size = 24}) => {
  const styles: {[name: string]: React.CSSProperties} = {
    block: {
      float: 'left',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: size * 1.62,
      height: size * 1.62,
      borderRadius: `${size * .16}px`,
      textAlign: 'center',
      boxSizing: 'border-box',
      margin: `${size * .2}px`,
    },
    svg: {
      width: size,
      height: size,
    },
  };

  return (
    <HoverSensor>{({isHover}) =>
      <div style={{...styles.block, border: `1px solid rgba(0,0,0,.${isHover ? 2 : 1})`}}>
        <Tooltip title={icon} placement="top">
          <Svg style={styles.svg} set={set as any} icon={icon as any} />
        </Tooltip>
      </div>
    }</HoverSensor>
  );
};

export interface PreviewSetProps {
  set: string;
  icons: string[];
}

const PreviewSet: React.FC<PreviewSetProps> = ({set, icons}) => {
  return (
    <div style={styles.set}>
      {icons.map(icon => <PreviewIcon set={set as any} icon={icon as any} />)}
    </div>
  );
};

export default PreviewSet;
