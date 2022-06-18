import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar_Infor from '../ChildComponent/Navbar_Infor';
import './NowShowingFilm.scss';
import { getInforFilm } from '../../../../services/filmService';
import { LANGUAGES, CommonUtils } from '../../../../utils'
import * as actions from '../../../../store/actions';
import CustomScrollbars from '../../../../components/CustomScrollbars';
import BookingTime from '../Booking/BookingTime';

class NowShowingFilm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrMoviesNow: [],
            arrMoviesComing: [],
            // currentFilmId: -1,
            // inforDetailFilm: {},
        }
    }
    componentDidMount() {
        this.props.fetchMoviesNowShowingRedux();
        this.props.fetchMoviesComingSoonRedux();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allMoviesNowRedux !== this.props.allMoviesNowRedux) {
            let arrMoviesNows = this.props.allMoviesNowRedux
            this.setState({
                arrMoviesNow: arrMoviesNows,
            })
        }
        if (prevProps.allMoviesComingRdeux !== this.props.allMoviesComingRdeux) {
            let arrMoviesComings = this.props.allMoviesComingRdeux
            this.setState({
                arrMoviesComing: arrMoviesComings,
            })
        }

    }
    // handleClickIdMovies = (idMovies) => {
    //     let { arrMoviesNow } = this.state
    //     if (arrMoviesNow && arrMoviesNow.length > 0) {
    //         arrMoviesNow = arrMoviesNow.map(item =>
    //             idMovies === item.id ? { ...item, id: item.id } : item
    //         )
    //         this.setState({
    //             currentFilmId: idMovies.id,
    //             inforDetailFilm: idMovies
    //         })
    //     }
    // }
    handleViewInforFilm = (film) => {
        if (this.props.history) {
            this.props.history.push(`/inforfilm/${film.id}`)
        }
    }
    handleViewInforFilmComing = () => {
        if (this.props.history) {
            this.props.history.push(`/coming-soon-movie`)
        }
    }
    render() {
        let { arrMoviesNow, arrMoviesComing, currentFilmId } = this.state
        console.log('this.props', this.state)
        let languages = this.props.language
        let top1 = require("../../../../assets/top1.png").default;
        let top2 = require("../../../../assets/top2.png").default;
        let top3 = require("../../../../assets/top3.png").default;
        return (
            <>

                <div className="now-showing-container">
                    <div className="now-showing-content">
                        <Navbar_Infor />
                        <div className="switch-pages ">
                            <div className="switch-pages-content">
                                <div className="title-now">
                                    <span>Phim đang chiếu</span>
                                </div>
                            </div>
                        </div>
                        {/* <BookingTime
                            filmIdFromParent={this.state.currentFilmId}
                            inforDetail={this.state.inforDetailFilm}
                        /> */}
                        <div className="list-movies">
                            <div className="container list-movies-container">
                                <div className="list-now">
                                    {arrMoviesNow && arrMoviesNow.length > 0 && arrMoviesNow.map((item, index) => {
                                        let tops = '';
                                        if (index === 0) {
                                            tops = top1
                                        } else if (index === 1) {
                                            tops = top2
                                        }
                                        else if (index === 2) {
                                            tops = top3
                                        }
                                        else {
                                            tops = ''
                                        }
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer.from(item.image, 'base64').toString('binary');
                                        }
                                        return (
                                            <div className="list-now-content" key={index}
                                            // onClick={() => this.handleClickIdMovies(item)}
                                            >
                                                <div className="top" style={{ backgroundImage: `url(${tops})` }}></div>
                                                <div className="left">
                                                    <div className="content-left">
                                                        <div className="image-movies-now"
                                                            style={{ backgroundImage: `url(${imageBase64})` }}>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right">
                                                    <div className="content-right">
                                                        <div className="up">
                                                            <span>
                                                                {languages === LANGUAGES.VI ? item.nameVi : item.nameEn}
                                                            </span>
                                                        </div>
                                                        <div className="middle">
                                                            <ul>
                                                                <li>
                                                                    <span>Direction: </span>
                                                                    <span>{item.director}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Actor: </span>
                                                                    <span>{item.actor}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Genre: </span>
                                                                    <span>
                                                                        {languages === LANGUAGES.VI ? item.genreData.valueVi : item.genreData.valueEn}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span>Release date: </span>
                                                                    <span>{item.dayShow}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Duration: </span>
                                                                    <span>{item.duration}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Language: </span>
                                                                    <span>{item.language}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="down">
                                                            <button className="btn-booking" onClick={() => this.handleViewInforFilm(item)}>
                                                                <span>Booking</span>
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                                <div className="list-coming">

                                    <div className="list-coming-contents">
                                        <CustomScrollbars style={{ height: '490px' }}>
                                            <div className="title-coming">
                                                <div className="title-content">
                                                    <span>Phim sắp chiếu nổi bật</span>
                                                    <i className="fas fa-angle-double-right"
                                                        onClick={() => this.handleViewInforFilmComing()}
                                                    ></i>
                                                </div>
                                            </div>
                                            {arrMoviesComing && arrMoviesComing.length > 0 && arrMoviesComing.map((item, index) => {
                                                let imageBase64 = '';
                                                if (item.image) {
                                                    imageBase64 = new Buffer.from(item.image, 'base64').toString('binary');
                                                }
                                                return (
                                                    <div className="list-coming-content" key={index} >
                                                        <div className="left">
                                                            <div className="content-left">
                                                                <div className="image-movies-coming" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="right">
                                                            <div className="content-right">
                                                                <div className="up"><span>{languages === LANGUAGES.VI ? item.nameVi : item.nameEn}</span></div>
                                                                <div className="middle">
                                                                    <ul>
                                                                        <li>
                                                                            <span>Direction: </span>
                                                                            <span>{item.director}</span>
                                                                        </li>
                                                                        <li>
                                                                            <span>Actor: </span>
                                                                            <span>{item.actor}</span>
                                                                        </li>
                                                                        <li>
                                                                            <span>Genre: </span>
                                                                            <span>
                                                                                {languages === LANGUAGES.VI ? item.genreData.valueVi : item.genreData.valueEn}
                                                                            </span>
                                                                        </li>
                                                                        <li>
                                                                            <span>Release date: </span>
                                                                            <span>{item.dayShow}</span>
                                                                        </li>
                                                                        <li>
                                                                            <span>Duration: </span>
                                                                            <span>{item.duration}</span>
                                                                        </li>
                                                                        <li>
                                                                            <span>Language: </span>
                                                                            <span>{item.language}</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="down">
                                                                    <button className="btn-booking" onClick={() => this.handleViewInforFilm(item)}>
                                                                        <span>Xem chi tiet</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            <div className="last-background">
                                            </div>
                                        </CustomScrollbars>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allMoviesNowRedux: state.film.allMoviesNow,
        allMoviesComingRdeux: state.film.allMoviesComing
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMoviesNowShowingRedux: () => dispatch(actions.fetchMoviesNowShowing()),
        fetchMoviesComingSoonRedux: () => dispatch(actions.fetchMoviesComingSoon())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NowShowingFilm);
