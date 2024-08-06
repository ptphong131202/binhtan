import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; // fomat language
import { CommonUtils } from '../../../utils'; // vi or en
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class NavAdmin extends Component {
    // change language
    changeLanguage = (language) => {
        // fire redux event: action
        this.props.changeLanguageApp(language); // prop bettween redux and react
    }

    linkTo = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }

    render() {
        return (
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavAdmin));
