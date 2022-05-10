import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';




class Header extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event: actions
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className="language">
                    <span className="welcome">
                        <b><FormattedMessage id="home-header.welcome" /></b>
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}&nbsp;
                        {userInfo && userInfo.lastName ? userInfo.lastName : ''} !
                    </span>
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
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
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
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
