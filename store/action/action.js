import { email } from "../../src/utils/validators";
import { ErrorConfirmEmail, ErrorLogin, ErrorReg, ErrorResetPassword } from "./errorAction";
import { StartConfirmMail, StartLogin, startReg, StartResetPassword } from "./startAction";
import { SuccessLogin, SuccessReg, SuccessResetPassword, SuccessVery } from "./successAction";

let auth = 'http://92.51.39.155/api/v1/auth'
const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};
export const RegAction = (data) =>{
    return (dispatch) =>{
        dispatch(startReg())
        let body = {
            "email": data.email,
            "phone": data.phone,
            "password": data.password,
            "password_confirmation":data.password_confirmation
        };

        fetch(`${auth}/register`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then((r)=>{
            if(r?.message === 'Success.'){
                dispatch(SuccessReg(r))
            }
            else {
                if(r.message.includes('The email has already been taken.')){
                    dispatch(ErrorReg('The email has already been taken.'))
                }
                else if (r.message.includes('The phone has already been taken.')){
                    dispatch(ErrorReg('The phone has already been taken.'))
                }
            }
        })
        .catch((error)=>{
            dispatch(ErrorReg('network error'))
        })
    }
}

export const ConfirmEmailAction = (code) =>{
    return (dispatch) =>{
        dispatch(StartConfirmMail())
        let body = {
            "code": code
        };
        fetch(`${auth}/confirm`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then((r)=>{
            if(r?.message === 'Success.'){
                dispatch(SuccessVery(r))
            }
        })
        .catch((error)=>{
            dispatch(ErrorConfirmEmail('network error'))
        })
        ;
    }
}

export const LoginAction = (data) =>{
    return (dispatch) =>{
        dispatch(StartLogin())
        let body = {
            "email": data.email,
            "password": data.password
        };
        
        fetch(`${auth}/login`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then((r)=>{
            if(r.message.includes('Wrong credentials.')){
                dispatch(ErrorLogin('Wrong credentials.'))
            }
            else if(r.message.includes('Inactive account.')){
                dispatch(ErrorLogin('Inactive account.'))
            }
            else {
                dispatch(SuccessLogin(r))
            }
        })
        .catch((error)=>{
            dispatch(ErrorLogin('network error'))
        })
    }
}

export const ResetPasswordAction = (email) =>{
    return (dispatch) =>{
        dispatch(StartResetPassword())
        let body = {
            "email": email
        };
        fetch(`${auth}/forgot`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then((r)=>{
            dispatch(SuccessResetPassword(r))
        })
        .catch((error)=>{
            dispatch(ErrorResetPassword('network error'))
        })
        ;
    }
}