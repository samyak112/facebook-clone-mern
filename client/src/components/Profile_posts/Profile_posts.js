import React, { useEffect, useState } from 'react'
import Profile_postcss from './Profile_posts.module.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import async from 'hbs/lib/async';
import { useParams } from 'react-router-dom';



export default function Profile_posts() {

    const [myposts, setmyposts] = useState([{post_data:'',image:'',time:'',_id:'',name:'',profile_image:''}])
    const{id} = useParams()

    const getallposts = async() =>{
        const res = await fetch(`/user_posts/${id}`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
        })
        const data = await res.json();

        setmyposts(data)
        console.log(data)
    }

    useEffect(()=>{
        getallposts()
    },[])
    console.log(myposts,'these are the postss')
    return (
        <>  
        {   myposts[0]=='No Posts Yet' || myposts.length==0 || myposts[0].time==''?
                <div className={Profile_postcss.Nopostyet}>No posts yet</div> 
            :
            myposts.map((elem)=>{
                return(
                    <div className={Profile_postcss.main}>
                    <div className={Profile_postcss.user_info}>
                        <div className={Profile_postcss.userinfo_content} id={Profile_postcss.profile_pic}>
                            <img src={elem.profile_image} alt="" />
                        </div>
                        <div className={Profile_postcss.userinfo_content}>
                            <div id={Profile_postcss.name} className={Profile_postcss.nameAndPostTime}>{elem.name}</div>
                            
                            <div id={Profile_postcss.postTime} className={Profile_postcss.nameAndPostTime}>{elem.time}</div> 
                        </div>
                        <div className={Profile_postcss.userinfo_content} id={Profile_postcss.threedots}>
                            <MoreHorizIcon htmlColor='white'/>
                        </div>
                    </div>
                    <>
                        {   
                            elem.image==undefined
                            ?
                            <div className={Profile_postcss.user_post}>
                                {elem.post_data}
                            </div>
                            :
                            <div className={Profile_postcss.user_post}>
                                {elem.post_data} 
                                <img src={elem.image} alt=""/>
                            </div>
                        }
                    </>
                    
                    <div className={Profile_postcss.likeAndCommentDetails}>
                        <div id={Profile_postcss.likescount}>33</div>
                        <div id={Profile_postcss.commentAndSharecount}>44 shares</div>
                    </div>
                    <div className={Profile_postcss.buttons}>
                        <div className={Profile_postcss.post_buttons}> <ThumbUpIcon htmlColor='white'/>like</div>
                        <div className={Profile_postcss.post_buttons}> <ReplyIcon htmlColor='white'/>comment</div>
                        <div className={Profile_postcss.post_buttons}> <ChatBubbleIcon htmlColor='white'/>share</div>
                    </div>
                </div>
                )
            })
        }
        
           
        </>
    )
}
