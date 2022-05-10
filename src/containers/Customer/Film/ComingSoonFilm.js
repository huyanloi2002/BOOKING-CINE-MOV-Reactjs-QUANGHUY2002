import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar from '../../HomePage/Navbar/Navbar';
// import './ComingSoonFilm.scss';
import { getInforFilm } from '../../../services/filmService';
import { LANGUAGES } from '../../../utils'

class ComingSoonFilm extends Component {

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
        return (
            <>
                <Navbar isShowBanner={false} />
                <div className="infor-film-container">
                    <div className="intro-film">
                        <div className="content-left"
                            style={{ backgroundImage: `url(${inforDetailFilm.image ? inforDetailFilm.image : ''})` }}
                        >
                        </div>
                        <div className="content-right">
                            <div className="up">
                                <div className="title-film">{language === LANGUAGES.VI ? inforDetailFilm.nameVi : inforDetailFilm.nameEn}</div>
                                <div className="title-genre">
                                    {inforDetailFilm && inforDetailFilm.genreData
                                        && inforDetailFilm.genreData.valueVi
                                        &&
                                        <span>
                                            ({language === LANGUAGES.VI ?
                                                inforDetailFilm.genreData.valueVi :
                                                inforDetailFilm.genreData.valueEn})
                                        </span>
                                    }

                                </div>
                            </div>
                            <div className="down">
                                {inforDetailFilm && inforDetailFilm.Markdown
                                    && inforDetailFilm.Markdown.description
                                    &&
                                    <span>
                                        {inforDetailFilm.Markdown.description}
                                    </span>
                                }

                            </div>

                        </div>
                    </div>
                    <div className="book-film">

                    </div>
                    <div className="detail-infor-film">
                        {inforDetailFilm
                            && inforDetailFilm.Markdown
                            && inforDetailFilm.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: inforDetailFilm.Markdown.contentHTML }}>
                            </div>
                        }
                    </div>
                    <div className="comment-doctor">

                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ComingSoonFilm);
