import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageAdmin from '../containers/System/admin/ManageAdmin';
import ManageMember from '../containers/System/admin/ManageMember';
import AdminHome from '../containers/System/admin/AdminHome';
import Header from '../containers/Header/Header';
import ManageTunure from '../containers/System/Tunure/ManageTunure';
class System extends Component
{
    render ()
    {
        /* { this.props.isLoggedIn && <Header /> } */
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                { isLoggedIn && <Header /> }
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/manage-admin" component={ ManageAdmin } />
                            <Route path="/system/home-admin" component={ AdminHome } />
                            <Route path="/system/manage-member" component={ ManageMember } />
                            <Route path="/system/manage-tunure" component={ ManageTunure } />
                            <Route component={ () => { return ( <Redirect to={ systemMenuPath } /> ) } } />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>
{
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( System );
