import React, { useEffect,useState } from 'react';
import Friends_rightpanecss from '../Friends_rightpane/Friends_rightpane.module.css';
import {Card} from 'react-bootstrap'
import imh from '../../client_icons/imh.png' 
import { Link } from 'react-router-dom';

function Friends_rightpane() {
  const token = localStorage.getItem('token')
  const [friend_reqs, setfriend_reqs] = useState([{name:'',profile_image:''}])

  const Show_requests = async() =>{
    const res = await fetch('/show_requests',{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'x-auth-token':token
        }
    })
    const data = await res.json();
    setfriend_reqs(data)
    console.log(data)
}
console.log(friend_reqs[1])


useEffect(()=>{
  Show_requests()
},[])

  return <div>
    <div className={Friends_rightpanecss.main}>
      <div className={Friends_rightpanecss.upperpart}>
        <div className={Friends_rightpanecss.upper_right} id={Friends_rightpanecss.item_1}>Friend Requests</div>
        <div className={Friends_rightpanecss.upper_left} id={Friends_rightpanecss.item_2}>See all</div>
      </div>
      <div className={Friends_rightpanecss.lowerpart}>
        <div className={Friends_rightpanecss.requests}>
          
          {friend_reqs.map((elem)=>{
              return(
                <Link to={`/profile/${elem.id}`} className="card" id={Friends_rightpanecss.card} style={{width: '15rem' , background:'#242526',marginRight:'2%',marginTop:'2%' , textDecoration:'none'}}>
                <img src={elem.profile_image} className="card-img-top" alt="profile pic"/>
                <div className="card-body">
                  <h5 className="card-title" style={{color:'white'}}>{elem.name}</h5>
                  <button  className="btn btn-primary" id={Friends_rightpanecss.confirm}>Confirm</button>
                  <button  className="btn btn-primary" id={Friends_rightpanecss.delete} >Delete</button>
                </div>
                </Link>
                )
            })}
          
        </div>
      </div>
    </div>
  </div>
}
// #242526

export default Friends_rightpane;
