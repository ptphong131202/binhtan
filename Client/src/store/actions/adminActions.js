import actionTypes from './actionTypes';
import
{
    getAllcodeService, createNewUserService,
    getAllUser, deleteUserService, editUserService,
    getTopDoctorHomeService, getAllDoctor, saveDetailDoctor,
    getAllSpecialty, getAllClinic
} from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// gender

export const fetchGenderStart = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_GENDER_START } );
            let res = await getAllcodeService( "GENDER" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchGenderSuccess( res.data ) );
            }
            else
            {
                dispatch( fetchGenderFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchGenderFailed() );
            console.log( err );
        }
    }
}


export const fetchGenderSuccess = ( genderData ) => ( {
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
} )

export const fetchGenderFailed = () => ( {
    type: actionTypes.FETCH_GENDER_FAILED
} )

export const fetchPositionStart = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_POSITION_START } );
            let res = await getAllcodeService( "POSITION" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchPositionSuccess( res.data ) );
            }
            else
            {
                dispatch( fetchPositionFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchPositionFailed() );
            console.log( err );
        }
    }
}


export const fetchPositionSuccess = ( positionData ) => ( {
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
} )

export const fetchPositionFailed = () => ( {
    type: actionTypes.FETCH_POSITION_FAILED
} )

export const fetchRoleStart = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_ROLE_START } );
            let res = await getAllcodeService( "ROLE" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchRoleSuccess( res.data ) );
            }
            else
            {
                dispatch( fetchRoleFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchRoleFailed() );
            console.log( err );
        }
    }
}


export const fetchRoleSuccess = ( RoleData ) => ( {
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
} )

export const fetchRoleFailed = () => ( {
    type: actionTypes.FETCH_ROLE_FAILED
} )

export const createNewUser = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await createNewUserService( data );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Create new user success!" );
                dispatch( saveUserSuccess() );
                dispatch( fetchAllUserStart() );
            }
            else
            {
                dispatch( saveUserFailed() );
            }
        }
        catch ( err )
        {
            dispatch( saveUserFailed() );
            console.log( err );
        }
    }
}

export const saveUserSuccess = () => ( {
    type: actionTypes.CREATE_USER_SUCCESS
} )


export const saveUserFailed = () => ( {
    type: actionTypes.CREATE_USER_FAILED
} )

export const fetchAllUserStart = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await getAllUser( "ALL" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchAllUserSuccess( res.users.reverse() ) );
            }
            else
            {
                dispatch( fetchAllUserFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchAllUserFailed() );
            console.log( err );
        }
    }
}

export const fetchAllUserSuccess = ( inputData ) => ( {
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: inputData
} )


export const fetchAllUserFailed = () => ( {
    type: actionTypes.FETCH_ALL_USERS_FAILED
} )

export const deleteUser = ( userid ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await deleteUserService( userid );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Delete user success!" );
                dispatch( deleteUserSuccess() );
                dispatch( fetchAllUserStart() );
            }
            else
            {
                toast.error( "Delete user error!" );
                dispatch( deleteUserFailed() );
            }
        }
        catch ( err )
        {
            toast.error( "Delete user error!" );
            dispatch( deleteUserFailed() );
            console.log( err );
        }
    }
}
export const deleteUserSuccess = () => ( {
    type: actionTypes.DELETE_USER_SUCCESS,
} )


export const deleteUserFailed = () => ( {
    type: actionTypes.DELETE_USER_FAILED
} )




export const editAUser = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await editUserService( data );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Update user success!" );
                dispatch( updateUserSuccess() );
                dispatch( fetchAllUserStart() );
            }
            else
            {
                toast.error( "Update user error!" );
                dispatch( updateUserFailed() );
            }
        }
        catch ( err )
        {
            toast.error( "Update user error!" );
            dispatch( updateUserFailed() );
            console.log( err );
        }
    }
}
export const updateUserSuccess = () => ( {
    type: actionTypes.EDIT_USER_SUCCESS,
} )


export const updateUserFailed = () => ( {
    type: actionTypes.EDIT_USER_FAILED
} )

export const fetchTopDoctorHome = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await getTopDoctorHomeService( "20" );
            if ( res && res.errCode === 0 )
            {
                dispatch( {
                    type: actionTypes.FETCH_TOP_DOCTOR_USERS_SUCCESS,
                    dataDoctors: res.data
                } );
            }
            else
            {
                dispatch( {
                    type: actionTypes.FETCH_TOP_DOCTOR_USERS_FAILED
                } );
            }
        }
        catch ( err )
        {
            console.log( err );
            dispatch( {
                type: actionTypes.FETCH_TOP_DOCTOR_USERS_FAILED
            } );
        }
    }
}



export const fetchAllDoctor = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await getAllDoctor();
            if ( res && res.errCode === 0 )
            {
                dispatch( {
                    type: actionTypes.FETCH_ALL_DOCTOR_USERS_SUCCESS,
                    dataAllDoctor: res.data
                } );
            }
            else
            {
                dispatch( {
                    type: actionTypes.FETCH_ALL_DOCTOR_USERS_FAILED
                } );
            }
        }
        catch ( err )
        {
            console.log( err );
            dispatch( {
                type: actionTypes.FETCH_ALL_DOCTOR_USERS_FAILED
            } );
        }
    }
}



export const saveInforDetailDoctor = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await saveDetailDoctor( data );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Save information doctor success!" );
                dispatch( {
                    type: actionTypes.SAVE_DOCTOR_INFOR_SUCCESS,
                } );
            }
            else
            {
                toast.error( "Save information doctor error!" );
                dispatch( {
                    type: actionTypes.SAVE_DOCTOR_INFOR_FAILED
                } );
            }
        }
        catch ( err )
        {
            console.log( err );
            toast.error( "Save information doctor success!" );
            dispatch( {
                type: actionTypes.SAVE_DOCTOR_INFOR_FAILED
            } );
        }
    }
}



export const fetchAllScheduleHour = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await getAllcodeService( "TIME" );
            if ( res && res.errCode === 0 )
            {
                dispatch( {
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                } );
            }
            else
            {
                dispatch( {
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                } );
            }
        }
        catch ( err )
        {
            console.log( err );
            dispatch( {
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            } );
        }
    }
}




export const getRquiredDoctorInfor = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START } );
            let resPrice = await getAllcodeService( "PRICE" );
            let resPayment = await getAllcodeService( "PAYMENT" );
            let resProvince = await getAllcodeService( "PROVINCE" );
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if ( resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0 )
            {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                }
                dispatch( fetchRequiredDoctorInforSuccess( data ) );
            }
            else
            {
                dispatch( fetchRequiredDoctorInforFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchRequiredDoctorInforFailed() );
            console.log( err );
        }
    }
}


export const fetchRequiredDoctorInforSuccess = ( requiredData ) => ( {
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: requiredData
} )

export const fetchRequiredDoctorInforFailed = () => ( {
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
} )