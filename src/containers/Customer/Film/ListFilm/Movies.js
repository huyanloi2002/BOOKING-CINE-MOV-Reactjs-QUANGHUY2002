import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Movies.scss';
import { LANGUAGES, MONEY, TRUEFALSE } from '../../../../utils';
import * as actions from '../../../../store/actions'
import { every } from 'lodash';
import { getBuyComboById } from '../../../../services/filmService';

class Movies extends Component {
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
            <div>
                <div className="booking-buy-combo-container col-md-12">
                    <div>HELLo</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allBuyCombosRedux: state.film.allBuyCombo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBuyComboRedux: () => dispatch(actions.fetchAllBuyCombo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
