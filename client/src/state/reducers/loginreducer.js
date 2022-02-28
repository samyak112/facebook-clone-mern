const reducer  = (state='false',action)=>{
    if(action.type=='check_auth'){
        return state =  action.payload
    }
    else{
        return state;
    }
}

export default reducer


