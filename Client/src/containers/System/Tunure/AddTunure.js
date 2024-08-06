import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageTunure.scss"
import { toast } from 'react-toastify';

import {gettunure, posttunure} from "../../../services/adminService"
class AddTunure extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openmodaladd: false,
            tunure: '',
            tunurelist: []
        };
    }

    async componentDidMount(){
        await this.gettunures();
    }
    gettunures = async () => {
        let res = await gettunure();
        if(res && res.errCode === 0){
            let tunures = res.data.reverse()
            this.setState({
                tunurelist: res.data
            })
        }
        else {
            this.setState({
                tunurelist: []
            })
        }
    }

    handleonchanginput = (event, key) => {
        let stateCopy = { ...this.state };
        stateCopy[ key ] = event.target.value;
        this.setState( {
            ...stateCopy
        } )
    }

    checktunure = (tunure) => {
        let check = false;
        this.state.tunurelist.map((item, index) => {
            if(tunure === item.tunure){
                check = true
            }
        })
        return check;
    }

    handlesave = async() => {
        let tunure = this.state.tunure;
        if(tunure === ''){
            toast.error("Vui lòng nhập nhiệm kỳ!")
        }
        else{
            if(this.checktunure(tunure)){
                toast.error("Nhiệm kỳ đã tồn tại!")
            }
            else{
                let res = await posttunure({
                    tunure: tunure,
                })
    
                if(res && res.errCode === 0){
                    toast.success("Thêm nhiệm kỳ mới thành công!");
                    await this.props.gettunures();
                    this.props.openModalAdd();
                }
                else {
                    toast.error("Thêm nhiệm kỳ mới không thành công!");
                    await this.props.gettunures();
                    this.props.openModalAdd();
                }
            }
        }
    }

    handleOnkeyDown = async(e) => {
        if (e.keyCode === 13 || e.keyCode === "Enter") {
            await this.handlesave();
        }
    }

    
    render() {
        let {openModalAdd} = this.props;
        return (
            <> 
                        <div className='modal-tunure'>
                                <div className='modal-tunure-content'>
                                    <h1 className='title'>Thêm nhiệm kỳ mới</h1>
                                    <p>Nhiệm kỳ: <span>(vui lòng nhập nhiệm kỳ mới dạng 20xx-20xx!)</span></p>
                                    <input onKeyDown={(event) => this.handleOnkeyDown(event)}
                                     type='text' placeholder='20xx-20xx' 
                                     onChange={(event) => this.handleonchanginput(event, 'tunure') }/>
                                    <div className='button-list'>
                                    <button className='btn btn-primary'onClick={() => this.handlesave()}>Thêm </button>
                                    <button className='btn btn-dart' onClick={openModalAdd}>Hủy </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTunure);
