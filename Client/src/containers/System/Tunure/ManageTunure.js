import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageTunure.scss"
import Footer from "../Footer"
import pen from "../../../assets/font/pencil.png"
import AddTunure from './AddTunure';

import {gettunure, deletetunure} from "../../../services/adminService"
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import EditTunure from './EditTunure';
import ListMember from './ListMember';
import ListCommitee from './ListCommitee';
class ManageTunure extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openmodaladd: false,
            openmodaledit: false,
            openmodallistmember: false,
            openmodallistcommitee: false,
            tunure: '',
            tunurelist: [],
            id:''
        };
    }

    async componentDidMount(){
        await this.gettunures('');
    }
    gettunures = async (word) => {
        let res = await gettunure(word);
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

    handledelete = async(id) => {
        alert("Bạn có chắc rằng muốn xóa nhiệm kỳ này không!")
            let res = await deletetunure(id);
            if(res && res.errCode === 0){
                toast.success("Xóa nhiệm kỳ thành công!");
                await this.gettunures();
            }
            else {
                toast.error("Xóa nhiệm kỳ không thành công!");
            }
    }

    openModalAdd = () =>{
        this.setState({
            openmodaladd: !this.state.openmodaladd
        })
    }
    openModalEdit = (id) =>{
        this.setState({
            openmodaledit: !this.state.openmodaledit,
            id: id
        })
    }

    openModalListMember = () => {
        this.setState({
            openmodallistmember: !this.state.openmodallistmember
        })
    }

    openModalListCommitee = () => {
        this.setState({
            openmodallistcommitee: !this.state.openmodallistcommitee
        })
    }

    handleSearch = async (event) =>{
        await this.gettunures(event.target.value)
    }

    render() {
        console.log(this.state)
        return (
            <> 
                <title>Quản lý nhiệm kỳ</title>

                <div className='container-tunure'>
                    <div className='container-tunure-content'>
                        <h1 className='title'>Quản lý nhiệm kỳ</h1>

                        {/* form serch */}
                        <div className='form-search-tunure'>
                            <input onChange={(event) => this.handleSearch(event)} type='text' placeholder='Nhập để tìm kiếm'/>
                            <i className='fas fa-search'></i>
                        </div>

                        {/* button add */}
                        <button className='btn btn-primary' onClick={() => this.openModalAdd()}>+ Thêm nhiệm kỳ</button>

                        {/* List tunure */}
                        <div className='list-tunure'>
                            {isEmpty(this.state.tunurelist) && 
                                <div className='emtptylist'>Chưa có danh sách nhiệm kỳ!</div>
                             }
                            {this.state.tunurelist && !isEmpty(this.state.tunurelist) &&
                                this.state.tunurelist.map((item, index) => {
                                    return (
                                        <li className='list-tunure-item'>
                                            <div className='item-content'>
                                                <div className='left'>Nhiệm kỳ {item.tunure}</div>
                                                <div className='right'>
                                                    <button className='btn btn-primary' onClick={() => this.openModalListMember()}>Ds hội viên</button>
                                                    <button className='btn btn-primary'onClick={() => this.openModalListCommitee()}>Ban chấp hành</button>
                                                    <button className='btn btn-warning' onClick={() => this.openModalEdit(item.id)}>
                                                        <img src={pen}/>
                                                    </button>
                                                    {item.check === false && 
                                                        <button className='btn btn-danger'
                                                            onClick={() => this.handledelete(item.id)}
                                                        ><i className='fas fa-trash'></i></button>
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            
                        </div>

                        {/* modal add */}
                        {this.state.openmodaladd === true &&
                            <AddTunure 
                                openModalAdd={this.openModalAdd}
                                gettunures={this.gettunures}
                            />
                        }

                        {/* modal edit */}
                        {this.state.openmodaledit === true &&
                            <EditTunure 
                                openModalEdit={this.openModalEdit}
                                gettunures={this.gettunures}
                                id={this.state.id}
                            />
                        }

                        {/* modal list member */}
                        {
                            this.state.openmodallistmember && this.state.openmodallistmember === true &&
                            <div className='modallistmember'>
                                <ListMember openModalListMember={this.openModalListMember}/>
                            </div>
                        }

                        {/* List commitee */}
                        {
                            this.state.openmodallistcommitee && this.state.openmodallistcommitee === true &&
                            <div className='modallistmember'>
                                <ListCommitee openModalListCommitee={this.openModalListCommitee}/>
                            </div>
                        }
                    </div>
                </div>

                <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTunure);
