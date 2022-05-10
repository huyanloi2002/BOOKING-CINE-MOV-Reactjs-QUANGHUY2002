import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGenre: false,
    genre: [],
    topFilms: [],
    allFilms: [],
    allBanner: [],
    show: [],
    allNew: [],
    topNew: []
}

const filmReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENRE_START:
            let copyState = { ...state };
            copyState.isLoadingGenre = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENRE_SUCCESS:
            state.isLoadingGenre = false;
            state.genre = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENRE_FAIL:
            state.isLoadingGenre = false;
            state.genre = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_SHOW_SUCCESS:
            state.show = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_SHOW_FAIL:
            state.show = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_FILMS_SUCCESS:
            state.allFilms = action.dataAllFilms;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_FILMS_FAIL:
            state.allFilms = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_FILMS_SUCCESS:
            state.topFilms = action.dataFilms;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_FILMS_FAIL:
            state.topFilms = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_BANNER_FILMS_SUCCESS:
            state.allBanner = action.dataBanner;
            return {
                ...state,
            }
        case actionTypes.FETCH_BANNER_FILMS_FAIL:
            state.allBanner = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_NEWS_SUCCESS:
            state.allNew = action.dataAllNews;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_NEWS_FAIL:
            state.allNew = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_NEWS_SUCCESS:
            state.topNew = action.dataTopNews;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_NEWS_FAIL:
            state.topNew = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default filmReducer;