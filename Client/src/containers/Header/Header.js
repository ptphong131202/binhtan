import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import "./Responsive.scss"
import { FormattedMessage } from 'react-intl'; // fomat language
import { LANGUAGE, USER_ROLE } from '../../utils';
import _ from 'lodash';
import logo from "../../assets/logo.jpg"
import { withRouter } from 'react-router';
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageApp(language);
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.position;
            if (role === "P1") {
                menu = adminMenu;
            }

            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        else { }
        this.setState({
            menuApp: menu
        });
    }

    linkTo = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                    <div className='left'>
                            <img src={logo} />
                    </div>
                <div className='header-container-down'>
                    <div className='top'>
                        <div className='top-name topname-display'>
                            <div className='name-c'>CHI HỘI SINH VIÊN BÌNH TÂN</div>
                            <div className='name-u'>ĐẠI HỌC CẦN THƠ</div>
                        </div>
                         {/* language */}
                        <div className='language '>
                            <span className='welcom wellcom-display'><FormattedMessage id="menu.admin.wellcome" />, <b>{userInfo && userInfo.fullName ? userInfo.fullName : ""} !</b></span>
                            <span onClick={() => { this.handleChangeLanguage(LANGUAGE.VI) }} className={language === LANGUAGE.VI ? "language-vi active" : "language-vi "}>VI</span>
                            <span onClick={() => { this.handleChangeLanguage(LANGUAGE.EN) }} className={language === LANGUAGE.EN ? "language-en active" : "language-en "}>EN</span>
                            {/* nút logout */}
                            <div className="btn btn-logout" onClick={processLogout} title="Logout">
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                        </div>
                    </div>

                    {/* thanh navigator */}
                    <li className='lihome header-tabs-container-lihome' >
                            <i className='fas fa-list'></i>
                        </li>
                    <div className="header-tabs-container ">
                    <li className='lihome' onClick={() => this.linkTo('/system/home-admin')}>
                            home
                        </li> 
                        <Navigator menus={this.state.menuApp} />
                    </div>

                   
                </div>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageApp: (language) => dispatch(actions.changeLanguage(language)) // truyền action
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
