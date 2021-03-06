import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

export const ON_ATTRIBUTE = 'on';

export interface ActionOnProps {
  [ON_ATTRIBUTE]: string;
}

export interface ActionProps {
  children: (props: ActionOnProps) => ReactElement;
  events: {
    [eventName: string]: string[];
  };
}

const Action: React.FunctionComponent<ActionProps> = ({
  children,
  events,
}: ActionProps): ReactElement => {
  const eventString = Object.entries(events).reduce(
    (
      entireEventString: string,
      [eventName, eventActions]: [string, string[]],
      eventIndex: number,
    ): string => {
      const actionString = eventActions.reduce(
        (
          entireActionString: string,
          nextAction: string,
          actionIndex: number,
        ): string =>
          `${entireActionString}${actionIndex > 0 ? ',' : ''}${nextAction}`,
        '',
      );

      return `${entireEventString}${
        eventIndex > 0 ? ';' : ''
      }${eventName}:${actionString}`;
    },
    '',
  );

  return children({ [ON_ATTRIBUTE]: eventString });
};

Action.propTypes = {
  children: PropTypes.func.isRequired,
  events: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  ).isRequired,
};

export default Action;
