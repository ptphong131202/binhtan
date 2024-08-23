import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Term.scss"

import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { postterm } from '../../../services/termService';
class AddTerm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: ""
        };
    }

    handleOnchangeInput = ( event, id ) =>
        {
            let copyState = { ...this.state };
            copyState[ id ] = event.target.value;
    
            this.setState( {
                ...copyState
            } );
        }

    

    handlesave = async () => {
        console.log(this.state)
        let check = this.check();
        if(check === false) return;
        else{
            let res = await postterm({
                title: this.state.title
            });

            if(res && res.errCode === 0){
                toast.success("Thêm nhiệm kỳ mới thành công!");
                this.props.openAdd();
                this.props.getlistterm("");
            }
            else {
                toast.success("Thêm nhiệm kỳ mới không thành công!");
            }
        }
    }

    check = () => {
        let result = true;
        if(!this.state.title) {
            alert("Vui lòng nhập nhiệm kỳ");
            result = false;
        }
        return result;
    }
    

    render() {
        return (
            <> 
                <div className='modaladd'>
                        <div className='modaladd-content'>
                            <h1 className='title'>Thêm nhiệm kỳ</h1>
                            <div className='form-group'>
                                <label>Nhiệm kỳ: <span>(Vui lòng nhập nhiệm kỳ theo dạng: "20xx-20xx"!)</span></label>
                                <input onChange={( event ) => this.handleOnchangeInput( event, 'title' ) } 
                                type='text' placeholder='20xx-20xx'/>
                            </div>
                            <div className='btnadd'>
                                <button className='btn btn-primary' onClick={() => this.handlesave()}>Thêm</button>
                                <button className='btn btn-danger' onClick={() => this.props.openAdd()}>Hủy</button>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTerm);
