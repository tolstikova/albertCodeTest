import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers, {RootState} from './reducers';

const configure = (rootReducer: RootState) => () => {
    /* ------------- Redux Configuration ------------- */

    const middleware = [];
    const enhancers = [];

    middleware.push(thunk);

    /* ------------- Assemble Middleware ------------- */

    enhancers.push(applyMiddleware(...middleware));

    return createStore(rootReducer, {}, compose(...enhancers));
};

export default configure(reducers);
