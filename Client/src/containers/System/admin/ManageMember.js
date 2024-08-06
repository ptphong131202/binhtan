import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; // fomat language
import { LANGUAGE, CRUD_ACTION, CommonUtils } from '../../../utils'; // vi or en
import { connect } from 'react-redux';
import Footer from '../Footer';
import { withRouter } from 'react-router';

class ManageMember extends Component {
    // change language
    changeLanguage = (language) => {
        // fire redux event: action
        this.props.changeLanguageApp(language); // prop bettween redux and react
    }

    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

    // event in img for input file 
    handleOnchangeImg = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let getBase64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImg: objectUrl,
                avatar: getBase64
            })
        }
    }

    // preview image
    openPreviewImage = () => {
        if (!this.state.previewImg) return;
        this.setState({
            isOpen: true
        })
    }

    linkTo = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }

    render() {
        return (
            <> 
            <title><FormattedMessage id="menu.admin.manage-member" /></title>
            <div className='content-box'>
                <div className='systemAdmin'>
                    <div className='left'>
                        <div className='left-content'>
                            <li onClick={() => this.linkTo('/system/manage-admin')} className={this.props.location.pathname === '/system/manage-admin' ? "liopen" : ""}><span>Quản lý quản trị viên</span></li>
                            <li onClick={() => this.linkTo('/system/manage-member')} className={this.props.location.pathname === '/system/manage-member' ? "liopen" : ""}><span>Quản lý hội viên</span>
                                <div className='admin-list-account'>
                                    <li className={this.props.location.pathname === '/system/manage-member' ? "liitemopen" : ""}><span>Tài khoản hoạt động</span></li>
                                    <li className=''><span>Tài khoản chờ duyệt</span></li>
                                    <li className=''><span>Tài khoản bị khóa</span></li>
                                </div>
                            </li>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='right-content'>
                            <h1 className='title'>Quản lý hội viên hoạt động</h1>

                            {/* input search */}
                            <div className='form-search'>
                                <div className='form-search-content'>
                                        <input type='text' placeholder='Nhập để tìm kiếm'/>
                                        <i className='fas fa-search'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            </>
        )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageMember));
