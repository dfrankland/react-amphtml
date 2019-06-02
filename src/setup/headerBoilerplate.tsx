/* eslint-disable react/no-danger */
import React, { ReactElement } from 'react';

const key = (suffix: string): string =>
  `react-amphtml-header-boilerplate-${suffix}`;

export default (href: string): ReactElement[] => [
  <meta key={key('meta-charset')} charSet="utf-8" />,
  <meta
    key={key('meta-viewport')}
    name="viewport"
    content="width=device-width,minimum-scale=1,initial-scale=1"
  />,
  <link key={key('canonical-link')} rel="canonical" href={href} />,
  <style
    key={key('style')}
    amp-boilerplate=""
    dangerouslySetInnerHTML={{
      __html: `
          body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
        `,
    }}
  />,
  <noscript key={key('noscript')}>
    <style
      amp-boilerplate=""
      dangerouslySetInnerHTML={{
        __html: `
            body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}
          `,
      }}
    />
  </noscript>,
];
