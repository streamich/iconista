import * as React from 'react';
import {Icon} from '../types';
import Svg from '..';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  set: {
    width: '100%',
    overflow: 'hidden',
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
      border: '1px solid rgba(0,0,0,.1)',
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
    <Tooltip title={icon} placement="top">
      <div style={styles.block}>
        <Svg style={styles.svg} set={set as any} icon={icon as any} />
      </div>
    </Tooltip>
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
