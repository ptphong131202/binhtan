import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageTunure.scss"

class ListCommitee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listmember: [],
        };
    }

    
    render() {
        return (
            <> 
                <div className='member-content'>
                    <span onClick={() => this.props.openModalListCommitee()} className='close-member-content'>x</span> 
                </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(ListCommitee);
