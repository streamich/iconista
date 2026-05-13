import * as React from 'react';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type IconMap = Record<string, IconComponent>;

interface Props {
  icons: IconMap;
  size?: number;
}

const ReactPreviewSet: React.FC<Props> = ({icons, size = 24}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px',
    gap: '8px',
    background: '#fff',
  };
  const itemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: size * 4,
    padding: '8px 4px',
    borderRadius: '6px',
    gap: '6px',
    cursor: 'default',
  };
  const labelStyle: React.CSSProperties = {
    fontSize: '9px',
    color: '#555',
    textAlign: 'center',
    wordBreak: 'break-all',
    maxWidth: size * 4,
    lineHeight: 1.2,
  };

  return (
    <div style={containerStyle}>
      {Object.entries(icons).map(([name, Icon]) => (
        <div key={name} style={itemStyle} title={name}>
          <Icon width={size} height={size} />
          <span style={labelStyle}>{name}</span>
        </div>
      ))}
    </div>
  );
};

export default ReactPreviewSet;
