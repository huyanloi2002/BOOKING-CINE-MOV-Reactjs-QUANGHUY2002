import React, { Component } from 'react';
import { connect } from 'react-redux';
import "@fontsource/quicksand";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class OutstandingFilm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrFilms: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topFilmsRedux !== this.props.topFilmsRedux) {
            this.setState({
                arrFilms: this.props.topFilmsRedux,
            })
        }
    }
    componentDidMount() {
        this.props.loadTopFilm();
    }
    handleViewInforFilm = (film) => {
        if (this.props.history) {
            this.props.history.push(`/inforfilm/${film.id}`)
        }

    }
    render() {
        let arrTopFilms = this.state.arrFilms;
        let { language } = this.props
        return (
            <div className="section-share section-film">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="film.outstanding-showing" /></span>
                        <button className="btn-section"><FormattedMessage id="film.see more" /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrTopFilms && arrTopFilms.length > 0
                                && arrTopFilms.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let genreVi = `${item.genreData.valueVi}`;
                                    let genreEn = `${item.genreData.valueEn}`;
                                    let nameFilmVI = `${item.nameVi}`
                                    let nameFilmEN = `${item.nameEn}`
                                    return (
                                        <div className="section-customize" key={index} onClick={() => this.handleViewInforFilm(item)}>
                                            <div className="bg-image section-film"
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            ></div>
                                            <div className="title-film">{language === LANGUAGES.VI ? nameFilmVI : nameFilmEN}</div>
                                            <div className="title-genre">({language === LANGUAGES.VI ? genreVi : genreEn})</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topFilmsRedux: state.film.topFilms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopFilm: () => dispatch(actions.fetchTopFilms())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingFilm));
