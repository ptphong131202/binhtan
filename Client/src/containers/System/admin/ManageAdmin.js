import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; // fomat language
import { CommonUtils } from '../../../utils'; // vi or en
import { connect } from 'react-redux';
import Footer from '../Footer';
import NavAdmin from './NavAdmin';
import AddAdmin from './AddAdmin';
import pen from "../../../assets/font/pencil.png"

import { getAdmin, deleteadmin } from '../../../services/adminService';
import { isEmpty } from 'lodash';
import EditAdmin from './EditAdmin';
import { toast } from 'react-toastify';


class ManageAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fullName: '',
            phone: '',
            gender: '',
            position: '',
            image: '',
            biography: '',
            tunure:"",
            openaddadmin: false,
            openeditadmin: false,
            listAdmin: [],
            id: ""
        };
    }

    async componentDidMount() {
        await this.getAlladmin('');

    }

    checkGender = (gender) => {
        let genders = [
            {label: "Nam", value: "M"},
            {label: "Nữ", value: "F"},
            {label: "Khác", value: "O"}
        ]
        let GenderAdmin = ''; 
        genders.map((item) => {
            if(item.value === gender){
                GenderAdmin = item.label;
            }
        })
        return GenderAdmin;
    }

    getAlladmin = async(word) => {
        let res = await getAdmin(word);
        if(res && res.errCode === 0) {
            let result =  res.data.reverse();
            this.setState({
                listAdmin: result
            })
        }
        else this.setState({
            listAdmin: []
        })
    }

       // event in img for input file 
    handleOnchangeImg = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let getBase64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImg: objectUrl,
                avatar: getBase64
            })
        }
    }

    handledelete = async(id) => {
        alert("Bạn có chắc rằng muốn xóa thành viên này không!")
            let res = await deleteadmin(id);
            if(res && res.errCode === 0){
                toast.success("Xóa thành viên thành công!");
                await this.getAlladmin("");
            }
            else {
                toast.error("Xóa thành viên không thành công!");
            }
    }

    openAddAdmin = () => {
        this.setState({
            openaddadmin: !this.state.openaddadmin
        })
    }

    openEditdmin = (id) => {
        this.setState({
            openeditadmin: !this.state.openeditadmin,
            id: id
        })
    }

    handleSearch = async (event) =>{
        await this.getAlladmin(event.target.value)
    }


   
    render() {
        let {listAdmin} = this.state;
        return (
            <> 
            <title>Quản lý quản trị viên</title>
            <div className='content-box'>
                <div className='systemAdmin'>
                    <div className='left'>
                        <NavAdmin />
                    </div>
                    <div className='right'>
                        <div className='right-content'>
                            <h1 className='title'>Quản lý quản trị viên</h1>

                            {/* input search */}
                            <div className='form-search'>
                                <div className='form-search-content'>
                                        <input onChange={(event) => this.handleSearch(event)}
                                        type='text' placeholder='Nhập để tìm kiếm'/>
                                        <i className='fas fa-search'></i>
                                </div>
                            </div>

                            {/* add admin */}
                            <button onClick={() => this.openAddAdmin()}
                             className='btn btn-primary'>+ Thêm thành viên</button>
                            {/* list admin */}
                            <div className='list-admin'>
                                <div className='top'>
                                    <li className='li-stt'>#</li>
                                    <li className='li-name'>Họ tên</li>
                                    <li className='li-mail'>Email</li>
                                    <li className='li-gender'>Giới tính</li>
                                    <li className='li-phone'>Điện thoại</li>
                                    <li className='li-position'>Chức vụ</li>
                                    <li className='li-tunure'>Nhiệm kỳ</li>
                                    <li className='li-action'>Hành động</li>
                                </div>
                                <div className='list-admin-content'>
                                    {listAdmin && !isEmpty(listAdmin) && listAdmin.map((item, index) => {
                                        return (
                                            <div className={(index + 1) % 2 === 0  ? "bottom bg-2" : "bottom"}>
                                            <li className='li-stt'>{index + 1}</li>
                                            <li className='li-name'>{item.fullName}</li>
                                            <li className='li-mail'><p>{item.email}</p></li>
                                            <li className='li-gender'>{this.checkGender(item.gender)}</li>
                                            <li className='li-phone'>{item.phone}</li>
                                            <li className='li-position'>{item.positionAdmin.valueVi}</li>
                                            <li className='li-tunure'>{item.tunureAdmin.tunure}</li>
                                            <li className='li-action'>
                                                <button className='btn btn-warning' onClick={() => this.openEditdmin(item.id)}><img src={pen} /></button>
                                                <button className='btn btn-danger' onClick={()=> this.handledelete(item.id)}><i className='fas fa-trash'></i></button>
                                            </li>
                                        </div>
                                        )
                                    })}

                                    {isEmpty(listAdmin) && <div className='emtptylist'>không có thành viên!</div>}

                                   
                                   
                                </div>
                            </div>
                        </div>

                        {/* modal add admin */}
                        {this.state.openaddadmin === true && 
                            <AddAdmin openAddAdmin={this.openAddAdmin} 
                            getAlladmin = {this.getAlladmin}
                            />
                        }

                        {/* modal edit admin */}
                        {this.state.openeditadmin === true && 
                            <EditAdmin openEditdmin={this.openEditdmin} 
                            id={this.state.id}
                            getAlladmin = {this.getAlladmin}
                            />
                        }

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);
