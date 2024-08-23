import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from '../Header/menuApp';
import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl'; // fomat language
import _ from 'lodash';
import { withRouter } from 'react-router';
class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        console.log(userInfo)
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.position;
            if (role === "P0") {
                menu = adminMenu;
            }
            
        }
        else { }
        this.setState({
            menuApp: menu
        });
    }

    

    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <> 
                <div className='system-nav'>
                     
                    <Navigator menus={this.state.menuApp} />
                    <div className='foot'>Chi hội sinh viên Bình Tân</div>
                </div>
            </>
        )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
