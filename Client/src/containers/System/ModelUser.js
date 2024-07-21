import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModelUser extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        }
    }

    componentDidMount ()
    {
    }

    toggle = () =>
    {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = ( event, id ) =>
    {
        let copyState = { ...this.state };
        copyState[ id ] = event.target.value;

        this.setState( {
            ...copyState
        } );
    }

    checkValideteInput = () =>
    {
        let isValid = true;
        let arrInput = [ "email", "password", "firstName", "lastName", "address" ];
        for ( let i = 0; i < arrInput.length; i++ )
        {
            if ( !this.state[ arrInput[ i ] ] )
            {
                isValid = false;
                alert( "Missing parameter " + arrInput[ i ] + "!" );
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () =>
    {
        let isValid = this.checkValideteInput();
        if ( isValid === true )
        {
            this.props.createNewUser( this.state );
        }
    }
    render ()
    {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='model-user-container'
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create New User </ModalHeader>
                <ModalBody>
                    <div className='row'>

                        <div className='form-group'>
                            <label>E-mail:</label>
                            <input type='text' value={this.state.email}
                                className='form-control'
                                name='email'
                                onChange={( event ) => { this.handleOnchangeInput( event, "email" ) }} />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type='password' value={this.state.password}
                                className='form-control'
                                onChange={( event ) => { this.handleOnchangeInput( event, "password" ) }} />
                        </div>
                        <div className='form-group'>
                            <label>FirstName:</label>
                            <input type='text' value={this.state.firstName}
                                className='form-control'
                                name='firstName'
                                onChange={( event ) => { this.handleOnchangeInput( event, "firstName" ) }} />
                        </div>
                        <div className='form-group'>
                            <label>LastName:</label>
                            <input type='text' value={this.state.lastName}
                                className='form-control'
                                name='lastName'
                                onChange={( event ) => { this.handleOnchangeInput( event, "lastName" ) }} />
                        </div>
                        <div className='form-group addressInput'>
                            <label>Adress:</label>
                            <input type='text' value={this.state.address}
                                className='form-control'
                                name='address'
                                onChange={( event ) => { this.handleOnchangeInput( event, "address" ) }} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='ModalFooter'>
                    <Button color="primary" className='px-2' onClick={() => { this.handleAddNewUser() }}>
                        Add new
                    </Button>{' '}
                    <Button color="secondary" className='px-2' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state =>
{
    return {
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( ModelUser );
