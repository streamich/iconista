import * as React from 'react';
import {Icon} from '../types';
import {Props} from '..';
import Tooltip from '@material-ui/core/Tooltip';
import {HoverSensor} from 'libreact/lib/HoverSensor';
import copy from 'copy-to-clipboard';
import {SnackbarProvider, withSnackbar} from 'notistack';
import {getUrl} from '../getUrl';

const styles = {
  set: {
    width: '100%',
    overflow: 'hidden',
    padding: '30px 50px 100px',
    boxSizing: 'border-box',
  } as React.CSSProperties,
};

const PreviewIcon: React.FC<Icon & {size?: number; enqueueSnackbar: (text: any) => void}> = ({
  set,
  icon,
  size = 24,
  enqueueSnackbar,
}) => {
  const styles: {[name: string]: React.CSSProperties} = {
    block: {
      float: 'left',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: size * 1.62,
      height: size * 1.62,
      borderRadius: `${size * 0.16}px`,
      textAlign: 'center',
      boxSizing: 'border-box',
      margin: `${size * 0.2}px`,
      cursor: 'pointer',
    },
    svg: {
      width: size,
      height: size,
    },
  };

  const onClick = () => {
    const text = `<Svg set="${set}" icon="${icon}" />`;
    copy(text);
    enqueueSnackbar(
      <div style={{textAlign: 'center', width: '300px'}}>
        Copied <code style={{fontSize: '14px', color: '#EC5785'}}>{icon}</code>
      </div>,
    );
  };

  return (
    <HoverSensor>
      {({isHover}) => (
        <div style={{...styles.block, border: `1px solid rgba(0,0,0,.${isHover ? 2 : 1})`}} onClick={onClick}>
          <Tooltip title={icon} placement="top">
            <img style={styles.svg} src={getUrl({set: set as any, icon: icon as any})} />
          </Tooltip>
        </div>
      )}
    </HoverSensor>
  );
};

const PreviewIconWithSnackbar = withSnackbar(PreviewIcon as any) as any;

export interface PreviewSetProps {
  set: Props['set'];
  icons: string[];
}

const PreviewSet: React.FC<PreviewSetProps> = ({set, icons}) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      transitionDuration={{exit: 300, enter: 150}}
      anchorOrigin={{horizontal: 'center', vertical: 'top'}}
    >
      <div style={styles.set}>
        {icons.map((icon) => (
          <PreviewIconWithSnackbar set={set as any} icon={icon as any} />
        ))}
      </div>
    </SnackbarProvider>
  );
};

export default PreviewSet;
