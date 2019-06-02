// This file is the preamble to `amphtml.js`, it is not run as a part of babel.

/* eslint-disable @typescript-eslint/no-unused-vars, import/no-unresolved, import/extensions */

// TODO: Remove `{ Component }` when Rollup fixes its code splitting.
// Currently, this fixes an `React__default is undefined` error.
// @ts-ignore
import React, { Component, ReactElement } from 'react';
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
// Also, `specName` is only necessary for wrapping components.
// @ts-ignore
const propsHelper = (props: Props, additionalProps: Props): Props => {
  let newProps = Object.assign({}, props, additionalProps);

  delete newProps.specName;

  if (newProps.className) {
    delete newProps.className;

    newProps = Object.assign({}, newProps, { class: props.className });
  }

  return newProps;
};
