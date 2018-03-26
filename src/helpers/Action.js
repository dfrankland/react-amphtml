// TODO: Remove `{ Component }` when Rollup fixes its code splitting.
// Currently, this fixes an `React__default is undefined` error.
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

export const ON_ATTRIBUTE = ' on';

const Action = ({ children: RenderProp, events, ...props }) => {
  const eventString = Object.entries(events).reduce(
    (entireEventString, [eventName, eventActions], eventIndex) => {
      const actionString = eventActions.reduce(
        (entireActionString, nextAction, actionIndex) => (
          `${entireActionString}${actionIndex > 0 ? ',' : ''}${nextAction}`
        ),
        '',
      );

      return `${entireEventString}${eventIndex > 0 ? ';' : ''}${eventName}:${actionString}`;
    },
    '',
  );

  return (
    <RenderProp
      {...{
        ...props,
        // `' on'` is used here as a hack to get React to render the `on`
        // attribute on the element
        [ON_ATTRIBUTE]: eventString,
      }}
    />
  );
};

Action.propTypes = {
  children: PropTypes.func.isRequired,
  events: PropTypes.objectOf((
    PropTypes.arrayOf(PropTypes.string)
  )).isRequired,
};

export default Action;
