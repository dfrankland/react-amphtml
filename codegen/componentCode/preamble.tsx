/* eslint-disable @typescript-eslint/no-unused-vars, import/no-unresolved, import/extensions */

// TODO: Remove `{ Component }` when Rollup fixes its code splitting.
// Currently, this fixes an `React__default is undefined` error.
// @ts-ignore
import React, { Component, ReactNode } from 'react';
// @ts-ignore
import PropTypes from 'prop-types';

// These are relative to the `src/amphtml/amphtml.js` file
// @ts-ignore
import { CONTEXT_KEY } from '../constants';
// @ts-ignore
import contextHelper from '../lib/contextHelper';

interface Props {
  [prop: string]: any;
}

// React does not transform `className` to `class` on Web Components
// like `amp-*`. This is mostly here as a convenience.
// https://reactjs.org/docs/web-components.html#using-web-components-in-react
//
// @ts-ignore
const propsHelper = <T extends {}>(props: Props, additionalProps: T): any => {
  const newProps = Object.assign({}, props, additionalProps);

  if (newProps.className) {
    const { className: _, ...resetProps } = newProps;
    return Object.assign({}, resetProps, { class: props.className });
  }

  return newProps;
};
