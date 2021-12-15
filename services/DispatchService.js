let dispatch;
let state;

export const initDispatch = dispatchFn => {
  dispatch = dispatchFn;
};

export const initState = stateFn => {
  state = stateFn;
};

export const getDispatch = () => dispatch;

export const getState = () => state();

export default {
  dispatch: getDispatch,
  getState,
  send: (action, payload) => dispatch(action(payload)),
};
