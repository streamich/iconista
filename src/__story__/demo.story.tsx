import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Svg} from '..';
import {rule} from 'p4-css';
import PreviewSet from './PreviewSet';
const sets = require('../../sets');

const className = rule({
  svg: {
    fill: 'tomato',
  },
});

let stories = storiesOf('Icon sets', module);

for (const set of sets) {
  const icons = require('../../sets/' + set);
  stories = stories.add(set, () => <PreviewSet set={set} icons={icons} />);
}

storiesOf('Tests', module)
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
  });
