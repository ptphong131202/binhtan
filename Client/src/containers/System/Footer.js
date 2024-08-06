import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Footer.scss"
class Footer extends Component {
    render() {
        return (
            <> 
           <div className='footer-admin'>Chi hội sinh viên Bình Tân</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
