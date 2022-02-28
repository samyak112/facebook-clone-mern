import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { bindActionCreators } from 'redux';
import {action} from '../../../state/index'
function auth() {
    const dispatch = useDispatch();
    const {auth_checking} = bindActionCreators(action,dispatch)


    const private_routes = async() =>{
        const res = await fetch('/authorize',{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json',
                'x-auth-token':localStorage.getItem('token')
            }
        })
        const data = await res.json();
        console.log(data.status)
        if(data.status == 201){
            {auth_checking('true')}
        }
        else{
            {auth_checking('false')}
        }
    }

    useEffect(()=>{
        private_routes()
    })
}

export default auth;
