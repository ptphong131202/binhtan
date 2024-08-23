import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Default.scss"
import Footer from "../Footer"
import pen from "../../../assets/font/pencil.png"

import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
class Default extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    

    render() {
        return (
            <> 
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

export default connect(mapStateToProps, mapDispatchToProps)(Default);
