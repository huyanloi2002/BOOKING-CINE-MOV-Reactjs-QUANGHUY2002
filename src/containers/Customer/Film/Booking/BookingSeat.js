import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingSeat.scss';
import { LANGUAGES, TRUEFALSE } from '../../../../utils';
import * as actions from '../../../../store/actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getBookingTimeByPrice } from '../../../../services/filmService'
class BookingSeat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectSeat: '',
            rangeSeat: [],
            counter: 0

        }
    }
    componentDidMount() {
        // this.props.fetchAllSeatRedux();
        // this.props.stateSeat()
        if (this.props.propsAll && this.props.propsAll.location && this.props.propsAll.location.state
            && this.props.propsAll.location.state.allState && this.props.propsAll.location.state.allState.allSeat
        ) {
            let data = this.props.propsAll.location.state.allState.allSeat
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
                this.setState({
                    rangeSeat: data,

                })
            }

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    // checkValidated = () => {
    //     let isValid = true
    //     let max = 5
    //     let count = 0
    //     let { rangeSeat } = this.state
    //     for (let i = 0; i < rangeSeat.length; i++) {
    //         if (rangeSeat[i].isSelected) {
    //             count = count + 1;
    //             if (count >= max) {
    //                 alert('XLL')
    //                 isValid = false
    //                 break;
    //             }
    //         }
    //     }
    //     return isValid
    // }
    handleOnClickBookingSeat = (seat) => {
        let { rangeSeat } = this.state;
        // let isValid = this.checkValidated()
        // if (isValid === false) return;
        if (rangeSeat && rangeSeat.length > 0) {
            rangeSeat = rangeSeat.map(item => {
                if (item.id === seat.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeSeat: rangeSeat
            })
        }

    }

    render() {
        this.props.inforSeat(this.state.rangeSeat)
        let { rangeSeat, seatChild, allSeat } = this.state;
        let arrSeatNormal = rangeSeat.filter(item => item.seatType === 'SET1')
        let arrSeatVip = rangeSeat.filter(item => item.seatType === 'SET2')
        let arrSeatDouble = rangeSeat.filter(item => item.seatType === 'SET3')
        let { language } = this.props
        return (

            <div className="booking-seat">
                <div className="image-sreen">
                </div>
                <div className="booking-seat-container">
                    <div className="content-seats">
                        <div className="all-seat">
                            <div className="seat-normal">
                                {arrSeatNormal && arrSeatNormal.length > 0 && arrSeatNormal.map((item, index) => {
                                    let nameSeatNormal = language === LANGUAGES.VI ? item.seatDataAll.valueVi : item.seatDataAll.valueEn
                                    return (
                                        <button
                                            onClick={() => {
                                                this.handleOnClickBookingSeat(item);
                                            }}
                                            key={index}
                                            className={item.isSelected === true ?
                                                "btn-seat-normal active"
                                                : "btn-seat-normal"}
                                        >
                                            <span>{nameSeatNormal}</span>
                                        </button>
                                    )
                                })}
                            </div>
                            <div className="seat-vip-one">
                                {arrSeatVip && arrSeatVip.length > 0 && arrSeatVip.map((item, index) => {
                                    let nameSeatVip = language === LANGUAGES.VI ? item.seatDataAll.valueVi : item.seatDataAll.valueEn
                                    return (
                                        <button
                                            onClick={() => this.handleOnClickBookingSeat(item)}
                                            value={item.seat}
                                            key={index}
                                            className={item.isSelected === true ?
                                                "btn-seat-vip-one active"
                                                : "btn-seat-vip-one"}
                                        >
                                            <span>{nameSeatVip}</span>
                                        </button>
                                    )
                                })}
                            </div>
                            {/* <div className="seat-vip-two">
                                {arrSeatVip && arrSeatVip.length > 0 && arrSeatVip.slice(20, 40).map((item, index) => {
                                    let nameSeat = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                    return (
                                        <button
                                            onClick={() => this.handleClickBtnSeat(item)}
                                            key={index}
                                            className={item.isSelected === true ?
                                                "btn-seat-vip-two active"
                                                : "btn-seat-vip-two"
                                            }
                                        >
                                            <span>{nameSeat}</span>
                                        </button>
                                    )
                                })}
                            </div> */}
                            <div className="seat-double">
                                <div className="seat-double-content">
                                    {arrSeatDouble && arrSeatDouble.length > 0 && arrSeatDouble.map((item, index) => {
                                        let nameSeatBouble = language === LANGUAGES.VI ? item.seatDataAll.valueVi : item.seatDataAll.valueEn
                                        return (
                                            <button
                                                onClick={() => this.handleOnClickBookingSeat(item)}
                                                value={item.seat}
                                                key={index}
                                                className={item.isSelected === true ?
                                                    "btn-seat-double active"
                                                    : "btn-seat-double"}
                                            >
                                                <span>{nameSeatBouble}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingSeat);
