import { right } from '@popperjs/core';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from "../../../utils"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './NewsRedux.scss'
import ModalNews from './Modal/ModalNews';



const mdParser = new MarkdownIt;

class NewsRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            imageAuthor: '',
            imageNew: '',
            nameAuthor: '',
            previewImage: '',
            previewImages: '',
            hasOldData: false,
            isOpen: false,
            isOpenModalNews: false,
            newEditId: '',
            newsEdit: {}
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allNewsRedux !== this.props.allNewsRedux) {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                imageAuthor: '',
                imageNew: '',
                nameAuthor: '',
                action: CRUD_ACTIONS.CREATE,
                previewImage: '',
                previewImages: ''
            })
        }
    }
    handleFetchNews = () => {
        this.setState({
            isOpenModalNews: true
        })
    }
    toggleNewsModal = () => {
        this.setState({
            isOpenModalNews: !this.state.isOpenModalNews,
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleOnChangeImageNews = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('base 64 image: ', base64)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImage: objectUrl,
                imageNew: base64,
            })
        }
    }
    openPreviewImageNews = () => {
        if (!this.state.previewImage) return;
        this.setState({
            isOpen: true
        })

    }
    handleOnChangeImageAuthor = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('base 64 image: ', base64)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImages: objectUrl,
                imageAuthor: base64,
            })
        }
    }
    openPreviewImageAuthor = () => {
        if (!this.state.previewImages) return;
        this.setState({
            isOpen: true
        })

    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['description', 'contentHTML', 'nameAuthor']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    handleSaveNews = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;
        let { action } = this.state;
        //fire redux action
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewsRedux({
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                description: this.state.description,
                imageAuthor: this.state.imageAuthor,
                imageNew: this.state.imageNew,
                nameAuthor: this.state.nameAuthor,
            })
            this.setState({
                isOpenModalNews: true
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editNewsRedux({
                id: this.state.newEditId,
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                description: this.state.description,
                imageAuthor: this.state.imageAuthor,
                imageNew: this.state.imageNew,
                nameAuthor: this.state.nameAuthor,
            })
            this.setState({
                isOpenModalNews: true
            })
        }
    }
    handleEditNewsFromParent = (news) => {
        let imageBase64s = '';
        if (news.imageAuthor) {
            imageBase64s = new Buffer.from(news.imageAuthor, 'base64').toString('binary');
        }
        let imageBase64 = '';
        if (news.imageNew) {
            imageBase64 = new Buffer.from(news.imageNew, 'base64').toString('binary');
        }
        this.setState({
            contentMarkdown: news.contentMarkdown,
            contentHTML: news.contentHTML,
            description: news.description,
            imageAuthor: '',
            imageNew: '',
            nameAuthor: news.nameAuthor,
            previewImage: imageBase64,
            previewImages: imageBase64s,
            action: CRUD_ACTIONS.EDIT,
            newEditId: news.id,
            isOpenModalNews: false,
            newsEdit: news
        })
    }
    render() {
        let language = this.props.language
        let { contentMarkdown, contentHTML, description, imageNew, imageAuthor, nameAuthor }
            = this.state
        return (
            <div className="news-redux-container">
                <div className="title">
                    BOOKING CINE-FILM
                </div>
                <div className="form-input-news">
                    <div className="container col-12">
                        <div className="news-container-all col-12">
                            <div className="contents-news col-12">
                                <div className="input-news col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Tên tác giả:</span>
                                        <input className="form-control" type="text" placeholder="..."
                                            value={nameAuthor}
                                            onChange={(event) => { this.onChangeInput(event, 'nameAuthor') }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="title-name">Tiêu đề:</label>
                                        <textarea className="form-control-news" rows="12"
                                            onChange={(event) => this.handleOnChangeDescription(event)}
                                            value={this.state.description}
                                        >
                                        </textarea>
                                    </div>
                                </div>
                                <div className="image-news col-md-4">
                                    <div className="form-group">
                                        <span className="form-label">Ảnh tác giả</span>
                                        <div className="preview-img-container">
                                            <input id="previewImgs" type="file" hidden
                                                onChange={(event) => this.handleOnChangeImageAuthor(event)}
                                            />
                                            <label className="label-upload" htmlFor="previewImgs"><FormattedMessage id="film-manage.uploadimage" /><i className="fas fa-user"></i></label>
                                            <div className="preview-img"
                                                style={{ backgroundImage: `url(${this.state.previewImages})` }}
                                                onClick={() => this.openPreviewImageAuthor()}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <span className="form-label">Ảnh bài đăng</span>
                                        <div className="preview-img-container">
                                            <input id="previewImg" type="file" hidden
                                                onChange={(event) => this.handleOnChangeImageNews(event)}
                                            />
                                            <label className="label-upload" htmlFor="previewImg"><FormattedMessage id="film-manage.uploadimage" /><i className="fas fa-book-open"></i></label>
                                            <div className="preview-img"
                                                style={{ backgroundImage: `url(${this.state.previewImage})` }}
                                                onClick={() => this.openPreviewImageNews()}
                                            >
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="btn-news col-md-2">
                                    <div className="form-btn">
                                        <div className={this.state.action === CRUD_ACTIONS.EDIT ? "btn-edit" : "btn-save"}
                                            onClick={() => this.handleSaveNews()}
                                        ><div className="title-save">
                                                {this.state.action === CRUD_ACTIONS.EDIT ?
                                                    <FormattedMessage id="film-manage.edit" />
                                                    :
                                                    <FormattedMessage id="film-manage.save" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="list-news col-2">
                                <div className="container-list col-md-1">
                                    <ModalNews
                                        handleEditNewsFromParentKey={this.handleEditNewsFromParent}
                                        action={this.state.action}
                                        isOpen={this.state.isOpenModalNews}
                                        toggleFromParent={this.toggleNewsModal}
                                        currentNews={this.state.newsEdit}
                                    // editUser={this.doEditUser}
                                    />
                                    <button
                                        className="btn-film btn-primary px-3"
                                        onClick={() => this.handleFetchNews()}
                                    ><i className="fas fa-box-open"></i>
                                        Danh sách tin tức
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="news-redux-body news-form my-2" >
                    <div className="container col-12">
                        <div className="row">
                            <div className="container-news-markdown col-md-12">
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.contentMarkdown}
                                />
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
        allNewsRedux: state.film.allNew
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllNewsRedux: () => dispatch(actions.fetchAllNews()),
        editNewsRedux: (data) => dispatch(actions.editNewsAction(data)),
        createNewsRedux: (data) => dispatch(actions.createNewsAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsRedux);
