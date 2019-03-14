import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Img} from '..';

storiesOf('ibm_16', module)
  .add('arrow--down', () => <Img set='ibm_16' icon='arrow--down' />)
  .add('download', () => <Img set='ibm_16' icon='download' />)
  .add('menu', () => <Img set='ibm_16' icon='menu' />)

storiesOf('ibm_32', module)
  .add('download', () => <Img set='ibm_32' icon='download' />)
  .add('draggable', () => <Img set='ibm_32' icon='draggable' />)
  .add('move', () => <Img set='ibm_32' icon='move' />)