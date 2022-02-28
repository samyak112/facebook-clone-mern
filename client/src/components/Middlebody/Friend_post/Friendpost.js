import React, { useEffect, useState } from 'react'
import Friendpostcss from './Friendspost.module.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import async from 'hbs/lib/async';


export default function Friendpost() {

    const [myposts, setmyposts] = useState([{post_data:'',image:'',time:'',_id:'',name:'',profile_image:'',user_image:''}])
    const [comment_click, setcomment_click] = useState(false)

    const getallposts = async() =>{
        const res = await fetch('/allposts',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
             //     'Boundary':'MyBoundary',
                'x-auth-token' : localStorage.getItem('token')
            },
        })
        const data = await res.json();

        setmyposts(data)
    }

    useEffect(()=>{
        getallposts()
    },[])

    const Like_button =async()=>{
        const res = await fetch('/add_like',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
             //     'Boundary':'MyBoundary',
                'x-auth-token' : localStorage.getItem('token')
            },
        })
    }

    const Comment_button = ()=>{
        if(comment_click==true){
            setcomment_click(false)
        }
        else{
            setcomment_click(true)
        }
    }
    console.log('myposts',myposts)
    return (
        <>  
        { 
            // yaha par time islie use kara h kuki time har post m hoga but baaki cheese maybe ho maybe na ho
            myposts[0] =='No posts yet' || myposts[0].time=='' ? 
            <div className={Friendpostcss.noPotsyet}>
                No posts Yet
            </div>
            :
            myposts.map((elem)=>{
                return(
                    <div className={Friendpostcss.main}>
                    <div className={Friendpostcss.user_info}>
                        <div className={Friendpostcss.userinfo_content} id={Friendpostcss.profile_pic}>
                            <img src={elem.profile_image} alt="" />
                        </div>
                        <div className={Friendpostcss.userinfo_content}>
                            <div id={Friendpostcss.name} className={Friendpostcss.nameAndPostTime}>{elem.name}</div>
                            
                            <div id={Friendpostcss.postTime} className={Friendpostcss.nameAndPostTime}>{elem.time}</div> 
                        </div>
                        <div className={Friendpostcss.userinfo_content} id={Friendpostcss.threedots}>
                            <MoreHorizIcon htmlColor='white'/>
                        </div>
                    </div>
                    <>
                        {   
                            elem.image==undefined
                            ?
                            <div className={Friendpostcss.user_post}>
                                {elem.post_data}
                            </div>
                            :
                            <div className={Friendpostcss.user_post}>
                                {elem.post_data} 
                                <img src={elem.image} alt=""/>
                            </div>
                        }
                    </>
                    
                    <div className={Friendpostcss.likeAndCommentDetails}>
                        <div id={Friendpostcss.likescount}>33</div>
                        <div id={Friendpostcss.commentAndSharecount}>44 shares</div>
                    </div>
                    <div className={Friendpostcss.buttons}>
                        <div className={Friendpostcss.post_buttons} onClick={Like_button}> <ThumbUpIcon htmlColor='white'/>like</div>
                        <div className={Friendpostcss.post_buttons} onClick={Comment_button}> <ReplyIcon htmlColor='white'/>comment</div>
                        
                        <div className={Friendpostcss.post_buttons}> <ChatBubbleIcon htmlColor='white'/>share</div>
                    </div>
                    <div className={Friendpostcss.comment_container}>
                    {
                            comment_click==true?
                            <div className={Friendpostcss.add_comment}>
                                <div className={Friendpostcss.comment_profile_image}>
                                    <img src={elem.user_image} alt="" />
                                </div>
                                <div className={Friendpostcss.comment_area}>
                                    <input type="text" placeholder='Write your comment here'/>
                                </div>
                            </div>
                            :''
                        }
                    </div>
                </div>
                )
            })
           
        }
        
           
        </>
    )
}
