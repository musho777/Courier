export const ErrorReg = (error) =>{
    return {
        type:'ErrorReg',
        error,
    }
}

export const ErrorConfirmEmail = (error) =>{
    return {
        type:'ErrorConfirmEmail',
        error,
    }
}

export const ErrorLogin = (error) =>{
    return {
        type:'ErrorLogin',
        error
    }
}
export const ErrorResetPassword = (error) =>{
    return {
        type:'ErrorResetPassword',
        error
    }
}