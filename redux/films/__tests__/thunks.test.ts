import { getFilmsList, getCharacters, getSpecies, GET_FILMS} from '../thunks';
import filmsSlice from '../reducers';

const { actions } = filmsSlice;

describe('getFilmsList', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({}),
        })
    );

    beforeEach(() => {
        fetch.mockClear();
    });
    const getStateMock = jest.fn(() => state);
    const dispatchMock = jest.fn();
    actions.setFilms = jest.fn();

    it('getFilmsList ', async () => {
        const lambda = getFilmsList();
        await lambda(dispatchMock, getStateMock);
        expect(global.fetch).toHaveBeenCalledWith(GET_FILMS);
        expect(actions.setFilms).toHaveBeenCalled();
    });
});

describe('getCharacters', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({}),
        })
    );

    beforeEach(() => {
        fetch.mockClear();
    });
    const getStateMock = jest.fn(() => state);
    const dispatchMock = jest.fn();

    actions.setCharacters = jest.fn();
    it('getCharacters ', async () => {
        const lambda = getCharacters(['url']);
        await lambda(dispatchMock, getStateMock);
        expect(global.fetch).toHaveBeenCalled();
        expect(actions.setCharacters).toHaveBeenCalled();
    });
});

describe('getSpecies', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({}),
        })
    );

    beforeEach(() => {
        fetch.mockClear();
    });
    const getStateMock = jest.fn(() => state);
    const dispatchMock = jest.fn();

    actions.setSpecies = jest.fn();
    it('getSpecies ', async () => {
        const lambda = getSpecies(['url']);
        await lambda(dispatchMock, getStateMock);
        expect(global.fetch).toHaveBeenCalled();
        expect(actions.setSpecies).toHaveBeenCalled();
    });
});
