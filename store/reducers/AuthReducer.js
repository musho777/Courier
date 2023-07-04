
const initialState = {
    loading:false,
    success:false,
    token:null,
    error:null,
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
        default:
          break
      }
      return item
}
export default authReducer