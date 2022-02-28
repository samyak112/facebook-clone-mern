import React, { useEffect,useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { bindActionCreators } from 'redux';
import {action} from '../state/index'
const useData = () => {
    const data_check = useSelector(state => state.data)
    const dispatch = useDispatch();
    const {auth_checking,user_data} = bindActionCreators(action,dispatch)
    const [alldata, setalldata] = useState({});
    const forgettingdata = async() =>{
            
    const res = await fetch('/getdata',{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'x-auth-token':localStorage.getItem('token')
        }
    })
    const data = await res.json();
    var data_size = Object.keys(data.userdata).length;
        if(data_size > 0){
            setalldata(data.userdata)
        }
        else{
            setalldata({})        
        }
    }
        // made a custom hook to transfer this data to every component without the need of copying and pasting this code everywhere
        useEffect(()=>{
            forgettingdata()
        },[])
        // yaha useeffect m [] islie lagaya h taaki ye infinite times run na ho

        // return hmesha use effect ke baad hi kaam karta h
        return alldata
}
export default useData;
