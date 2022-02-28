export const auth_checking = (auth)=>{
    return(dispatch)=>{
        dispatch({
            type : 'check_auth',
            payload : auth
        })
    }
}

export const user_data = (data)=>{
    return(dispatch)=>{
        dispatch({
            type : 'user_data',
            payload : data
        })
    }
}