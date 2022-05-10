import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import Navbar from './Navbar/Navbar';
import Banner from './Section/Banner';
import SlideMoviesHot from './Section/SlideMoviesHot';
import News from './Section/News';
import HomeFooter from './HomeFooter';


class HomePage extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {
            color: 'transparent',
            button: 'gray',
            scrollTop: 0
        }

    }
    onScroll = () => {
        let scrollTops = this.myRef.current.scrollTop
        if (scrollTops >= 100) {
            this.setState({
                color: 'black',
                button: '#7d2ae8'
            })

        } else {
            this.setState({
                color: 'transparent',
                button: 'gray'
            })
        }

    }

    render() {
        let { color, button } = this.state
        return (
            <div
                ref={this.myRef}
                onScroll={this.onScroll}
                style={{
                    height: '100%',
                    overflow: 'scroll',
                }}
            >
                <Navbar color={color} button={button} />
                <Banner />
                <SlideMoviesHot />
                <News />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
