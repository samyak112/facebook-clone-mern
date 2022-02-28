import React , {useEffect, useState} from 'react';
import Navbar from '../navbar/Navbar';
import {Button} from 'react-bootstrap'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import friend from '../client_icons/friend.png'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useParams } from 'react-router-dom';
import jwt from 'jwt-decode'
import Public_profile from './Public_profile/Public_profile';
import Personal_profile from './Personal_profile/Personal_profile';

function Profile() {
  const{id} = useParams()
  const token = localStorage.getItem('token')
  const [isadmin, setisadmin] = useState(false)

    const admin = jwt(token);

  return <>
      <Navbar/>
      {
        admin.id==id ? <Personal_profile/> : <Public_profile/>
      }
  </>;
}

export default Profile;
