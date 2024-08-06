import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageTunure.scss"
import { toast } from 'react-toastify';

import {gettunure, puttunure, gettunurebyid} from "../../../services/adminService"
class EditTunure extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openmodalEdit: false,
            tunure: '',
            tunurelist: [],
        };
    }

    async componentDidMount(){
        await this.gettunures();
        await this.gettunurebyids();
        
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

    gettunurebyids = async() => {
        let res = await gettunurebyid(this.props.id);
        if(res && res.errCode === 0){
            this.setState({
                tunure: res.data.tunure
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
                let res = await puttunure({
                    tunure: tunure,
                    id: this.props.id
                })
    
                if(res && res.errCode === 0){
                    toast.success("Cập nhật nhiệm kỳ mới thành công!");
                    await this.props.gettunures();
                    this.props.openModalEdit();
                }
                else {
                    toast.error("Cập nhật nhiệm kỳ mới không thành công!");
                    await this.props.gettunures();
                    this.props.openModalEdit();
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
        let {openModalEdit} = this.props;
        return (
            <> 
                        <div className='modal-tunure'>
                                <div className='modal-tunure-content'>
                                    <h1 className='title'>Cập nhật nhiệm kỳ mới</h1>
                                    <p>Nhiệm kỳ: <span>(vui lòng nhập nhiệm kỳ mới dạng 20xx-20xx!)</span></p>
                                    <input onKeyDown={(event) => this.handleOnkeyDown(event)}
                                     type='text' value={this.state.tunure} placeholder='20xx-20xx' onChange={(event) => this.handleonchanginput(event, 'tunure') }/>
                                    <div className='button-list'>
                                    <button className='btn btn-primary'onClick={() => this.handlesave()}>Sửa </button>
                                    <button className='btn btn-dart' onClick={openModalEdit}>Hủy </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditTunure);
