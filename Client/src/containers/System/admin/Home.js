import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Home.scss"
import pen from "../../../assets/font/pencil.png"

import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            fullMessage: 'Chào mừng đến trang Dashboard!',
            index: 0
        };
    }

    render() {
        return (
            <>
                <title>Trang chủ</title>
                
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
