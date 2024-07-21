import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; // fomat language
import { LANGUAGE, CRUD_ACTION, CommonUtils } from '../../../utils'; // vi or en
import { changeLanguage } from '../../../store/actions'; // change language
import { connect } from 'react-redux';
import "./AdminSCSS.scss";
import background from "../../../assets/bg.jpg"
class AdminHome extends Component {
    // change language
    changeLanguage = (language) => {
        // fire redux event: action
        this.props.changeLanguageApp(language); // prop bettween redux and react
    }

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
        };
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

    // preview image
    openPreviewImage = () => {
        if (!this.state.previewImg) return;
        this.setState({
            isOpen: true
        })
    }

    

    render() {
        return (
            <> 
            <title><FormattedMessage id="menu.admin.home-admin" /></title>
                <div className='content-box'>
                    <div className='home-admin' style={{ backgroundImage: `url(${this.state.image})` }}>
                        <div className='name-c'>CHI HỘI SINH VIÊN BÌNH TÂN </div>
                        <div className='name-t'>gắn kết như tình thân </div>
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
