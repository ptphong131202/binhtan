import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as action from "../../../store/actions";
import { LANGUAGE, CRUD_ACTION, CommonUtils } from '../../../utils'; // vi or en
import { changeLanguage } from '../../../store/actions'; // change language

import Select from 'react-select';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import "./ManageDoctor.scss"
import { getDetailInforDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */ );



class ManageDoctor extends Component
{
    // constructor
    constructor ( props )
    {
        super();
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            discription: '',
            hasOldData: false,
            action: '',

            listDoctor: [],
            listPrice: [],
            listProvince: [],
            listPayment: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClicnic: '',
            addressclicnic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        }
    }

    componentDidMount ()
    {
        this.props.fetchAllDoctor();
        this.props.getRquiredDoctorInfor();
    }

    buildInputSelect = ( data, type ) =>
    {
        let result = [];
        let { language } = this.props;
        if ( data && data.length > 0 )
        {
            if ( type === "USERS" )
            {
                data.map( ( item, index ) =>
                {
                    let object = {};
                    let labelEn = `${ item.lastName } ${ item.firstName }`;
                    let labelVi = `${ item.firstName } ${ item.lastName }`;
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push( object )
                } )
            }
            if ( type === "PRICE" )
            {
                data.map( ( item, index ) =>
                {
                    let object = {};
                    let labelEn = `${ item.valueEn }`;
                    let labelVi = `${ item.valueVi }`;
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push( object )
                } )
            }
            if ( type === "PAYMENT" || type === "PROVINCE" )
            {
                data.map( ( item, index ) =>
                {
                    let object = {};
                    let labelEn = `${ item.valueEn }`;
                    let labelVi = `${ item.valueVi }`;
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push( object )
                } )
            }

            if ( type === "SPECIALTY" || type === "CLINIC" )
            {
                data.map( ( item, index ) =>
                {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push( object )
                } )
            }

        }
        return result;
    }
    getbuildInputSelect = () =>
    {
        let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
        let dataSelect = this.buildInputSelect( this.props.allDoctorRedux, "USERS" );
        let dataSelectPrice = this.buildInputSelect( resPrice, "PRICE" );
        console.log( dataSelectPrice )
        let dataSelectPayment = this.buildInputSelect( resPayment, "PAYMENT" );
        let dataSelectProvince = this.buildInputSelect( resProvince, "PROVINCE" );
        let dataSelectSpecialty = this.buildInputSelect( resSpecialty, "SPECIALTY" );
        let dataSelectClinic = this.buildInputSelect( resClinic, "CLINIC" );
        this.setState( {
            listDoctor: dataSelect,
            listPrice: dataSelectPrice,
            listPayment: dataSelectPayment,
            listProvince: dataSelectProvince,
            listSpecialty: dataSelectSpecialty,
            listClinic: dataSelectClinic,
        } )
    }
    componentDidUpdate ( prevProps, prevState )
    {
        if ( prevProps.allDoctorRedux !== this.props.allDoctorRedux )
        {
            let dataSelect = this.buildInputSelect( this.props.allDoctorRedux, "USERS" );
            this.setState( {
                listDoctor: dataSelect
            } )
        }
        if ( prevProps.language !== this.props.language )
        {
            this.getbuildInputSelect();
        }
        if ( prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor )
        {
            this.getbuildInputSelect();
        }
    }


    handleEditorChange = ( { html, text } ) =>
    {
        this.setState( {
            contentMarkdown: text,
            contentHTML: html,
        } )
    }

    handleSaveContentMarkdown = () =>
    {
        let { hasOldData } = this.state;

        this.props.saveInforDetailDoctor( {
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            discription: this.state.discription,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedPayment.value,
            selectedPayment: this.state.selectedProvince.value,
            nameClicnic: this.state.nameClicnic,
            addressclicnic: this.state.addressclicnic,
            note: this.state.note,
            clinicId: this.state.selectedClinic.value,
            specialtyId: this.state.selectedSpecialty.value,

        } )
    }

    handleChangeSelect = async ( selectedDoctor ) =>
    {
        this.setState( { selectedDoctor } );
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
        let res = await getDetailInforDoctor( selectedDoctor.value );
        if ( res && res.data && res.data.Markdown )
        {
            let markdown = res.data.Markdown;
            let addressclicnic = '', nameClicnic = '',
                note = '', paymentId = '', priceId = '',
                provinceId = '', selectedPrice = '', selectedPayment = '',
                selectedClinic = '', clinicId = '',
                selectedProvince = '', specialtyId = '', selectedSpecialty = '';
            if ( res.data.Doctor_infor )
            {
                addressclicnic = res.data.Doctor_infor.addressClinic;
                nameClicnic = res.data.Doctor_infor.nameClinic;
                note = res.data.Doctor_infor.note;
                paymentId = res.data.Doctor_infor.paymentId;
                priceId = res.data.Doctor_infor.priceId;
                provinceId = res.data.Doctor_infor.provinceId;
                specialtyId = res.data.Doctor_infor.specialtyId;
                clinicId = res.data.Doctor_infor.clinicId;

                selectedPrice = listPrice.find( item =>
                {
                    return item && item.value === priceId
                } )

                selectedPayment = listPayment.find( item =>
                {
                    return item && item.value === paymentId
                } )

                selectedProvince = listProvince.find( item =>
                {
                    return item && item.value === provinceId
                } )
                selectedSpecialty = listSpecialty.find( item =>
                {
                    return item && +item.value === +specialtyId
                } )

                selectedClinic = listClinic.find( item =>
                {
                    return item && +item.value === + clinicId
                } )

            }
            this.setState( {
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.ContentMarkdown,
                discription: markdown.description,
                hasOldData: true,
                nameClicnic: nameClicnic,
                note: note,
                addressclicnic: addressclicnic,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            } )
        }
        else
        {
            this.setState( {
                contentHTML: '',
                contentMarkdown: '',
                discription: '',
                hasOldData: false,
                selectedPrice: '',
                selectedProvince: '',
                selectedPayment: '',
                nameClicnic: '',
                addressclicnic: '',
                selectedSpecialty: '',
                note: '',
                selectedClinic: '',
            } )
        }
    };

    handleChangeSelectDoctorInfor = async ( selectedDoctor, name ) =>
    {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[ stateName ] = selectedDoctor;
        this.setState( stateCopy );
    }
    handleOnchangeDescription = ( event, id ) =>
    {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        } )
    }

    render ()
    {
        console.log( this.props )
        return (
            < React.Fragment >
                <head>
                    <title>Quản lý bác sĩ</title>
                </head>
                <div className='container manage-doctor ' >
                    <h3 className='text-center text-primary pt-5 pb-3 fw-bold mt-3'><FormattedMessage id="admin.manage-doctor.title" /></h3>
                    <div className='more-infor'>
                        <div className='control-left form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.select-doctor" />  </label>
                            <Select
                                value={ this.state.selectedDoctor }
                                onChange={ this.handleChangeSelect }
                                options={ this.state.listDoctor }
                                placeholder={ <FormattedMessage id="admin.manage-doctor.select-doctor" /> }
                            />
                        </div>
                        <div className='control-right form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                            <textarea className='form-control'
                                onChange={ ( event ) => this.handleOnchangeDescription( event, "discription" ) }
                                value={ this.state.discription } rows={ 4 }
                            >
                            </textarea>
                        </div>

                    </div>
                    <div className='more-infor-extra mt-3'>
                        <div className='row'>
                            <div className='col-4 form-group  '>
                                <label><FormattedMessage id="admin.manage-doctor.choose-price" /></label>
                                <Select
                                    options={ this.state.listPrice }
                                    value={ this.state.selectedPrice }
                                    onChange={ this.handleChangeSelectDoctorInfor }
                                    placeholder={ <FormattedMessage id="admin.manage-doctor.choose-price" /> }
                                    name="selectedPrice"
                                />
                            </div>
                            <div className='col-4 form-group   '>
                                <label><FormattedMessage id="admin.manage-doctor.choose-payment" /></label>
                                <Select
                                    options={ this.state.listPayment }
                                    value={ this.state.selectedPayment }
                                    onChange={ this.handleChangeSelectDoctorInfor }
                                    placeholder={ <FormattedMessage id="admin.manage-doctor.choose-payment" /> }
                                    name="selectedPayment"
                                />
                            </div>
                            <div className='col-4 form-group   '>
                                <label><FormattedMessage id="admin.manage-doctor.choose-province" /></label>
                                <Select
                                    options={ this.state.listProvince }
                                    value={ this.state.selectedProvince }
                                    onChange={ this.handleChangeSelectDoctorInfor }
                                    placeholder={ <FormattedMessage id="admin.manage-doctor.choose-province" /> }
                                    name="selectedProvince"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-8 '>
                            <div className='row'>
                                <div className='col-6 mt-2  form-group '>
                                    <label><FormattedMessage id="admin.manage-doctor.name-clinic" /> </label>
                                    <input className='form-control'
                                        onChange={ ( event ) => this.handleOnchangeDescription( event, "nameClicnic" ) }
                                        value={ this.state.nameClicnic }
                                    />
                                </div>
                                <div className='col-6 mt-2  form-group '>
                                    <label><FormattedMessage id="admin.manage-doctor.address-clinic" /></label>
                                    <input className='form-control'
                                        onChange={ ( event ) => this.handleOnchangeDescription( event, "addressclicnic" ) }
                                        value={ this.state.addressclicnic } />
                                </div>


                                <div className='col-6 mt-2 form-group   '>
                                    <label>Tên Chuyên khoa</label>
                                    <Select
                                        options={ this.state.listSpecialty }
                                        value={ this.state.selectedSpecialty }
                                        onChange={ this.handleChangeSelectDoctorInfor }
                                        name="selectedSpecialty"
                                    />
                                </div>
                                <div className='col-6 mt-2 form-group   '>
                                    <label>Cơ sở y tế </label>
                                    <Select
                                        options={ this.state.listClinic }
                                        value={ this.state.selectedClinic }
                                        onChange={ this.handleChangeSelectDoctorInfor }
                                        name="selectedClinic"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className='col-4 mt-2 form-group '>
                            <label>Note</label>
                            <textarea
                                className='form-control'
                                onChange={ ( event ) => this.handleOnchangeDescription( event, "note" ) }
                                value={ this.state.note }
                                rows={ 4 }
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="markdown mt-3">
                        <MdEditor
                            style={ { height: '250px' } }
                            renderHTML={ text => mdParser.render( text ) }
                            onChange={ this.handleEditorChange }
                            value={ this.state.contentMarkdown }
                        />
                    </div>

                    <p className='text-center py-3'>
                        <button
                            className={ this.state.hasOldData === true ? 'save-content-doctor' : 'create-content-doctor' }
                            onClick={ () => this.handleSaveContentMarkdown() }
                        >{ this.state.hasOldData === true ? <FormattedMessage id="admin.manage-doctor.add" /> : <FormattedMessage id="admin.manage-doctor.save" /> }</button>
                    </p>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        allDoctorRedux: state.admin.allDoctor,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        getRquiredDoctorInfor: () => dispatch( action.getRquiredDoctorInfor() ),
        fetchAllDoctor: () => dispatch( action.fetchAllDoctor() ),
        saveInforDetailDoctor: ( data ) => dispatch( action.saveInforDetailDoctor( data ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( ManageDoctor );
