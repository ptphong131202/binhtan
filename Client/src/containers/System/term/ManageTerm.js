import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, words } from 'lodash';
import { toast } from 'react-toastify';
import "../System.scss"
import "./Term.scss"

import pen from "../../../assets/font/pencil.png"

import { getterm } from '../../../services/termService';


import AddTerm from './AddTerm';

class ManageTerm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openadd: false,
            list: []
        };
    }
    
    async componentDidMount(){
        await this.getlistterm("");
    }


    getlistterm = async (word) => {
        let res = await getterm(word);
        if(res && res.errCode ===  0 && res.data.length > 0){
            this.setState({
                list: res.data
            })
        }
        else this.setState({
            list: []
        })
    }


    openAdd = () => {
        this.setState({
            openadd: !this.state.openadd
        })
    }

    

    render() {
        let {openadd, list} = this.state; 
        return (
            <> 
                <title>Quản lý nhiệm kỳ</title>
                <div className='manage-content'>
                    {/* title */}
                    <h1 className='title'>Quản lý nhiệm kỳ</h1> 

                    {/* form search */}
                    <div className='form-search'>
                        <input type='text' placeholder='Nhập để tìm kiếm .... '/>
                        <i className='fas fa-search'></i>
                    </div>

                    {/* btn add */}
                    <div className='buttonadd'>
                        <button className='btn btn-primary' 
                            onClick={() => this.openAdd()}
                        >Thêm nhiệm kỳ</button>
                    </div>

                    {/* list  */}
                    <div className='list-content'>
                        {list && isEmpty(list) && <div className='notlist'>Danh sách trống!</div>}
                        {list && !isEmpty(list) && list.map((item, index) => {
                            return (
                                    <li className='list-item'>
                                        <div className='left'>Nhiệm kỳ {item.title}</div>
                                        <div className='right'>
                                            <button className='btn btn-primary'>Ds hội viên</button>
                                            <button className='btn btn-primary'>Ds ban chấp hành</button>
                                            <img src={pen} title='Chỉnh sửa'/>
                                            <i class="fas fa-trash" title='Xóa'></i>
                                        </div>
                                    </li>
                            )
                        })}
                    </div>

                    {/* add term */}

                    {openadd === true &&
                    
                        <AddTerm
                            openAdd={this.openAdd}
                            getlistterm={this.getlistterm}
                        />
                    }
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTerm);
