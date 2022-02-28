const data_initial_state = ''
const data_reducer  = (state=data_initial_state,action)=>{
    if(action.type=='user_data'){
        return{
            ...state,
            data: action.payload
        }
    }
    else{
        return state;
    }
}

export default data_reducer