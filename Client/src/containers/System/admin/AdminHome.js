import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; // fomat language
import { LANGUAGE, CRUD_ACTION, CommonUtils } from '../../../utils'; // vi or en
import { changeLanguage } from '../../../store/actions'; // change language
import { connect } from 'react-redux';
import "./AdminSCSS.scss";
import { toast } from 'react-toastify';
import { getbackground,  postbackground, deletebackground } from '../../../services/adminService';
import { isEmpty } from 'lodash';
class AdminHome extends Component {
    // change language
    changeLanguage = (language) => {
        // fire redux event: action
        this.props.changeLanguageApp(language); // prop bettween redux and react
    }

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            imageBase64: '',
            isModal: false,
            isModalSelect: false,
            isListImage: false,
            listImage: []
        };
    }

    async componentDidMount() {
        await this.getbackground();
        this.setState({
            imageBase64: ''
        })
    }

    getbackground = async () => {
        let res = await getbackground();
        if(res && res.errCode === 0 ){
            this.setState({
                listImage: res.data,
                image: res.data[res.data.length - 1].image
            })
        } 
    }

    // event in img for input file 
    handleOnchangeImg = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let getBase64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: getBase64,
                image: getBase64
            })
        }
    }

    handleSave = async () => {
        let res = await postbackground({
            image: this.state.imageBase64
        })
        if(res && res.errCode === 0){
            await this.getbackground();
            this.setState({
                imageBase64: ''
            })
            toast.success("Thay đổi thành công!");
            this.isModalSet();
            this.isModalSelectset();
        }
        else if(res && res.errCode === 1){
            this.setState({
                imageBase64: ''
            })
            toast.error("Vui lòng chọn ảnh thay đổi!");
        }
        else {
            this.setState({
                imageBase64: ''
            })
            toast.error("Thay đổi không thành công!");
            this.isModalSet();
            this.isModalSelectset();
        }

    }

    handleDelete = async (item, status) => {
        if(status === 'delete'){
            let res = await deletebackground(item.id);
            if(res && res.errCode == 1) {
                toast.error("Vui lòng chọn lại ảnh!");
            }
            else if(res && res.errCode === 0){
                toast.success("Xóa ảnh thành công!");
                await this.getbackground();
            }
            else toast.error("xóa ảnh không thành công!")
        }
        else{
            this.setState(
                {
                    image: item.image,
                    imageBase64: item.image
                }
            )
            await deletebackground(item.id);
            await postbackground({
                image: this.state.imageBase64
            })
            await this.getbackground();
            toast.success("Cập nhật ảnh thành công!");

        }
    }   


    isModalSelectset = () => {
        this.setState ({
            isModalSelect: !this.state.isModalSelect,
        })
    }

    isModalSet = () => {
        this.setState({
            isModal: !this.state.isModal,
        })
    }

    isModalSelectImage = () => {
        this.setState({
            isListImage: !this.state.isListImage
        })
    }



    

    render() {
        console.log(this.state.listImage)
        return (
            <> 
            <title><FormattedMessage id="menu.admin.home-admin" /></title>
                <div className='content-box'>
                    <div className='home-admin' style={{ backgroundImage: `url(${this.state.image})` }}>
                        <div className='class-marquee'><marquee width="35%" scrollamount="10" direction="left">Chi hội sinh viên Bình Tân Gắn kết như tình thân!</marquee></div>
                        <div className='add-bg' onClick={() => this.isModalSelectset()}>
                            Thay đổi ảnh nền
                        </div>

                        {this.state.isListImage === true && this.state.isModalSelect === true  ? 
                            <div className='add-bg bg-select' >
                                Thay đổi ảnh nền
                            </div>    : 
                            <div className='add-bg' onClick={() => this.isModalSelectset()}>
                                Thay đổi ảnh nền
                            </div> 
                        }

                        {this.state.isModalSelect  === true && 
                            <div className='select-option-bg' >
                                <p className='close-select'><span onClick={() => this.isModalSelectset()}>x</span></p>
                                <p onClick={() => this.isModalSet()}>Ảnh mới</p>
                                <p onClick={() => this.isModalSelectImage()}>Ảnh trên hệ thống</p>
                            </div>
                        }

                        {this.state.isModal === true && 
                            <div className='modal-add'>
                                <div className='modal-add-content'>
                                    <div className='title'>Thay đổi ảnh nền</div>
                                    <div className='text1 '>Vui lòng chọn ảnh nền mới</div>
                                    <div className='text2'>Ảnh nền vui lòng có kích thước ít nhất 500x500!</div>
                                    <input onChange={(e) => this.handleOnchangeImg(e)} type='file'/>
                                    <div className='buttton'>
                                        <button onClick={() => this.handleSave()}>Lưu thay đổi</button>
                                        <button onClick={() => this.isModalSet()} className='btn2'>Hủy thay đổi</button>
                                    </div>
                                </div>
                            </div>
                        }


                        {this.state.isListImage === true && this.state.isModalSelect === true &&  
                                <>
                                <span onClick={() => this.isModalSelectImage()} className='closelistimage'>x</span>
                                <div className='listImage'>
                                    <div className='listImage-s'>
                                            {this.state.listImage && !isEmpty(this.state.listImage) &&
                                                this.state.listImage.map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <img src={item.image} alt={`image-${index}`}/>
                                                            <div className='select-option-image'>
                                                                <span className='c1' onClick={() => this.handleDelete(item, 'create')}>Chọn</span>
                                                                <span className='c2' onClick={() => this.handleDelete(item, 'delete')}>Gở</span>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                    </div>
                                </div>
                                </>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
