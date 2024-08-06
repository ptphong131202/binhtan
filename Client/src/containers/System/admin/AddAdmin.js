import React, { Component } from 'react';
import { CommonUtils } from '../../../utils'; // vi or en
import { connect } from 'react-redux';
import Select from 'react-select';
import { getallcode } from '../../../services/userService';
import { gettunure, postAdmin } from '../../../services/adminService';
import { toast } from 'react-toastify';

class AddAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
            keyPosition: "",
            listPosition: [],
            Allcode: [],
        };
    }
    async componentDidMount() {
        await this.gettunures();
        let result = [
            {label: "Nam", value: "M"},
            {label: "Nữ", value: "F"},
            {label: "Khác", value: "O"}
        ]
        this.setState({
            listGender: result
        })

        await this.getAllCodes();
        await this.getAllCodes();
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

    handelcheckstate =  () =>{
        let check = true;

        let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(this.state.email <= 0 ){
            alert("Vui lòng nhập email!");
        }
        else if(re.test(this.state.email) === false){
            alert("Vui lòng nhập đúng định dạng email!");
            check = false;
        }
        else if(this.state.password.length < 7){
            alert("Vui lòng nhập mật khẩu lớn hơn hoạc bằng 8 ký tự!");
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
            let res = await postAdmin({
                email: this.state.email,
                password: this.state.password,
                fullName: this.state.fullName,
                gender: this.state.gender,
                phone: this.state.phone,
                image: this.state.image,
                position: this.state.position,
                tunure: this.state.tunure,
                biography: this.state.biography
            })
    
            if(res && res.errCode === 0) {
                toast.success("Thêm thành viên mới thành công!");
                await this.props.openAddAdmin();
                await this.props.getAlladmin();
            }
            else if(res && res.errCode === 3) {
                toast.error("Email đã tồn tại!");
            }
            else{
                toast.error("Thêm thành viên mới không thành công!");
                await this.props.openAddAdmin();
            }
        }
        
    }

   
    render() {
        return (
            <> 
                <div className='add-admin'>
                        <div className='add-admin-content'>
                            <h1 className='title'>Thêm thành viên </h1>
                            <div className='form'>
                                    <div className='form-group'>
                                        <label>Email: </label>
                                        <input name='email'
                                         onChange={(event) => this.handleonchanginput(event, "email")} type='email'/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Mật khẩu: </label>
                                        <input name='password'
                                         onChange={(event) => this.handleonchanginput(event, "password")} type='password'/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Họ tên: </label>
                                        <input name='fullName' 
                                        onChange={(event) => this.handleonchanginput(event, "fullName")} type='text'/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Điện thoại: </label>
                                        <input name='phone'
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
                                                <textarea name='biography' onChange={(event) => this.handleonchanginput(event, 'biography')}></textarea>
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
                                        </div>
                                    </div>

                            </div>

                            <div className='button'>
                                <button className='btn btn-primary' onClick={() => this.handleSave()}>Thêm</button>
                                <button className='btn btn-dark' onClick={this.props.openAddAdmin}>Hủy</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddAdmin);
