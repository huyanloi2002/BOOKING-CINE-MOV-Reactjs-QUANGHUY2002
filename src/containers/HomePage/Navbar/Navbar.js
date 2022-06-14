import { connect } from 'react-redux';
// import './HomeHeader.scss'
import "@fontsource/quicksand";
import logo from '../../../assets/logo.ico'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import { withRouter } from 'react-router';
import React, { Component } from 'react';
import '../../../containers/HomePage/Navbar/Navbar.scss'
import 'flag-icon-css/css/flag-icons.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import * as actions from "../../../store/actions";

class Navbar extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event: actions
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    goToLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/login`)
        }
    }
    render() {
        let language = this.props.language;
        const { systemMenuPath, isLoggedIn, userInfo, processLogout } = this.props
        return (
            <header className="header">
                <div className="headernav" style={{
                    backgroundColor: `${this.props.color}`,
                    transition: '0.3s',
                }}>
                    <div className="container-fluid px-lg-5 ">
                        <nav className="navbar navbar-expand-lg my-navbar navbar-light">
                            <div className="container-fluid">
                                <img className="header-logo" src={logo} onClick={() => this.returnToHome()} />
                                <button className="navbar-toggler navbar-white" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse pull-xs-right" id="navbarSupportedContent">
                                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Movies
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a className="dropdown-item" href="#">Action</a></li>
                                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Cinemas
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a className="dropdown-item" href="#">Action</a></li>
                                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Genre
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a className="dropdown-item" href="#">Action</a></li>
                                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Event</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Support</a>
                                        </li>
                                    </ul>
                                    {isLoggedIn ? <div className="language">
                                        <div className="infor-customer">
                                            <div className="image-customer"></div>
                                            <span className="welcome">
                                                {userInfo && userInfo.firstName ? userInfo.lastName : ''}&nbsp;
                                                {userInfo && userInfo.lastName ? userInfo.firstName : ''} !
                                            </span>
                                        </div>
                                        <div className="dropdown">
                                            <button className="btn btn-black dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fas fa-globe"></i>
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><a onClick={() => this.changeLanguage(LANGUAGES.VI)}><span className="flag-icon flag-icon-vn mx-2"></span></a></li>
                                                <li className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><a onClick={() => this.changeLanguage(LANGUAGES.EN)}><span className="flag-icon flag-icon-gb mx-2"></span></a></li>
                                            </ul>
                                            {/* nút logout */}
                                        </div>
                                        <div className="btn-log btn-logout" onClick={processLogout} title="Log out">
                                            <div className="btn-content">
                                                <i className="fas fa-sign-out-alt"></i>
                                            </div>
                                        </div>
                                    </div> : <form className="d-flex" >
                                        <button
                                            className="header-btn my-2 my-sm-0"
                                            type="submit"
                                            style={{
                                                backgroundColor: `${this.props.button}`,
                                                transition: 'all 0.3s',
                                            }}
                                            onClick={() => this.goToLogin()}
                                        >Sign In</button>
                                    </form>}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
