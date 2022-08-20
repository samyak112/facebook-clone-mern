import React , {useEffect, useState} from 'react';
import New_post from '../../Middlebody/New_post/Newpost'
import Personal_profilecss from './Personal_profile.module.css'
import {Button} from 'react-bootstrap'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useParams } from 'react-router-dom';
import storage from '../../../firebase';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Profile_posts from '../../Profile_posts/Profile_posts';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { v4 } from 'uuid';
import async from 'hbs/lib/async';

function Personal_profile() {
  const{id} = useParams()
  const token = localStorage.getItem('token')
  const [profile_info, setprofile_info] = useState({first_name:'',second_name:'',profile_image:'',cover_image:''})
  const [friends_info, setfriends_info] = useState([{first_name:'',second_name:'',image:''}])
  const [profile_click, setprofile_click] = useState(false)
  const [image_url, setimage_url] = useState()
  const [photos, setphotos] = useState([{image:''}])
  const [coverPhoto, setcoverPhoto] = useState(false)
  const [image_updated, setimage_updated] = useState(false)

  const Profile_data = async() =>{
    const res = await fetch(`/personal_profile/${id}`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
          id
        }),
    })
    const data = await res.json();
    setprofile_info(data)
}

useEffect(()=>{
  Profile_data()
},[])

// populate data of the friends of the user 
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

// populate photos in the profile
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

const handleimage = (e)=>{
  // this is the part which is updating the image
  const date = Date.now()
  const image_source = e.target.id
  var image_source_2 = ''
  if(image_source == 'update_cover_pic'){
    image_source_2 = 'update_cover_photo'
  }
  else{
    image_source_2 = 'update_profile_pic'
  }
  const image_value = e.target.files[0]
  setprofile_click(false)
  const unique_id = v4()
  const unique_id_2 = unique_id.replace('/','')
  const image_id = unique_id_2+date
  if(image_value == null)
            return;
  var uploadTask = storage.ref(image_id).put(image_value)
  uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  }, function(error) {
    // Handle unsuccessful uploads
  }, function() {
    // Handle successful uploads on complete
     storage.ref(image_id).getDownloadURL().then(async(url)=>{
      console.log('this is the image url',url)
      setimage_url(url)
      const res = await fetch(`/${image_source_2}/${id}`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
         url,id
        }),
    })
    console.log( await res.json())
    // this console log is important because it it uses 'res' and the code after this res function is only working if i use this 'res' somewhere other wise my setstate is not working
    if(image_source_2=='update_cover_photo'){
      setprofile_info({...profile_info,cover_image:url})
    }
    else{
      setprofile_info({...profile_info,profile_image:url})

    }
    
  })
  });
  
}




const check_profile_pic = ()=>{
  if(profile_click == false){
    setprofile_click(true)
}
else{
  setprofile_click(false)
}
}

