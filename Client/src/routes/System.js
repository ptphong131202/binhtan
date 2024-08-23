import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import Navbar from '../containers/Navbar/Navbar';
import "./System.scss"
import Home from '../containers/System/admin/Home';
import ManageTerm from '../containers/System/term/ManageTerm';

class System extends Component
{
    render ()
    {
        /* { this.props.isLoggedIn && <Header /> } */
        const { systemMenuPath, isLoggedIn } = this.props;
        let checkposition = this.props.userInfo.position !== null ? true: false;
        let linkToRedirect = isLoggedIn && checkposition? '/system/home' : '/home';
       
        return (
            <React.Fragment>
                {
                    checkposition === false ? <Redirect to={ linkToRedirect } />:
                    <>
                        { isLoggedIn && <Header /> }
                        <div className="system-container">
                            <Navbar />
                            <div className="system-list">
                                <Switch>
                                    <Route path="/system/home" component={ Home } />
                                    <Route path="/system/term" component={ ManageTerm } />
                                    <Route component={ () => { return ( <Redirect to={ systemMenuPath } /> ) } } />
                                </Switch>
                            </div>
                        </div>
                    </>
                    
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>
{
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( System );
