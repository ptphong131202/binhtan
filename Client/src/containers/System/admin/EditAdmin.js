import React, { Component } from 'react';
import { CommonUtils } from '../../../utils'; // vi or en
import { connect } from 'react-redux';
import Select from 'react-select';
import { getallcode } from '../../../services/userService';
import { gettunure, putAdmin,getAdminbyid  } from '../../../services/adminService';
import { toast } from 'react-toastify';
import avatar from "../../../assets/OIP.jpg"
class Editdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            fullName: '',
            phone: '',
            gender: '',
            position: '',
            image: null,
            biography: '',
            tunure:"",
            selectedgender: "",
            keyGender: "",
            listGender: [],
            selectedposition: "",
            listPosition: [],
            Allcode: []

        };
    }


    async componentDidMount() {
        await this.getAllCodes();
        await this.getAdminbyids();
        await this.gettunures();
        let result = [
            {label: "Nam", value: "M"},
            {label: "Nữ", value: "F"},
            {label: "Khác", value: "O"}
        ]
        this.setState({
            listGender: result
        })
    }

    getAdminbyids = async() => {
        let res = await getAdminbyid(this.props.id);
        let result = [
            {label: "Nam", value: "M"},
            {label: "Nữ", value: "F"},
            {label: "Khác", value: "O"}
        ]
        console.log(res);
        if(res && res.errCode === 0) {
            let objgender = {};
            result.map((item) => {
                if(item.value === res.data.gender){
                    objgender.label = item.label;
                    objgender.value = item.value;
                }
            })

            let objectPosition = {
                label: res.data.positionAdmin.valueVi, value: res.data.positionAdmin.keyMap
            }
                
            this.setState({
                email: res.data.email,
                fullName: res.data.fullName,
                phone: res.data.phone,
                biography: res.data.biography,
                image: res.data.image===null ? avatar : res.data.image,
                selectedgender: objgender,
                selectedposition: objectPosition,
                gender: res.data.gender,
                position: res.data.position
            })
        }
    }

    gettunures = async () => {
        let res = await gettunure('');
        if(res && res.errCode === 0) {
            this.setState({
                tunure: res.data[res.data.length - 1].id
            })
        }
    }

   

    getAllCodes = async() => {
        let res = await getallcode("POSITION");
        let result = [];
        if(res && res.errCode === 0){
            res.data.map((item, index) => {
                let obj = {};
                obj.label = item.valueVi;
                obj.value = item.keyMap;
                result.push(obj);
            })
        }

        this.setState({
            listPosition: result
        })
    }

    handleChangeSelectGender = (selected) => {
        this.setState({
            selectedgender: selected,
            keyGender: selected.value,
            gender: selected.value,
        })
    }

    handleChangeSelectPosition = (selected) => {
        this.setState({
            selectedposition: selected,
            keyPosition: selected.value,
            position: selected.value,
        })
    }

    // event in img for input file 
    handleOnchangeImg = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let getBase64 = await CommonUtils.getBase64(file);
            this.setState({
                image: getBase64,
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

    handelcheckstate = () =>{
        let check = true;

        let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(this.state.email <= 0 ){
            alert("Vui lòng nhập email!");
        }
        else if(re.test(this.state.email) === false){
            alert("Vui lòng nhập đúng định dạng email!");
            check = false;
        }
        else if(this.state.fullName.length <= 0) {
            alert("Vui lòng nhập họ tên!");
            check = false;
        }
        else if(this.state.phone.length <= 0 ){
            alert("Vui lòng nhập số điện thoại!");
            check = false;
        }  
        else if(this.state.gender.length <= 0) {
            alert("Vui lòng chọn giới tính!");
            check = false;
        }
        else if(this.state.position.length <= 0) {
            alert("Vui lòng chọn Chức vụ!");
            check = false;
        }
        return check;
    }


    handleSave = async() => {
        let check = this.handelcheckstate();
        if( check === true){
            let res = await putAdmin({
                email: this.state.email,
                fullName: this.state.fullName,
                gender: this.state.gender,
                phone: this.state.phone,
                image: this.state.image,
                position: this.state.position,
                biography: this.state.biography,
                id: this.props.id
            })
    
            if(res && res.errCode === 0) {
                toast.success("Cập thành viên mới thành công!");
                await this.props.openEditdmin();
                await this.props.getAlladmin();
            }
            else{
                toast.error("Cập thành viên mới không thành công!");
                await this.props.openEditdmin();
            }
        }
        
    }

   
    render() {
        return (
            <> 
                <div className='add-admin'>
                        <div className='add-admin-content'>
                            <h1 className='title'>Cập nhập thành viên </h1>
                            <div className='form'>
                                    <div className='form-group'>
                                        <label>Email: </label>
                                        <input name='email' value={this.state.email}
                                         onChange={(event) => this.handleonchanginput(event, "email")} type='email'/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Mật khẩu: </label>
                                        <input name='password' disabled
                                         value="hashpassword" type='password'/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Họ tên: </label>
                                        <input name='fullName' value={this.state.fullName}
                                        onChange={(event) => this.handleonchanginput(event, "fullName")} type='text'/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Điện thoại: </label>
                                        <input name='phone' value={this.state.phone}
                                        onChange={(event) => this.handleonchanginput(event, "phone")} type='text'/>
                                    </div>
                                    <div className='form-group avtar'>
                                        <div className='form-group-2'>
                                            <div className='form-group form-group-2-s'>
                                                <label>Giới tính:</label>
                                                <Select
                                                    value={ this.state.selectedgender }
                                                    onChange={ this.handleChangeSelectGender }
                                                    options={ this.state.listGender }
                                                    placeholder="Giới tính"
                                                    name="gender"
                                                    
                                                />
                                            </div>
                                            <div className='form-group form-group-2-st'>
                                                <label>chức vụ:</label>
                                                <Select
                                                    value={ this.state.selectedposition }
                                                    onChange={ this.handleChangeSelectPosition }
                                                    options={ this.state.listPosition }
                                                    placeholder="Chức vụ"
                                                    name="position"
                                                    
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group-2'>
                                            <div className='form-group textarea'>
                                                <label>Tiểu sử:</label>
                                                <textarea name='biography'  value={this.state.biography}
                                                onChange={(event) => this.handleonchanginput(event, 'biography')}>
                                                
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group avtar'>
                                        <label>Ảnh đại diện: </label>
                                        <input type="file" className="form-control" id="reviewImg" hidden
                                                onChange={(event) => this.handleOnchangeImg(event)} />
                                        <label className='label_upload-img' htmlFor='reviewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                        <div className='form-image'>
                                            {this.setState.image !== null &&
                                                <img src={this.state.image}/>
                                            }
                                            {this.setState.image === null &&
                                                <img src={avatar}/>
                                            }
                                        </div>
                                    </div>

                            </div>

                            <div className='button'>
                                <button className='btn btn-primary' onClick={() => this.handleSave()}>Thêm</button>
                                <button className='btn btn-dark' onClick={this.props.openEditdmin}>Hủy</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Editdmin);
