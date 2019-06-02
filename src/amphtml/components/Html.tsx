import React, { ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';

export interface HtmlProps {
  children: ReactNode;
  format?: 'amp' | 'amp4ads' | 'amp4email';
  lang?: string;
}

const Html: React.SFC<HtmlProps> = ({
  children,
  format,
  lang,
}): ReactElement => (
  <html {...(format ? { [format]: '' } : {})} lang={lang}>
    {children}
  </html>
);

Html.defaultProps = {
  children: undefined,
  format: 'amp',
  lang: 'en',
};

Html.propTypes = {
  children: PropTypes.node,
  format: PropTypes.oneOf(['amp', 'amp4ads', 'amp4email']),
  lang: PropTypes.string,
};

export default Html;
