import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingFilm.scss';
import { LANGUAGES, MONEY, TRUEFALSE } from '../../../../utils';
import * as actions from '../../../../store/actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import {
    Stepper,
    Step,
    StepLabel,
    // Button,
    Typography,
    CircularProgress
} from '@material-ui/core';
import moment from 'moment';
import BookingSeat from './BookingSeat';
import BookingBuyCombo from './BookingBuyCombo';
import BookingPay from './BookingPay';
import Steppers from '../ChildComponent/Steppers';
import Navbar_Infor from '../../../../containers/Customer/Film/ChildComponent/Navbar_Infor';
import ModalError from '../ChildComponent/ModalError';

class BookingFilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSeat: [],
            currentStep: 0,
            step: [],
            inforDetail: [],
            inforSeat: [],
            inforCombo: [],
            isShowModalError: false,
            seatErrorVi: 'GHẾ NGỒI',
            seatErrorEn: 'SEAT',
            totalSeat: 0.00,
            totalCombo: 0.00,
            totalPromotion: 0.00,
            detailSeats: ''

        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleCallSeat = (seat) => {
        this.setState({ inforSeat: seat })
    }
    handleCallCombo = (combo) => {
        this.setState({ inforCombo: combo })
    }

    handleFetchModalError = () => {
        this.setState({
            isShowModalError: true
        })
    }
    toggleModalError = () => {
        this.setState({
            isShowModalError: !this.state.isShowModalError,
        })
    }
    handleNext = () => {
        let { currentStep, inforSeat, totalSeat } = this.state
        if (totalSeat) {
            this.handleFetchModalError()
        }
        else if (!totalSeat) {
            currentStep = currentStep + 1
        }
        this.setState({
            currentStep
        })
    }
    handlePrev = () => {
        let { currentStep } = this.state
        currentStep = currentStep - 1
        this.setState({
            currentStep
        })
    }
    getStepItems = (steps) => {
        switch (steps) {
            case 0:
                return (
                    <BookingSeat
                        stateSeat={this.props.location.state.allSeat}
                        handleNext={this.handleNext}
                        propsAll={this.props}
                        inforSeat={this.handleCallSeat}
                    />
                );
            case 1:
                return (
                    <BookingBuyCombo
                        handleNext={this.handleNext}
                        handlePrev={this.handlePrev}
                        // propsAll={this.props}
                        inforCombo={this.handleCallCombo}
                    />
                );
            case 2:
                return (
                    <BookingPay
                        statePay={this.state}
                        propsAll={this.props}
                    // onTime={this.onTime}
                    />
                );
            default:
                return (
                    <div>PAYMENT SUCCESS</div>
                );
        }
    }
    render() {
        let stepss = [
            <FormattedMessage id="booking.choose-seat" />,
            <FormattedMessage id="booking.choose-corn-water" />,
            <FormattedMessage id="booking.payment" />
        ]
        let inforDetailFilm = this.props.location.state.allState.inforDetailFilm
        let inforDetailSeat = this.props.location.state.allSeat
        let inforDetailcinemaTech = this.props.location.state.allState.cinemaTech
        let { inforSeat, inforCombo, totalCombo, totalPromotion, totalSeat, detailSeats } = this.state
        let timeType = moment(inforDetailSeat.date).format('DD/MM/YYYY');
        let { language } = this.props
        console.log('arrAllBuyCombos', this.state.totalCombo)
        return (
            <React.Fragment>
                <Navbar_Infor />
                <div className="container container-film">
                    <div className="content-booking-films col-md-12">
                        <Stepper activeStep={this.state.currentStep} className={Steppers.stepper}>
                            {stepss.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div className="container-booking col-md-12">
                            <div className="step-booking">
                            </div>
                            {this.getStepItems(this.state.currentStep)}
                        </div>
                        {/* <div className="lace-up"></div> */}
                        <div className="btn-container col-md-12">
                            <div class="total-infor">
                                {this.state.currentStep !== 0 && <button className="btn-prev col-md-1"
                                    onClick={() => this.handlePrev()}
                                >
                                    <i className="fas fa-angle-double-left">
                                    </i>PREV
                                </button>}
                                <div className="content-booking-film col-md-10">
                                    <div className="left-infor-film col-md-4">
                                        <div className="left">
                                            <div className="image-film"
                                                style={{ backgroundImage: `url(${inforDetailFilm.image})` }}
                                            >
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="name-film">
                                                {language === LANGUAGES.VI ? inforDetailFilm.nameVi : inforDetailFilm.nameEn}
                                            </div>
                                            <div className="genre">
                                                {language === LANGUAGES.VI ? inforDetailFilm.genreData.valueVi : inforDetailFilm.genreData.valueEn}
                                            </div>
                                            <div className="dayShow">{inforDetailFilm.dayShow}</div>
                                            <div className="duration">{inforDetailFilm.duration}</div>
                                        </div>
                                    </div>
                                    <div className="middle-time-seat col-md-4">
                                        <div className="cinema">
                                            <div className="title-name-booking col-md-6">
                                                <FormattedMessage id="booking.cinema" />
                                            </div>
                                            <div className="infor-booking">
                                                <FormattedMessage id="booking.CINE-DALAT" />
                                            </div>
                                        </div>
                                        <div className="day">
                                            <div className="title-name-booking  col-md-6">
                                                <FormattedMessage id="booking.time" />
                                            </div>
                                            <div className="infor-booking">{timeType}</div>
                                        </div>
                                        <div className="cinemaTech">
                                            <div className="title-name-booking  col-md-6">
                                                <FormattedMessage id="booking.room" />
                                            </div>
                                            <div className="infor-booking">{inforDetailcinemaTech}</div>
                                        </div>
                                        <div className="seat">
                                            <div className="title-name-booking  col-md-1">
                                                <FormattedMessage id="booking.seat" />
                                            </div>
                                            {inforSeat && inforSeat.length > 0 && inforSeat.map((item, index) => {
                                                let detailSeat = language === LANGUAGES.VI ? item.seatDataAll.valueVi : item.seatDataAll.valueEn
                                                if (item.isSelected === true) {
                                                    detailSeats = detailSeat
                                                    return (
                                                        <div className="infor-booking-detail-seat" >{detailSeats + ','}</div>
                                                    )
                                                }

                                            })}

                                        </div>
                                    </div>
                                    <div className="right-price  col-md-3">
                                        <div className="price-ticket">
                                            <div className="title-name-booking col-md-5">
                                                <FormattedMessage id="booking.price" />
                                            </div>
                                            {inforSeat && inforSeat.length > 0 && inforSeat.map((item, index) => {
                                                let priceSeat = language === LANGUAGES.VI ? item.priceDataAll.valueVi : item.priceDataAll.valueEn
                                                if (item.isSelected === true) {
                                                    totalSeat += priceSeat
                                                }
                                            })}
                                            <div className="infor-booking" >{language === LANGUAGES.VI ? totalSeat + MONEY.DONG : totalSeat + MONEY.DOLLAR}</div>
                                        </div>
                                        <div className="combo-drink-food ">
                                            <div className="title-name-booking col-md-5">
                                                <FormattedMessage id="booking.combo" />
                                            </div>
                                            {inforCombo && inforCombo.length > 0 && inforCombo.map((item, index) => {
                                                let price = language === LANGUAGES.VI ? item.priceDataCombo.valueVi : item.priceDataCombo.valueEn
                                                if (item.cout) {
                                                    totalCombo += price * item.cout
                                                }
                                            })}
                                            <div className="infor-booking" >{language === LANGUAGES.VI ? totalCombo + MONEY.DONG : totalCombo + MONEY.DOLLAR}</div>
                                        </div>
                                        <div className="promotion">
                                            <div className="title-name-booking col-md-5">
                                                <FormattedMessage id="booking.promotion" />
                                            </div>
                                            <div className="infor-booking">{language === LANGUAGES.VI ? totalPromotion + MONEY.DONG : totalPromotion + MONEY.DOLLAR}</div>
                                        </div>
                                        <div className="total-price">
                                            <div className="title-name-booking col-md-5">
                                                <FormattedMessage id="booking.total" />
                                            </div>
                                            <div className="infor-booking">{language === LANGUAGES.VI ?
                                                totalCombo + totalSeat + totalPromotion + MONEY.DONG : totalCombo + totalSeat + totalPromotion + MONEY.DOLLAR}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.state.currentStep !== 2 && <button className="btn-next col-md-1"
                                    onClick={() => this.handleNext()}
                                >NEXT
                                    <i className="fas fa-angle-double-right">
                                    </i>
                                    <ModalError
                                        isOpen={this.state.isShowModalError}
                                        toggleFromParent={this.toggleModalError}
                                        errorSeatVi={this.state.seatErrorVi}
                                        errorSeatEn={this.state.seatErrorEn}
                                    />
                                </button>}
                                {this.state.currentStep === 2 && <button className="btn-next col-md-1"
                                    onClick={() => this.handleNext()}
                                >SUBMIT
                                    <i className="fas fa-angle-double-right">
                                    </i>
                                    <ModalError
                                        isOpen={this.state.isShowModalError}
                                        toggleFromParent={this.toggleModalError}
                                        errorSeatVi={this.state.seatErrorVi}
                                        errorSeatEn={this.state.seatErrorEn}
                                    />
                                </button>}
                            </div>
                        </div>
                        {/* <div className="lace-down"></div> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingFilm);
