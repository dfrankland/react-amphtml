import * as React from 'react';
import { mount } from 'enzyme';
import AmpState from '../AmpState';

describe('AmpState', (): void => {
  it('returns a directive with `src` attribute set', (): void => {
    const src = 'test';
    const wrapper = mount(<AmpState src={src} />);
    expect(wrapper.find(`amp-state[src="${src}"]`).exists()).toBe(true);
  });
});
