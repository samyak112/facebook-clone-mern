import React , {useState} from 'react';
import { VisibilityOff,Visibility } from '@mui/icons-material';
import forgotcss from './forgot_password.module.css'
import { useNavigate } from 'react-router-dom';
import {Alert,Button} from 'react-bootstrap'


export default function Forgot_password() {
  const Navigate = useNavigate();

  const [userforgotpassword, setforgotpassword] = useState({email:''});

  const handleforgotpassword = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setforgotpassword({...userforgotpassword,[name]:value})
    console.log(value)

}

const postforgotpassword = async(e)=>{
    // console.log('yaha to phoch gaya')
    e.preventDefault(); 
    const {email} = userforgotpassword;

    const res = await fetch('/forgot_password',{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            email:email
        }),
        
    })
    
    const data = await res.json();
    console.log(data)
}

  return(
    <>
    <div className={forgotcss.main}>
        <div id={forgotcss.item_1} className={forgotcss.box_items}>Find Your Account</div>
        <div id={forgotcss.item_2} className={forgotcss.box_items}>Please enter your email address to search for your account.</div>
        <div id={forgotcss.item_3} className={forgotcss.box_items}><input type="text" name='email' placeholder='Email Address'/></div>
        <div id={forgotcss.item_4} className={forgotcss.box_items}><button id={forgotcss.item_5}>Search</button></div>
    </div>
    </>
  )
}
