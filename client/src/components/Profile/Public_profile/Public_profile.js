import React , {useEffect, useState} from 'react';
import New_post from '../../Middlebody/New_post/Newpost'
import Navbar from '../../navbar/Navbar'
import Public_profilecss from './Public_profile.module.css'
import {Button} from 'react-bootstrap'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import friend from '../../client_icons/friend.png'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useParams } from 'react-router-dom';
import jwt from 'jwt-decode'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import imh from '../../client_icons/imh.png' 
import Profile_posts from '../../Profile_posts/Profile_posts'


function Public_profile() {
  const{id} = useParams()
  const token = localStorage.getItem('token')
  const [profile_info, setprofile_info] = useState({first_name:'',second_name:'',status:'',friends:{},profile_image:'',cover_image:''})
  const [friends_info, setfriends_info] = useState([{first_name:'',second_name:'',image:''}])
  const [photos, setphotos] = useState([{image:''}])

  const Profile_data = async() =>{
    const res = await fetch(`/profile/${id}`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'x-auth-token':token
        },
        body:JSON.stringify({
          id
        }),
    })
    const data = await res.json();
    setprofile_info(data)
    console.log(data)
}

useEffect(()=>{
  Profile_data()
},[])

const Friends_data = async() =>{
  const res = await fetch(`/friend_list/${id}`,{
      method:'POST',
      headers:{
          'Content-Type' : 'application/json',
          'x-auth-token':token
      },
      body:JSON.stringify({
        id
      }),
  })
  const data = await res.json();
  setfriends_info(data)
}

useEffect(()=>{
  Friends_data()
},[])

const sendFriendRequest =  async()=>{
  const res = await fetch(`/addFriend/${id}`,{
    method:'POST',
    headers:{
        'Content-Type' : 'application/json',
        'x-auth-token':token
    },
    body:JSON.stringify({
      id
    }),
})

const data = await res.json()
setprofile_info(data.profile_data)
console.log(profile_info)

}

const acceptReq = async()=>{
  const res = await fetch(`/acceptReq/${id}`,{
    method:'POST',
    headers:{
        'Content-Type' : 'application/json',
        'x-auth-token':token
    },
    body:JSON.stringify({
      id
    }),
})
const data = await res.json()
const status = data.status
setprofile_info({...profile_info,status:data.status})
}

const Photos_data = async() =>{
  const res = await fetch(`/photos/${id}`,{
      method:'POST',
      headers:{
          'Content-Type' : 'application/json',
          'x-auth-token':token
      },
      body:JSON.stringify({
        id
      }),
  })
  const data = await res.json();
  setphotos(data)
}

