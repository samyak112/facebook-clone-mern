import React , {useState} from 'react';
import './Landing_page.css'
import {Alert,Button} from 'react-bootstrap'
import { Visibility, VisibilityOff , Close } from '@mui/icons-material';
import avatar from '../../client_icons/avatar.png';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { bindActionCreators } from 'redux';
import {action} from '../../../state/index'

export default function Landing_page() {
    const Navigate = useNavigate();
    const loggedin = useSelector(state => state.loggedin)
    const dispatch = useDispatch();
    const actions = bindActionCreators(action,dispatch)
    const [display, setdisplay] = useState('none');
    const [showicon, setshowicon] = useState({icon:<VisibilityOff/>,bool:true,pass:'text'});
    const [userlogin, setuserlogin] = useState({email:'',password:''});
    const [userregister, setuserregister] = useState({first_name:'',second_name:'',email:'' ,current_password:'' , date:'' , gender:'' });
    const [showalert, setshowalert] = useState({bool:'false' , text:'' , removealert:'false'});

    const ischeck = ()=>{
        if(userlogin.rememberMe === false){
            setuserlogin({...userlogin})
        }
        else{
            setuserlogin({...userlogin})
        }
    }

    // const check_loggedin = ()=>{
    //     {dispatch(action.isloggedin('loggedin'))}
    // }

    const Visibility_func = ()=>{
        if(showicon.bool==true){
            setshowicon({icon:<Visibility/>,bool:false,pass:'password'})
        }
        else{
            setshowicon({icon:<VisibilityOff/>,bool:true,pass:'text'})
        }
      } 

    const handleregister = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setuserregister({...userregister,[name]:value})
        

    }
    

    const handlelogin = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setuserlogin({...userlogin,[name]:value})
    }
    const postlogin = async(e)=>{
        
         // this is written so that our page doesnot refresh after submitting
        e.preventDefault(); 

        const {email,password} = userlogin;

        const res = await fetch('/sign',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({
                email:email,current_password:password
            }),
            
        })


        // to check if data is coming perfectly or not
        const data = await res.json();

        if(data.status === 442){
            setshowalert({...showalert, bool:'true',text:'invalid username or password' ,removealert:'false'})
        }

        else if(data.status == 422){
            setshowalert({...showalert, bool:'true',text:'you are not verified yet',removealert:'false'})
        }

        else if (data.status === 201){
            localStorage.setItem('token', data.token);
            Navigate('/')

        }

        else{
            setshowalert({...showalert, bool:'true',text:'unknown error',removealert:'false'})
        }
       
    }

    const postregister = async(e)=>{
        e.preventDefault(); 
        const {first_name,second_name,email,current_password, date , gender} = userregister;

        const res = await fetch('/register',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                first_name,second_name,email,current_password, date , gender
            }),
            
        })
        
        const data = await res.json();
        if(data.status === 201){
            Navigate(`/verify/${first_name}/${email}`);
        }

        else if(data.status === 202){
            setshowalert({...showalert, bool:'true',text:data.message,removealert:'false'})
        }

        else{
            setshowalert({...showalert, bool:'true',text:'something went wrong',removealert:'false'})
        }
        

    }
    

  return <div>
      <div className="main">
          <div className="upperside">
              {showalert.bool=='true' && showalert.removealert=='false' 
            //   if condition
              ? <Alert id='alert_id' > 
                    <div className='alert_items'> {showalert.text} </div> 
                    <Button id='alert_button' className='alert_items' onClick={() => setshowalert({...showalert,removealert:'true' , bool:'false' })}> Close </Button> 
                </Alert> 
            // else condition
              : ''}
          </div>
          <div className="lowerside">
            <div className="left_side">
                <div className="left_side_parts" id="left-1">
                    <img src={avatar} alt="logo" />
                </div>
            <div className="left_side_parts" id="left-2">facebook</div>
            
            </div>        
        {/* <!--  this is the dialog box htmlFor signing in--> */}

            <div className="right_side">

                <form className="right_side_upper" id="sign_in" autoComplete='off'>
                    <input className="right_side_items" id="item_1" type="email" value={userlogin.email} placeholder="Enter email" name="email"  onChange={handlelogin} required ></input>
                    <div className="right_side_items" id="item_2"> 
                        <input  id="item_2_1" type={showicon.pass} placeholder="Enter pass" value={userlogin.password}  name="password" onChange={handlelogin} required></input>
                        <div id="item_2_2" onClick={Visibility_func}> {showicon.icon} </div>
                    </div>
                    <button onClick={postlogin} className="right_side_items" id="item_3">Log In</button>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" name='rememberMe' value={true} onChange={ischeck} ></input>
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                    </div>
                    <a href="/forgot_password" className="right_side_items" id="item_4">Forgotten password?</a>
                    <div className="right_side_items" id="item_5"></div>
                    
                </form>
                <div className="right_side_down">
                    <button className="right_side_items" id="item_6" onClick={()=> setdisplay('flex')}>Create New Account</button>
                </div>
            </div>
            
            {/* <!--  this is the dialog box For signing up as a new user--> */}
                    
            <form className="new_account_box" autoComplete='off'  id="new_box" style={{display:display}}>
                <div className="dialog_box">

                    <div className="new_acccount_item" id="new_item_1">
                        <div id="item_1_1">Sign Up</div>
                        <div id="item_1_2" onClick={()=> setdisplay('none')}> <Close/> </div>
                    </div>
                    <div className="new_acccount_item" id="new_item_2">
                        <input className="names" id="first_name" autoComplete='off' placeholder="first name" name="first_name" value={userregister.first_name}  onChange={handleregister} required></input>
                        <input className="names" id="last_name" autoComplete='off'  placeholder="Surname" name="second_name" value={userregister.second_name}  onChange={handleregister} required></input>
                    </div>
                    <input className="input_fields" id="new_item_3" autoComplete='off'  placeholder="Mobile number or email address" name="email" type="email" value={userregister.email}  onChange={handleregister} required></input>
                    
                    <div   className="new_acccount_item" id="new_item_4">
                        <input className="input_fields" autoComplete='off' placeholder="New Password" id="item_4_1"  name="current_password" value={userregister.current_password}  onChange={handleregister} required></input>               
                        <div className="item_4_content" id="item_4_2">too short</div>
                    </div>
                    <div   className="new_acccount_item" id="new_item_5">
                        <div className="item_5_content" id="item_5_1">Date of birth</div>
                        <input type="date" autoComplete='off' className="input_fields" id="item_5_2" name="date" value={userregister.date}  onChange={handleregister} required></input>                
                    </div>
                    <div className="new_acccount_item" id="new_item_6">
                        <div id="item_6_1">Gender</div>
                        <div id="item_6_2">
                            <div className="item_6_2_content" id="item_6_2_1">
                                
                                <label className="gender">
                                    <input type="radio" autoComplete='off' name="gender" value="Male" onChange={handleregister} required></input>
                                    <span className="checkmark"> </span>
                                </label>
                                <div className="gender_text">Male</div>
                                
                            </div>
                            <div className="item_6_2_content" id="item_6_2_2">
                                <label className="gender">
                                    <input type="radio" autoComplete='off' value="Female" onChange={handleregister} name="gender"></input>
                                    <span className="checkmark"> </span>
                                </label>
                                <div className="gender_text">Female</div>
                            </div>
                            <div className="item_6_2_content" id="item_6_2_3">
                                <label className="gender">
                                    <input type="radio" autoComplete='off' value="custom" onChange={handleregister} name="gender"></input>
                                    <span className="checkmark"> </span>
                                </label>
                                <div className="gender_text">Custom</div>
                            </div>
                        </div>
                    </div>
                    <button type="submit"  className="new_acccount_item  hover" id="new_item_7" >
                        <div id="button_text" onClick={postregister}>Sign Up</div>
                    </button>
                </div>
            </form>
          </div>
        
    </div>
  </div>;
}
