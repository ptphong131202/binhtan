import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import { getAllUser, createNewUserService, deleteUserService, editUserService } from "../../services/userService";
import ModelUser from './ModelUser';
import ModelEditUser from './ModelEditUser';
class UserManage extends Component
{
    /***
    * 1 constructor -> init state
    * 2 did mount -> set state after render screen
    * state save type
    * 3 render 
    */
    // constructor
    constructor ( props )
    {
        super();
        this.state = {
            arrayUsers: [],
            isOpenModalUsers: false,
            isOpenModalEditUsers: false,
            userEdit: {},
        }
    }

    async componentDidMount ()
    {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () =>
    {
        let response = await getAllUser( "ALL" );
        if ( response && response.errCode === 0 )
        {
            this.setState( {
                arrayUsers: response.users
            } )
        }
    }
    // handle add new users
    handleAddNewUser = async () =>
    {
        this.setState( {
            isOpenModalUsers: true,
        } )
    }

    // togge user
    toggleUserModel = () =>
    {
        this.setState( {
            isOpenModalUsers: !this.state.isOpenModalUsers,
        } )
    }

    toggleUserEditModel = () =>
    {
        this.setState( {
            isOpenModalEditUsers: !this.state.isOpenModalEditUsers,
        } )
    }
    createNewUser = async ( data ) =>
    {
        try
        {
            let response = createNewUserService( data );
            if ( response && response.errCode !== 0 )
            {
                this.setState( {
                    isOpenModalUsers: false,
                } )
                await this.getAllUserFromReact();

            }
            else
            {
                this.setState( {
                    isOpenModalUsers: false,
                } )
            }
            await this.getAllUserFromReact();
        }
        catch ( err )
        {
            console.log( err );
        }
    }

    handleDeleteUser = async ( user ) =>
    {
        try
        {
            let response = await deleteUserService( user.id );
            if ( response && response.errCode === 0 )
            {
                await this.getAllUserFromReact();
            }
            else
            {
                alert();
            }
        }
        catch ( err )
        {
            console.log( err );
        }
    }
    handleEditUser = ( user ) =>
    {
        this.setState( {
            isOpenModalEditUsers: true,
            userEdit: user,
        } )
    }

    doEditUser = async ( user ) =>
    {
        try
        {
            let response = await editUserService( user );
            if ( response && response.errCode === 0 )
            {
                this.setState( {
                    isOpenModalEditUsers: false,
                } )
            }
        }
        catch ( e )
        {
            console.log( e );
        }
        await this.getAllUserFromReact();
    }

    render ()
    {
        let arrayUsers = this.state.arrayUsers;
        return (
            <div className="users-container container userManage" >
                <ModelUser
                    isOpen={ this.state.isOpenModalUsers }
                    toggleFromParent={ this.toggleUserModel }
                    createNewUser={ this.createNewUser }
                />
                { this.state.isOpenModalEditUsers &&
                    <ModelEditUser
                        isOpen={ this.state.isOpenModalEditUsers }
                        toggleFromParent={ this.toggleUserEditModel }
                        currentUser={ this.state.userEdit }
                        editUser={ this.doEditUser }
                    />
                }
                <div className="title text-center">manage user</div>
                <div className=''>
                    <button className='btn  px-2 adduser'
                        onClick={ () => this.handleAddNewUser() }> <i className="fas fa-plus"></i> Add new user</button>
                </div>
                <table className="table container mt-3 table-striped  table-bordered table-manager">
                    <thead className="thead-dark text-center">
                        <tr className="thead-dark text-center bg-th">
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { arrayUsers && arrayUsers.map( ( item, index ) =>
                        {
                            return (
                                <>
                                    <tr>
                                        <th scope="row">{ index + 1 }</th>
                                        <td className='email'>{ item.email }</td>
                                        <td className='name'>{ item.firstName }</td>
                                        <td className='name'>{ item.lastName }</td>
                                        <td className='phone'>{ item.phonenumber }</td>
                                        <td ><p className='address'>{ item.address }</p></td>
                                        <td className='action'>
                                            <button type='submit' className='button buttonEdit' onClick={ () => { this.handleEditUser( item ) } }><i className='fas fa-pencil-alt'></i></button>
                                            <button type='submit' className='button buttonDelete' onClick={ () => { this.handleDeleteUser( item ) } }><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                </>
                            )
                        } ) }

                    </tbody>
                </table>

            </div>
        );
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

export default connect( mapStateToProps, mapDispatchToProps )( UserManage );
