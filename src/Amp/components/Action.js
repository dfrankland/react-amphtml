import React from 'react';
import PropTypes from 'prop-types';

export const ON_ATTRIBUTE = ' on';

const Action = ({ children, events, ...props }) => {
  const eventString = Object.keys(events).reduce(
    (entireEventString, nextEventName, eventIndex) => {
      const actionString = events[nextEventName].reduce(
        (entireActionString, nextAction, actionIndex) => (
          `${entireActionString}${actionIndex > 0 ? ',' : ''}${nextAction}`
        ),
        '',
      );

      return `${entireEventString}${eventIndex > 0 ? ';' : ''}${nextEventName}:${actionString}`;
    },
    '',
  );

  return React.cloneElement(
    children,
    {
      ...props,
      // `' on'` is used here as a hack to get React to render the `on`
      // attribute on the element
      [ON_ATTRIBUTE]: eventString,
    },
  );
};

Action.propTypes = {
  children: PropTypes.element.isRequired,
  events: PropTypes.objectOf((
    PropTypes.arrayOf(PropTypes.string)
  )).isRequired,
};

export default Action;
