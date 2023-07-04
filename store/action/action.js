import { ErrorReg } from "./errorAction";
import { startReg } from "./startAction";
import { SuccessReg } from "./successAction";

let auth = 'http://92.51.39.155/api/v1/auth'
export const RegAction = (data) =>{
    return (dispatch) =>{
        dispatch(startReg())
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
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
            console.log(error)
            dispatch(ErrorReg('network error'))
        })
    }
}