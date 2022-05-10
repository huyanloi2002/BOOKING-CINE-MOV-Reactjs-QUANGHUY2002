import axios from "../axios";
const getAllFilms = () => {
    return axios.get(`/api/get-all-films`)
}
const createNewFilmService = (data) => {
    return axios.post('/api/create-new-film', data)
}
const deleteFilmService = (FilmId) => {
    return axios.delete('/api/delete-film', { data: { id: FilmId } })
}
const editFilmService = (inputData) => {
    return axios.put('/api/edit-film', inputData);
}
const getAllCodeService = (inputdata) => {
    return axios.get(`/api/allcode?type=${inputdata}`);
}
const getTopFilms = (limit) => {
    return axios.get(`/api/get-top-films?limit=${limit}`)
}
const saveInforFilmService = (data) => {
    return axios.post('/api/save-infor-film', data)
}
const getInforFilm = (inputId) => {
    return axios.get(`/api/get-infor-film-by-id?id=${inputId}`)
}
const getMarkdownFilm = (filmId) => {
    return axios.get(`/api/get-markdown-infor-film?filmId=${filmId}`)
}
const getBannerFilm = (filmId) => {
    return axios.get(`/api/get-banner?filmId=${filmId}`)
}
const saveBannerFilmService = (data) => {
    return axios.post('/api/save-banner', data)
}
const getAllBannerFilms = (limit) => {
    return axios.get(`/api/get-all-banners?limit=${limit}`)
}
//news
const getAllNews = () => {
    return axios.get(`/api/get-all-news`)
}
const createNews = (data) => {
    return axios.post('/api/create-news', data)
}
const deleteNews = (NewsId) => {
    return axios.delete('/api/delete-news', { data: { id: NewsId } })
}
const editNews = (inputData) => {
    return axios.put('/api/edit-news', inputData);
}
const getTopNews = (limit) => {
    return axios.get(`/api/get-top-news?limit=${limit}`)

}
export {
    getAllFilms,
    createNewFilmService,
    deleteFilmService,
    editFilmService,
    getAllCodeService,
    getTopFilms,
    saveInforFilmService,
    getInforFilm,
    getMarkdownFilm,
    getBannerFilm,
    saveBannerFilmService,
    getAllBannerFilms,
    getAllNews,
    createNews,
    deleteNews,
    editNews,
    getTopNews
}
