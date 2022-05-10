import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Navbar from '../../HomePage/Navbar/Navbar';
import './InforFilm.scss';
import { getInforFilm } from '../../../services/filmService';
import { LANGUAGES } from '../../../utils'

class InforFilm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inforDetailFilm: {}
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getInforFilm(id)
            if (res && res.errCode === 0) {
                this.setState({
                    inforDetailFilm: res.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { inforDetailFilm } = this.state;
        let language = this.props.language;
        console.log('this', this.state)
        return (
            <div className="content-infor">
                <Navbar isShowBanner={false} />
                <div className="title-main">
                    <FormattedMessage id="infor-film.title-content" />
                </div>
                <div className="infor-film-container">
                    <div className="intro-film">
                        <div className="content-left"
                            style={{ backgroundImage: `url(${inforDetailFilm.image ? inforDetailFilm.image : ''})` }}
                        >
                        </div>
                        <div className="content-right">
                            <div className="up">
                                <div className="title-film">{language === LANGUAGES.VI ? inforDetailFilm.nameVi : inforDetailFilm.nameEn}</div>
                            </div>
                            <div className="down">
                                {inforDetailFilm
                                    && inforDetailFilm.Markdown
                                    && inforDetailFilm.Markdown.contentHTML
                                    &&
                                    <div dangerouslySetInnerHTML={{ __html: inforDetailFilm.Markdown.contentHTML }}>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                    <div className="book-film">

                    </div>
                    <div className="detail-infor-film">
                        <div className="down-left">
                            <div className="summary"><FormattedMessage id="infor-film.summary" style={{ fontWeight: '100' }} />:</div>
                            {inforDetailFilm && inforDetailFilm.Markdown
                                && inforDetailFilm.Markdown.description
                                &&
                                <span>
                                    {inforDetailFilm.Markdown.description}
                                </span>
                            }
                        </div>
                        <div className="down-right">
                        </div>
                    </div>
                    <div className="comment-doctor">

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InforFilm);
