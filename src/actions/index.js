import * as loginTypes from '../constants/LoginActionTypes';
// import * as pageTypes from '../constants/PageActionTypes';
import axios from "axios";

//const serverUrl="http://localhost:6003";
const serverUrl="";
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function LoginValidate(status) {
  return function (dispatch) {
    dispatch({
      type: loginTypes.LOGIN_REJECTED,
      payload: ({
        errorMessage:status.errorMessage,
        error:status.error
      })
    });
  }
}

export function loginUser(email, password) {
  return function (dispatch) {
    dispatch({
      type: loginTypes.LOGIN_PROCESS
    });
    const encodedString = new Buffer(password).toString('base64');
    var requstBody = {
      email: email,
      password: encodedString
  };
    axios.get(serverUrl+'/loginrequest?email='+requstBody.email+'&pass='+requstBody.password)
      .then((response) => {
        console.log(response);
        let token = response.data.isauthenticated;
        if (token) {
          dispatch({
            type: loginTypes.LOGIN_FULFILLED,
            payload: {
              data:response.data,
              email: email,
              username:response.data.username,
              empId:response.data.uid,
              message:response.data.message,
            }
          }); 
      //     dispatch(getAllData());

        } else {
          dispatch({
            type: loginTypes.LOGIN_REJECTED,
            payload: {
              error:true,
              errorMessage:response.data.message
            }
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: loginTypes.LOGIN_REJECTED,
          payload: err
        })
      })
  }
}



export function logOut() {
  return function (dispatch) {

    dispatch({
      type: loginTypes.LOGOUT,
      payload: {
        email: "",
        password: "",
        token: ""
      }
    });

  }
}