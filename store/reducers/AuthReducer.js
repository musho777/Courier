
const initialState = {
    loading:false,
    success:false,
    token:null,
    error:null,
    loadingVerf:false,
    successVerf:false,
    errorVerf:null,
    loadingLogin:false,
    sucessLoding:false,
    errorLoading:null
}
const authReducer = (state = initialState, action) => {
    let item = {...state}
    switch (action.type) {
        case 'startReg':
            item.loading = true,
            item.error = null,
            item.success = false
          break
        case 'SuccessReg':
            item.loading = false,
            item.error = null,
            item.success = true
            break
        case 'ErrorReg':
            item.error = action.error
            item.success = false
            item.loading = false
            break
        case 'StartConfirmMail':
            item.error = null
            item.success = false
            item.loading = true
            break
        case 'SuccessConfirmMail':
            item.loadingVerf = false
            item.successVerf = true,
            item.errorVerf = null
            break
        case 'ErrorConfirmEmail':
            item.loadingVerf = false
            item.successVerf = false,
            item.errorVerf = action.error
            break
        case 'StartLogin':
            item.loadingLogin = true
            item.errorLoading = null
            item.sucessLoding = false
            break
        case 'SuccessLogin':
            item.loadingLogin = false
            item.errorLoading = null
            item.sucessLoding = true
            break
        case 'ErrorLogin':
            item.loadingLogin = false
            item.errorLoading = action.error
            item.sucessLoding = false
        default:
          break
      }
      return item
}
export default authReducer