const cover_photo = ()=>{
  if(coverPhoto == false){
    setcoverPhoto(true)
}
else{
  setcoverPhoto(false)
}
}




  return (
    <div>
      <div className={Personal_profilecss.upperpart}>
        <div className={Personal_profilecss.upperpart_content} id={Personal_profilecss.upperpart_upper}>
          <div className={Personal_profilecss.upperpart_content} id={Personal_profilecss.upperpart_upper_box}>
            <div className={Personal_profilecss.btn}>
              <label  htmlFor="update_cover_pic"  onClick={cover_photo}><CameraAltIcon/> Edit Cover Photo</label>
              <input type="file" id="update_cover_pic" onChange={handleimage} name="image"/>
            </div>
            {
              profile_info.cover_image == ''
              ?''
              :<img src={profile_info.cover_image} alt="" onClick={cover_photo} />
            }
            
            
          </div>
        </div>
        <div className={Personal_profilecss.upperpart_content} id={Personal_profilecss.upperpart_lower}>
          <div className={Personal_profilecss.upperpart_lower_content} id={Personal_profilecss.upperpart_lower_1}>
            <div id={Personal_profilecss.upperpart_lower_1_box}>
              <div id={Personal_profilecss.upperpart_lower_1_1}>
                <div id={Personal_profilecss.circle}>
                  <img className={Personal_profilecss.circle_image} src={profile_info.profile_image}  onClick={check_profile_pic} alt="" />
                  {
                    profile_click==true?
                    <div className={Personal_profilecss.iamge_dropdown}>
                      <div id={Personal_profilecss.check_pic} className={Personal_profilecss.image_dropdown_items}>
                        <div className={Personal_profilecss.image_dropdown_items_inner}>
                          <ImageOutlinedIcon/> View Profile Pic
                        </div>  
                      </div>
                      <div id={Personal_profilecss.update_pic} className={Personal_profilecss.image_dropdown_items}>
                      <label htmlFor="update_profile_pic" className={Personal_profilecss.image_dropdown_items_inner}>
                        <PersonOutlinedIcon/> Update Profile Pic
                      </label>
                      <input type="file" id="update_profile_pic" onChange={handleimage} name="image"/>
                      </div>
                    </div>
                    :
                    ''
                  }
                </div>
              </div>
              <div id={Personal_profilecss.upperpart_lower_1_2}>
                <div id={Personal_profilecss.upperpart_lower_1_2_1}>
                  <h2>{profile_info.first_name}    {profile_info.second_name}</h2>
                </div>
              </div>
              <div id={Personal_profilecss.upperpart_lower_1_3}>
                  <Button variant="secondary" className={Personal_profilecss.button} id={Personal_profilecss.button_1} size="lg">
                  <AddCircleOutlineIcon/> Add Story
                  </Button>
                  <Button variant="primary" className={Personal_profilecss.button} id={Personal_profilecss.button_2} size="lg">
                   <div id={Personal_profilecss.button_text}> Edit Profile</div>
                  </Button>
              </div>
            </div>
            
          </div>
          <div className={Personal_profilecss.upperpart_lower_content} id={Personal_profilecss.upperpart_lower_2}>
            <div  id={Personal_profilecss.upperpart_lower_2_box}>
              <div  id={Personal_profilecss.upperpart_lower_2_box_leftside}>
                <Button  className={Personal_profilecss.upperpart_lower_2_box_leftside_items} id={Personal_profilecss.Posts}>Posts</Button>
                <Button className={Personal_profilecss.upperpart_lower_2_box_leftside_items} id={Personal_profilecss.About}>About</Button>
                <Button className={Personal_profilecss.upperpart_lower_2_box_leftside_items} id={Personal_profilecss.Friends}>Friends</Button>
                <Button className={Personal_profilecss.upperpart_lower_2_box_leftside_items} id={Personal_profilecss.Photos}>Photos</Button>
                <Button className={Personal_profilecss.upperpart_lower_2_box_leftside_items} id={Personal_profilecss.Videos}>Videos</Button>
                <Button className={Personal_profilecss.upperpart_lower_2_box_leftside_items} id={Personal_profilecss.Check_ins}>Check-in</Button>
                <Button className={Personal_profilecss.upperpart_lower_2_box_leftside_items} id={Personal_profilecss.More}>More</Button>
              </div>
              <div  id={Personal_profilecss.upperpart_lower_2_box_rightside}>
                <Button  id={Personal_profilecss.three_dots} size="sm">
                    <MoreHorizIcon fontSize='small'/>
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Personal_profilecss.lowerpart}>
        <div id={Personal_profilecss.lowerpart_box}>
          <div className={Personal_profilecss.lowerpart_content} id={Personal_profilecss.lowerpart_left}>
            <div className={Personal_profilecss.lowerpart_left_content} id={Personal_profilecss.lowerpart_left_intro}>
              <div className={Personal_profilecss.intro_items} id={Personal_profilecss.item_1}>Intro</div>
              <div className={Personal_profilecss.intro_items} id={Personal_profilecss.item_2}>
                <button className={Personal_profilecss.intro_buttons}>Add Bio</button>
              </div>
              <div className={Personal_profilecss.intro_items} id={Personal_profilecss.item_3}>
                <button className={Personal_profilecss.intro_buttons}>Edit Details</button>
              </div>
            </div>
            <div className={Personal_profilecss.lowerpart_left_content} id={Personal_profilecss.lowerpart_left_photos}>
              <div className={Personal_profilecss.infobox} id={Personal_profilecss.photos_upperpart}>
                <div id={Personal_profilecss.photos_1}>
                  Photos
                </div>
                <div className={Personal_profilecss.seemore} id={Personal_profilecss.photos_2}>
                  See more
                </div>
              </div>
              <div className={Personal_profilecss.infobox_lowerpart} id={Personal_profilecss.photos_lowerpart}>
                {
                  photos.map((elem)=>{
                    return(
                      <div id={Personal_profilecss.photo}>
                        <img src={elem.image} alt="" />
                      </div>
                    )
                  })
                }
                
              </div>
            </div>
            <div className={Personal_profilecss.lowerpart_left_content} id={Personal_profilecss.lowerpart_left_friends}>
            <div className={Personal_profilecss.infobox} id={Personal_profilecss.friends_upperpart}>
                <div id={Personal_profilecss.friends_1}>
                  Friends
                </div>
                <div className={Personal_profilecss.seemore} id={Personal_profilecss.friends_2}>
                  See more
                </div>
              </div>
              <div className={Personal_profilecss.infobox_lowerpart} id={Personal_profilecss.friends_lowerpart}>
              {
                    friends_info.map((elem)=>{
                      return(
                        <div className={Personal_profilecss.friends}>
                        <div id={Personal_profilecss.friend_photo}><img src={elem.image} alt="..."/></div>
                        <div id={Personal_profilecss.friend_name}>{elem.first_name}</div>
                        </div>

                      )
                    })}
              </div>
            </div>
          </div>
          <div className={Personal_profilecss.lowerpart_content} id={Personal_profilecss.lowerpart_right}>
            <New_post/>
            <Profile_posts/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Personal_profile