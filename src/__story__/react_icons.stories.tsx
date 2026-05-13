/**
 * Storybook stories for bundled React icon components.
 */

import * as React from 'react';
import ReactPreviewSet from './ReactPreviewSet';
import type {Meta, StoryObj} from '@storybook/react';

import * as VscodeIcons from '../react/vscode';
import * as Auth0Icons from '../react/auth0';
import * as RadixIcons from '../react/radix';

const meta = {
  title: 'React icon components (bundled)',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const vscode: Story = {
  name: 'vscode',
  render: () => <ReactPreviewSet icons={VscodeIcons as any} />,
};

export const auth0: Story = {
  name: 'auth0',
  render: () => <ReactPreviewSet icons={Auth0Icons as any} />,
};

export const radix: Story = {
  name: 'radix',
  render: () => <ReactPreviewSet icons={RadixIcons as any} />,
};

/** Demonstrates that SVG props are forwarded — icons scale and recolor. */
export const props_forwarding: Story = {
  name: 'props forwarding (size + fill)',
  render: () => {
    const {Account, Add, ArrowDown, Edit, Search, Settings} = VscodeIcons;
    const icons = [Account, Add, ArrowDown, Edit, Search, Settings].filter(Boolean);
    const sizes = [16, 24, 32, 48];
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: 24, padding: 24}}>
        {sizes.map((size) => (
          <div key={size} style={{display: 'flex', gap: 16, alignItems: 'center'}}>
            <span style={{width: 40, fontSize: 12, color: '#999'}}>{size}px</span>
            {icons.map((Icon, i) => (
              <Icon
                key={i}
                width={size}
                height={size}
                fill={['#0070f3', '#e00', '#0a0', '#a0a', '#e90', '#06c'][i % 6]}
              />
            ))}
          </div>
        ))}
      </div>
    );
  },
};
