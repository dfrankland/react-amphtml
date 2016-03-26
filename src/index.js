import 'babel-polyfill';
import React from 'react';

const builtins = ['ad', 'img', 'pixel', 'video', 'embed'];
const extensions = [
  'access',
  'accordion',
  'analytics',
  'anim',
  'audio',
  'brid-player',
  'brightcove',
  'carousel',
  'dailymotion',
  'dynamic-css-classes',
  'facebook',
  'fit-text',
  'font',
  'iframe',
  'image-lightbox',
  'instagram',
  'install-serviceworker',
  'lightbox',
  'list',
  'mustache',
  'pinterest',
  'reach-player',
  'soundcloud',
  'springboard-player',
  'twitter',
  'user-notification',
  'vimeo',
  'vine',
  'youtube',
];

const reactAmpHtml = (directive, addScript = () => {}) => {
  const name = `amp-${directive}`;
  const Component = name;
  if (extensions.includes(directive)) {
    const src = `https://cdn.ampproject.org/v0/${name}-0.1.js`;
    addScript({ customElement: name, src });
  } else if (!builtins.includes(directive)) {
    throw new Error(`"${directive}" is not a valid amphtml directive.`);
  }

  return (props) => <Component {...props} />;
};

export default reactAmpHtml;
