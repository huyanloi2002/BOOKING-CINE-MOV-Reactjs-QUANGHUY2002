import actionTypes from './actionTypes';
import {
    getAllFilms,
    createNewFilmService,
    deleteFilmService,
    editFilmService,
    getAllCodeService,
    getTopFilms,
    saveInforFilmService,
    saveBannerFilmService,
    getAllBannerFilms,
    getAllNews,
    createNews,
    deleteNews,
    editNews, getTopNews
} from '../../services/filmService'
import { toast } from 'react-toastify';
import { displayPartsToString } from 'typescript';

export const fetchGenreStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENRE_START
            })
            let res = await getAllCodeService("GENRE");
            if (res && res.errCode === 0) {
                dispatch(fetchGenreSuccess(res.data));
            }
            else {
                dispatch(fetchGenreFail());
            }
        } catch (e) {
            dispatch(fetchGenreFail());
        }
    }
}
export const fetchGenreSuccess = (genreData) => ({
    type: actionTypes.FETCH_GENRE_SUCCESS,
    data: genreData
})
export const fetchGenreFail = () => ({
    type: actionTypes.FETCH_GENRE_FAIL
})
export const fetchShowStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("SHOW");
            if (res && res.errCode === 0) {
                dispatch(fetchShowSuccess(res.data));
            }
            else {
                dispatch(fetchShowFail());
            }
        } catch (e) {
            dispatch(fetchShowFail());
        }
    }
}
export const fetchShowSuccess = (showData) => ({
    type: actionTypes.FETCH_SHOW_SUCCESS,
    data: showData
})
export const fetchShowFail = () => ({
    type: actionTypes.FETCH_SHOW_FAIL
})
export const createNewFilm = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewFilmService(data);

            if (res && res.errCode === 0) {
                toast.success(" 🦄 Create a new film succeed !")
                dispatch(saveFilmSuccess());
                dispatch(fetchAllFilms());

            }
            else {
                toast.error("Create a new film error !")
                dispatch(saveFilmFail());
            }
        } catch (e) {
            toast.error("Create a new film error !")
            dispatch(saveFilmFail());
        }
    }
}
export const saveFilmSuccess = () => ({
    type: actionTypes.CREATE_FILM_SUCESS
})
export const saveFilmFail = () => ({
    type: actionTypes.CREATE_FILM_FAIL
})
export const fetchAllFilms = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllFilms();
            console.log('res film', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_FILMS_SUCCESS,
                    dataAllFilms: res.data,

                });
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_FILMS_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_FILMS_FAIL: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_FILMS_FAIL,
            })
        }
    }
}
export const deleteAFilm = (filmId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteFilmService(filmId);
            if (res && res.errCode === 0) {
                toast.success("   🦄 Delete the film succeed !")
                dispatch(deleteFilmSuccess());
                dispatch(fetchAllFilms());

            }
            else {
                toast.error("Delete the film error !")
                dispatch(deleteFilmFail());
            }
        } catch (e) {
            toast.error("Delete the film error !")
            dispatch(deleteFilmFail());
        }
    }
}
export const deleteFilmSuccess = () => ({
    type: actionTypes.DELETE_FILM_SUCCESS,
})
export const deleteFilmFail = () => ({
    type: actionTypes.DELETE_FILM_FAIL,

})
export const editAFilm = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editFilmService(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Update the film succeed !")
                dispatch(editFilmSuccess());
                dispatch(fetchAllFilms());
            }
            else {
                toast.error("Update the film error !")
                dispatch(editFilmFail());
            }
        } catch (e) {
            toast.error("Update the film error !")
            dispatch(editFilmFail());
        }
    }
}
export const editFilmSuccess = () => ({
    type: actionTypes.EDIT_FILM_SUCESS,
})
export const editFilmFail = () => ({
    type: actionTypes.EDIT_FILM_FAIL,

})
export const fetchTopFilms = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopFilms('6');
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_FILMS_SUCCESS,
                    dataFilms: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_FILMS_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_FILMS_FAIL', e)
            dispatch({
                type: actionTypes.FETCH_TOP_FILMS_FAIL,
            })
        }
    }
}
export const saveInforFilm = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInforFilmService(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Save infor film succeed !")
                dispatch({
                    type: actionTypes.SAVE_INFOR_FILM_SUCESS,
                })
            } else {
                toast.error(" 🦄 Save infor film error !")
                dispatch({
                    type: actionTypes.SAVE_INFOR_FILM_FAIL,
                })
            }
        } catch (e) {
            toast.error(" 🦄 Save infor film errorsss !")
            console.log('SAVE_INFOR_FILM_FAIL', e)
            dispatch({
                type: actionTypes.SAVE_INFOR_FILM_FAIL,
            })
        }
    }
}
export const saveBannerFilms = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveBannerFilmService(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Save banner film succeed !")
                dispatch({
                    type: actionTypes.SAVE_BANNER_FILM_SUCESS,
                })
            } else {
                toast.error(" 🦄 Save banner film error !")
                dispatch({
                    type: actionTypes.SAVE_BANNER_FILM_FAIL,
                })
            }
        } catch (e) {
            toast.error(" 🦄 Save banner film errorsss !")
            console.log('SAVE_BANNER_FILM_FAIL', e)
            dispatch({
                type: actionTypes.SAVE_BANNER_FILM_FAIL,
            })
        }
    }
}
export const fetchBannerFilm = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllBannerFilms('4')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_BANNER_FILMS_SUCCESS,
                    dataBanner: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_BANNER_FILMS_FAIL
                })
            }

        } catch (e) {
            console(e)
            dispatch({
                type: actionTypes.FETCH_BANNER_FILMS_FAIL
            })
        }
    }

}
//news
export const fecthTopNews = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopNews('8')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_NEWS_SUCCESS,
                    dataTopNews: res.data
                });
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_NEWS_FAIL
                })
            }

        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_TOP_NEWS_FAIL
            })
        }
    }
}
export const fetchAllNews = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllNews();
            console.log('res new', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_NEWS_SUCCESS,
                    dataAllNews: res.data,

                });
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_NEWS_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_NEWS_FAIL: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_NEWS_FAIL,
            })
        }
    }
}
export const createNewsAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNews(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Create news succeed !")
                dispatch({
                    type: actionTypes.CREATE_NEWS_SUCESS
                });
                dispatch(fetchAllNews())
            } else {
                toast.error(" 🦄 Create news error !")
                dispatch({
                    type: actionTypes.CREATE_NEWS_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Create news error !")
            dispatch({
                type: actionTypes.CREATE_NEWS_FAIL
            })
        }
    }
}
export const editNewsAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editNews(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Save news succeed !")
                dispatch({
                    type: actionTypes.EDIT_NEWS_SUCESS
                });
                dispatch(fetchAllNews())
            } else {
                toast.error(" 🦄 Save news error !")
                dispatch({
                    type: actionTypes.EDIT_NEWS_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Save news error !")
            dispatch({
                type: actionTypes.EDIT_NEWS_FAIL
            })
        }
    }
}
export const deleteNewsAction = (newsId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteNews(newsId)
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Delete news succeed !")
                dispatch({
                    type: actionTypes.DELETE_NEWS_SUCCESS
                });
                dispatch(fetchAllNews())
            } else {
                toast.error(" 🦄 Delete news error !")
                dispatch({
                    type: actionTypes.DELETE_NEWS_FAIL
                });
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Delete news error !")
            dispatch({
                type: actionTypes.DELETE_NEWS_FAIL
            });
        }
    }
}