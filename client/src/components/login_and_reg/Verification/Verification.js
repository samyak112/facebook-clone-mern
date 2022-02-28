import React , {useState} from 'react';
import verification_css from './verification.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams,useNavigate } from 'react-router-dom';
import {Alert,Button} from 'react-bootstrap'


export default function Verification() {
  const Navigate = useNavigate();
  const {first_name,email} = useParams();
  const [userverify, setuserverify] = useState({verification_code:''});
  const [showalert, setshowalert] = useState({bool:'false' , text:'' , removealert:'false'});

  const handleverify = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setuserverify({...userverify,[name]:value})

}

  const postverify = async(e)=>{
    e.preventDefault(); 

    const {verification_code} = userverify;
    const email_value = email
    const res = await fetch(`/verify/${first_name}/${email}`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
          verification_code,email_value
        }),
        
    })

    const data = await res.json();
    console.log(data)
    if(data.status === 201){
        Navigate('/');
    }

    else if(data.status === 442){
      setshowalert({...showalert, bool:'true',text:'OTP Expired New otp has been sent to your address',removealert:'false'})
    }

    else{
      setshowalert({...showalert, bool:'true',text:'Wrong password',removealert:'false'})
    }
    

}
  
  return <div>
      <div className={verification_css.main}>
      {showalert.bool=='true' && showalert.removealert=='false' 
            //   if condition
              ? <Alert id='alert_id' > 
                    <div className='alert_items'> {showalert.text} </div> 
                    <Button id='alert_button' className='alert_items' onClick={() => setshowalert({...showalert,removealert:'true' , bool:'false' })}> Close </Button> 
                </Alert> 
            // else condition
              : ''}
        <div className={verification_css.upperside}>
            Confirm Email Address
        </div>
        <div className={verification_css.lowerside}>
            <form className={verification_css.container} id={verification_css.verification_box} >
                <div id={verification_css.greetings}> Hi {first_name}</div>
                <div id={verification_css.text}> We have sent you Verification code on your email for security reasons enter the code below to verify </div>
                <div className='mb-3'>
                  <label htmlFor="exampleInputPassword1" className='form-label' id={verification_css.verify_text}>Enter Verification Code</label>
                  <input type="password" className='form-control 'id={verification_css.exampleInputPassword1} name="verification_code" value={userverify.verification_code} onChange={handleverify} required></input>
                </div>
                <button type="submit" className='btn btn-primary' onClick={postverify}>Submit</button>
              </form>
        </div>
      </div>
  </div>;
}
