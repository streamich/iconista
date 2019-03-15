import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Svg} from '..';
import {rule} from 'p4-css';

const className = rule({
  svg: {
    fill: 'tomato',
  }
});

storiesOf('elastic', module)
  .add('alert', () => <Svg set="elastic" icon="alert" />)
  .add('arrow_down', () => <Svg set="elastic" icon="arrow_down" />)
  .add('branch', () => <Svg set="elastic" icon="branch" />)
  .add('brush', () => <Svg set="elastic" icon="brush" />);

storiesOf('ibm_16', module)
  .add('arrow--down', () => <Svg set="ibm_16" icon="arrow--down" />)
  .add('download', () => <Svg set="ibm_16" icon="download" />)
  .add('menu', () => <Svg set="ibm_16" icon="menu" />);

storiesOf('ibm_32', module)
  .add('download', () => <Svg set="ibm_32" icon="download" />)
  .add('draggable', () => <Svg set="ibm_32" icon="draggable" />)
  .add('move', () => <Svg set="ibm_32" icon="move" />);

storiesOf('Test', module)
  .add('can apply fill color', () => {
    return (
      <div className={className}>
        <Svg set="ibm_32" icon="download" />
      </div>
    );
  })
  .add('can add attributes [x="10"]', () => {
    return (
      <div className={className}>
        <Svg set="ibm_32" icon="download" x="10" />
      </div>
    );
  })