useEffect(()=>{
  Photos_data()
},[])


  return (
    <div>
      <div className={Public_profilecss.upperpart}>
        <div className={Public_profilecss.upperpart_content} id={Public_profilecss.upperpart_upper}>
          <div className={Public_profilecss.upperpart_content} id={Public_profilecss.upperpart_upper_box}>
            {
              profile_info.cover_image == '' || profile_info.cover_image == undefined ?''
              : <img src={profile_info.cover_image} alt="" />

            }
          </div>
        </div>
        <div className={Public_profilecss.upperpart_content} id={Public_profilecss.upperpart_lower}>
          <div className={Public_profilecss.upperpart_lower_content} id={Public_profilecss.upperpart_lower_1}>
            <div id={Public_profilecss.upperpart_lower_1_box}>
              <div id={Public_profilecss.upperpart_lower_1_1}>
                <div id={Public_profilecss.circle}>
                  <img src={profile_info.profile_image} alt="" />
                </div>
              </div>
              <div id={Public_profilecss.upperpart_lower_1_2}>
                <div id={Public_profilecss.upperpart_lower_1_2_1}>
                  <h2>{profile_info.first_name}    {profile_info.second_name}</h2>
                </div>
              </div>
              <div id={Public_profilecss.upperpart_lower_1_3}>
                <div className={Public_profilecss.button_wrap}>
                    {
                      profile_info.status == 'Sent' 
                      ? <Button variant="secondary" className={Public_profilecss.button} size="lg">
                          <img src={friend} alt='friend' /> {profile_info.status}
                        </Button>   
                      :profile_info.status == 'Add Friend' 
                          ?<Button variant="secondary" className={Public_profilecss.button}  onClick={sendFriendRequest}>
                            <PersonAddIcon/> {profile_info.status}
                          </Button>
                        :profile_info.status == 'Confirm' 
                        ?<Button variant="secondary" className={Public_profilecss.button} onClick={acceptReq}>
                            <PersonAddIcon/> {profile_info.status}
                          </Button>
                        :
                          <Button variant="secondary" className={Public_profilecss.button}  >
                              <PersonAddIcon/> {profile_info.status}
                            </Button>
                    }
                </div>
                  <Button variant="primary" className={Public_profilecss.button} id={Public_profilecss.button_2} size="lg">
                    <ChatBubbleIcon fontSize='small'/> Message
                  </Button>
              </div>
            </div>
            
          </div>
          <div className={Public_profilecss.upperpart_lower_content} id={Public_profilecss.upperpart_lower_2}>
            <div  id={Public_profilecss.upperpart_lower_2_box}>
              <div  id={Public_profilecss.upperpart_lower_2_box_leftside}>
                <Button  className={Public_profilecss.upperpart_lower_2_box_leftside_items} id={Public_profilecss.Posts}>Posts</Button>
                <Button className={Public_profilecss.upperpart_lower_2_box_leftside_items} id={Public_profilecss.About}>About</Button>
                <Button className={Public_profilecss.upperpart_lower_2_box_leftside_items} id={Public_profilecss.Friends}>Friends</Button>
                <Button className={Public_profilecss.upperpart_lower_2_box_leftside_items} id={Public_profilecss.Photos}>Photos</Button>
                <Button className={Public_profilecss.upperpart_lower_2_box_leftside_items} id={Public_profilecss.Videos}>Videos</Button>
                <Button className={Public_profilecss.upperpart_lower_2_box_leftside_items} id={Public_profilecss.Check_ins}>Check-in</Button>
                <Button className={Public_profilecss.upperpart_lower_2_box_leftside_items} id={Public_profilecss.More}>More</Button>
              </div>
              <div  id={Public_profilecss.upperpart_lower_2_box_rightside}>
                <Button  id={Public_profilecss.three_dots} size="sm">
                    <MoreHorizIcon fontSize='small'/>
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Public_profilecss.lowerpart}>
        <div id={Public_profilecss.lowerpart_box}>
          <div className={Public_profilecss.lowerpart_content} id={Public_profilecss.lowerpart_left}>
            <div className={Public_profilecss.lowerpart_left_content} id={Public_profilecss.lowerpart_left_intro}>
              {/* intro will be here */}
            </div>
            <div className={Public_profilecss.lowerpart_left_content} id={Public_profilecss.lowerpart_left_photos}>
              <div className={Public_profilecss.infobox} id={Public_profilecss.photos_upperpart}>
                <div id={Public_profilecss.photos_1}>
                  Photos
                </div>
                <div className={Public_profilecss.seemore} id={Public_profilecss.photos_2}>
                  See more
                </div>
              </div>
              <div className={Public_profilecss.infobox_lowerpart} id={Public_profilecss.photos_lowerpart}>
              {
                  photos.map((elem)=>{
                    return(
                      <div id={Public_profilecss.photo}>
                        <img src={elem.image} alt="" />
                      </div>
                    )
                  })
                }
                
              </div>
            </div>
            <div className={Public_profilecss.lowerpart_left_content} id={Public_profilecss.lowerpart_left_friends}>
            <div className={Public_profilecss.infobox} id={Public_profilecss.friends_upperpart}>
                <div id={Public_profilecss.friends_1}>
                  Friends
                </div>
                <div className={Public_profilecss.seemore} id={Public_profilecss.friends_2}>
                  See more
                </div>
              </div>
              <div className={Public_profilecss.infobox_lowerpart} id={Public_profilecss.friends_lowerpart}>
                
                  {
                    friends_info.map((elem)=>{
                      return(
                        <div className={Public_profilecss.friends}>
                        <div id={Public_profilecss.friend_photo}><img src={elem.image} alt="..."/></div>
                        <div id={Public_profilecss.friend_name}>{elem.first_name}</div>
                        </div>

                      )
                    })}
                    
                  
              </div>
            </div>
          </div>
          <div className={Public_profilecss.lowerpart_content} id={Public_profilecss.lowerpart_right}>
            <New_post/>
            <Profile_posts/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Public_profile