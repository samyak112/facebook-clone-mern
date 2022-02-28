import React, { Children, Component,useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Route , useNavigate} from 'react-router-dom';
import Home from './Home/Home';
import Landing_page from './login_and_reg/Landing_page/Landing_page';
import {useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux';
import {action} from '../state/index'
import Navbar from './navbar/Navbar';

const Protected_routes_2 = (props) => {
    const Navigate = useNavigate();
    const auth_check = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const {auth_checking,user_data} = bindActionCreators(action,dispatch)

    const private_routes = async() =>{
        const res = await fetch('/getdata',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
                'x-auth-token':localStorage.getItem('token')
            }
        })
        const data = await res.json();
        
        if(data.status == 201){
            {auth_checking('true')}
        }
        else{
            {auth_checking('false')}
        }
    }

    useEffect(()=>{
        private_routes()
    },[])
    
    if (auth_check=='true') {
        return props.children
    } else {
            return <Landing_page/> 
        }


    
}

export default Protected_routes_2
