import {combineReducers} from '@reduxjs/toolkit';
import filmsSlice from './films/reducers';


export interface State {
    films: any;
}

const appReducer = combineReducers({
    films: filmsSlice.reducer,
});

const rootReducer = (state: State | undefined, action: any) => appReducer(state, action);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
