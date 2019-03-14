import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Img} from '..';

storiesOf('Icon', module)
  .add('Default', () => {
    return (
      <Img set='ibm_16' icon='arrow--down' />
    );
  });
