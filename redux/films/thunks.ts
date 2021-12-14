import filmsSlice from './reducers';
import {Action, ThunkAction} from '@reduxjs/toolkit';
import {RootState} from '../reducers';

const {actions} = filmsSlice;

type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const GET_FILMS = 'https://swapi.py4e.com/api/films';

export const getFilmsList = (): AppThunk => async (dispatch, getState) => {
    try {
        const result = await fetch(GET_FILMS);
        const data = await result.json();
        dispatch(actions.setFilms(data.results));
    } catch (e) {
        console.warn(e);
    }
};

export const getCharacters = (characters: String[]): AppThunk => async (dispatch, getState) => {
    try {
        const herous = await Promise.all(characters.map(async url => {
            const result = await fetch(url);
            const data = await result.json();
            return data;
        }));
        dispatch(actions.setCharacters(herous.slice(0, 5)));
    } catch (e) {
        console.warn(e);
    }
};

export const getSpecies = (species: String[]): AppThunk => async (dispatch, getState) => {
    try {
        const speciesResult = await Promise.all(species.map(async url => {
            const result = await fetch(url);
            const data = await result.json();
            return data;
        }));
        dispatch(actions.setSpecies(speciesResult.slice(0, 1)));
    } catch (e) {
        console.warn(e);
    }
};

