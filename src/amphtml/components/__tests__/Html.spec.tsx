import * as React from 'react';
import { shallow } from 'enzyme';
import Html from '../Html';

describe('Html', (): void => {
  it("doesn't set the `format` attribute if it isn't given", (): void => {
    // Use `shallow` here since `html` tags can't really be mounted
    const wrapper = shallow(
      <Html
        // @ts-ignore
        format={null}
      >
        <body>
          <h1>Hello, world!</h1>
        </body>
      </Html>,
    );
    ['amp', 'amp4ads', 'amp4email'].forEach(
      (format): void => {
        expect(wrapper.find(`html[format="${format}"]`).length).toBe(0);
      },
    );
  });
});
