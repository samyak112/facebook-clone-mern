import React , {useState} from 'react';
import { VisibilityOff,Visibility } from '@mui/icons-material';
import './forgot_password.css'
import { useNavigate } from 'react-router-dom';
import {Alert,Button} from 'react-bootstrap'


export default function Forgot_password() {
    const Navigate = useNavigate();

  const [showicon, setshowicon] = useState({icon:<VisibilityOff/>,bool:true,pass:'text'});
  const [userforgotpassword, setforgotpassword] = useState({email:'',new_password:'' , current_password:''});
  const [showalert, setshowalert] = useState({bool:'false' , text:'' , removealert:'false'});



  const Visibility_func = (val)=>{
    if(showicon.bool==true){
        setshowicon({ ...showicon ,icon:<Visibility/>,bool:false,pass:'password'})
    }
    else{
        setshowicon({...showicon ,icon:<VisibilityOff/>,bool:true,pass:'text'})
    }
  } 

  const handleforgotpassword = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setforgotpassword({...userforgotpassword,[name]:value})
    console.log(value)

}

const postforgotpassword = async(e)=>{
    console.log('yaha to phoch gaya')
    e.preventDefault(); 
    const {email,new_password,current_password} = userforgotpassword;

    const res = await fetch('/forgot_password',{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            email:email,new_password:new_password, current_password:current_password
        }),
        
    })
    
    const data = await res.json();
    console.log(data)
    if(data.status === 201){
        Navigate('/');
    }

    else if(data.status === 404){
        setshowalert({...showalert, bool:'true',text:data.message,removealert:'false'})
        console.log('kuch to gadbad h')
    }

    else if(data.status === 403){
        setshowalert({...showalert, bool:'true',text:data.message,removealert:'false'})
        console.log('kuch to gadbad h part 2')
    }

    else{
        console.log('bhai kuch to dikkat h')
    }
    

}

  return <div>
      {showalert.bool=='true' && showalert.removealert=='false' 
            //   if condition
              ? <Alert id='alert_id' > 
                    <div className='alert_items'> {showalert.text} </div> 
                    <Button id='alert_button' className='alert_items' onClick={() => setshowalert({...showalert,removealert:'true' , bool:'false' })}> Close </Button> 
                </Alert> 
            // else condition
              : ''}
      <form className="main_box" >
            <div className="main_box_items" id="item-1">Social Book</div>
            <div className="main_box_items" id="item-2">  FORGOT YOUR PASSWORD?</div>
            <div className="main_box_items" id="item-3">Please fill in the email that you used to register. You will be sent an email with instructions on how to reset your password.</div>
            <div className="main_box_items input_fields" id="item-4" >
                <input  className="password_field" type="email" placeholder="name@example.com" id="email_field" name="email" value={userforgotpassword.email} onChange={handleforgotpassword} required></input>
            </div>
            <div className="main_box_items input_fields password_and_new_password" id="item-5">
                <input id="item-5-3" className="password_field" type={showicon.pass} placeholder="Current Password" id="password_field" name="current_password" value={userforgotpassword.current_password} onChange={handleforgotpassword} required></input>
                <div id="item-5-1" className="eye_img" onClick={Visibility_func}> {showicon.icon} </div>
            </div>
            <div className="main_box_items input_fields password_and_new_password" id="item-6">
                <input id="item-6-3" className="password_field" type={showicon.pass} placeholder="New Password" id="password_field_2" name="new_password" value={userforgotpassword.new_password} onChange={handleforgotpassword} required></input>
                <div id="item-6-2" className="eye_img" onClick={Visibility_func}> {showicon.icon} </div>
            </div>
            <button type="submit" className="main_box_items" id="item-7" onClick={postforgotpassword}>
                <div className="button_text" >CHANGE PASSWORD</div>
            </button>
            <div className="main_box_items" id="item-8">
                <div className="item-8_content" id="item-8-1">Remember your Password?</div>
                <div className="item-8_content" id="item-8-2" >Sign in</div>
            </div>
        </form>
  </div>;
}
