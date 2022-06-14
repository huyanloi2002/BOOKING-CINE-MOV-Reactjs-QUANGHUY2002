import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Navbar_Infor.scss';
import { LANGUAGES } from '../../../utils'

class Navbar_Infor extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        return (
            <div className="container-navbar-infor">
                <div className="content-navbar-infor">
                    <nav className="navbar navbar-light bg-light">
                        <a className="navbar-brand" href="#">
                            <i className="fas fa-angle-left"></i>
                        </a>
                    </nav>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar_Infor);
