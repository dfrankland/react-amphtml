import * as React from 'react';
import { mount } from 'enzyme';
import Script from '../Script';

describe('Script', (): void => {
  it('returns `null` if `src` or if both `extension` and `version` are missing', (): void => {
    const wrapperSrc = mount(<Script src="" />);
    expect(wrapperSrc.find('script').exists()).toBe(false);

    const wrapperExtensionVersion = mount(<Script extension="" version="" />);
    expect(wrapperExtensionVersion.find('script').exists()).toBe(false);
  });
});
