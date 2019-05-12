/* eslint-disable no-console */
import { Format } from '~/engine';

export default function createLogger({
  collapsed = true,
  transformer = state => state,
  mutationTransformer = mut => mut
} = {}) {
  return function logger(store) {
    let prevState = JSON.parse(JSON.stringify(store.state));

    store.subscribe((mutation, state) => {
      if (typeof console === 'undefined') {
        return;
      }
      const nextState = JSON.parse(JSON.stringify(state));
      const time = new Date();
      const formattedTime = ` @ ${Format.date(time, 'HH:mm:ss.SSS')}`;
      const formattedMutation = mutationTransformer(mutation);
      const message = `mutation ${mutation.type}${formattedTime}`;
      const startMessage = collapsed ? console.groupCollapsed : console.group;

      try {
        startMessage.call(console, message);
      } catch (error) {
        console.log(message);
      }

      console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
      console.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
      console.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));

      try {
        console.groupEnd();
      } catch (e) {
        console.log('-- log end --');
      }

      prevState = nextState;
    });
  };
}
