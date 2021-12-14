import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Film {
    characters?: String[];
    episode_id?: number;
    release_date?: string;
    species?: String[];
    title?: string;
}

export interface Character {
    name?: string;
    gender?: string;
    species?: String[];
}

export interface Specie {
    name?: string;
    classification?: string;
    designation?: string;
    average_height?: string;
    skin_colors?: string;
    hair_colors?: string;
    eye_colors?: string;
    language?: string;
}

export interface FilmsState {
    films: Film[];
    film: Film;
    characters?: Character[];
    species?: Specie[];
}

export const initialState: FilmsState = {
    films: [],
    film: {},
    characters: [],
    species: [],
};

const films = createSlice({
    name: 'films',
    initialState,
    reducers: {
        resetState: () => initialState,
        setFilms: (state, action: PayloadAction<Film[]>) => {
            state.films = action.payload;
        },
        setSelectedFilm: (state, action: PayloadAction<Film>) => {
            state.film = action.payload;
        },
        setCharacters: (state, action: PayloadAction<Character[]>) => {
            state.characters = action.payload;
        },
        setSpecies: (state, action: PayloadAction<Specie[]>) => {
            state.species = action.payload;
        },
    },
});

export default films;
