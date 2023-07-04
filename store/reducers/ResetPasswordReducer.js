
const initialState = {
    loading:false,
    success:false,
    error:null,
}
const resetPasswordReducer = (state = initialState, action) => {
    let item = {...state}
    switch (action.type) {
        case 'StartResetPassword':
            item.loading = true,
            item.error = null,
            item.success = false
            break
        case 'SuccessResetPassword':
            console.log('8787878')
            item.loading = false
            item.error = null
            item.success = true
          break
        case 'ErrorResetPassword':
            item.loading = false
            item.error = action.error
            item.success = false
            break
        default:
          break
      }
      return item
}
export default resetPasswordReducer