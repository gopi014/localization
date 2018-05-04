import {LOGOUT,LOGIN_RESTORE, LOGIN_PROCESS, LOGIN_REJECTED, LOGIN_FULFILLED } from '../constants/LoginActionTypes'


const initialUserState = {
    loggingIn: false,
    loggedIn: false,
    error: {error:false,errorMessage:""},
    save:{save:false,message:""},
    username:"John Doe",
    empId:"",
    email:"",
};

// User
export default function reducer(state = initialUserState, action) {
  	switch (action.type) {
        case LOGIN_PROCESS:
            return {...state, loggingIn: true, errorMessage: action.payload}
        case LOGIN_REJECTED:
            return {...state, loggingIn: false, error: action.payload}
        case LOGIN_FULFILLED:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                error:false,
                username: action.payload.username,
                empId:action.payload.empId,
                email:action.payload.email
            }
        case LOGIN_RESTORE:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                error: {error:false,errorMessage:""},
                username:"",
                empId:"",
                email:""
            }
            
        case LOGOUT:
            return {
                ...state,
                loggingIn: false,
                loggedIn: false,
                user: action.payload,
                error: {error:false,errorMessage:""},
                username:"",
                empId:"",
                email:""
            }
        default:
          return state
    }
}



