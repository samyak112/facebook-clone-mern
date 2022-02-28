import React , {useState} from 'react'
import Newpostcss from './Newpost.module.css'
import PhotoIcon from '@mui/icons-material/Photo';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Photo from '@mui/icons-material/Photo';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useSelector } from 'react-redux';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import usedata from '../../usedata';
import storage from '../../../firebase';
import { v4 } from 'uuid';
import imh from '../../client_icons/imh.png' 


export default function Newpost() {

    const [state, setstate] = useState({first:'none',addphoto:'none'})
    const [post, setpost] = useState({post_data:'' , image:''});
    const [image_url, setimage_url] = useState('')
    const [image_preview, setimage_preview] = useState('')

    

    const handlepost = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setpost({...post,[name]:value.toString()})
    }

    const handleimage = (e)=>{
        setpost({...post,image:e.target.files[0]})
        
        setimage_preview(URL.createObjectURL(e.target.files[0]))
    }

    const post_send = async(e)=>{
        // this is written so that our page doesnot refresh after submitting

        e.preventDefault(); 

        const date = Date.now();
        if(post.image == ''){
            const data_without_pic = async()=>{
                const res = await fetch('/post',{
                    method:'POST',
                    headers:{
                        'Content-Type' : 'application/json',
                        'x-auth-token' : localStorage.getItem('token')
                    },
                    body:JSON.stringify({
                    post:post.post_data,image_url
                    }),
                })
                setpost({...post,image:''})    
                setimage_url('')
                // set post ko yaha '' islie kara h taaki state m value vaapis se null ho jaaye aur next time jab post kare to state fresh ho

            }
            data_without_pic()
            // yaha par function banake islie call kara h kuki agar function nahi banate to code fetch request tak hi rh jata h par ab ise async function bana dia h to hamara program uske khatam hone ka wait nahi karta aur function ke bahar ki jo conditions h vo run ho jaati h phle which is in this case is setstate which closes our dialog box
            setstate({...state,first:'none',addphoto:'none'})

        }

        
        else{
            const date = Date.now()
            const unique_id = v4()
            const unique_id_2 = unique_id.replace('/','')
            const image_id = unique_id_2+date
            var uploadTask = storage.ref(image_id).put(post.image)
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
                const res = await fetch('/post',{
                    method:'POST',
                    headers:{
                        'Content-Type' : 'application/json',
                        'x-auth-token' : localStorage.getItem('token')
                    },
                    body:JSON.stringify({
                     post:post.post_data,url
                    }),
                })
                
            })
            setpost({...post,image:''})
            setimage_url('')

            });
            setstate({...state,first:'none',addphoto:'none'})
        }

        
      
   }

   const close_create_post = ()=>{
    setstate({first:'none',addphoto:'none'})
    setimage_preview('')
   }
   const user_data = usedata()
//    console.log(post)


    return (
        <div>
            <form className={Newpostcss.createbox} style={{display: state.first }} onSubmit={post_send}>
                <div className={Newpostcss.createbox_main_box}>
                    <div className={Newpostcss.main_box_item} id={Newpostcss.box_item1}>
                        <div className={Newpostcss.box_item1_items}>
                            Create New Post
                        </div>
                        <div className={Newpostcss.box_item1_items} id={Newpostcss.crossbox} onClick={close_create_post}>
                            <CloseIcon/>
                        </div>
                    </div>
                    <div className={Newpostcss.main_box_item} id={Newpostcss.box_item2}>
                        <div className={Newpostcss.box_item2_items} id={Newpostcss.box_item2_content1}>
                            <div id={Newpostcss.box_item2_item1}>
                                <img src={user_data.profile_image} alt="" />
                                
                            </div>
                            <div id={Newpostcss.box_item2_item2}>
                                {user_data.first_name}
                            </div>
                        </div>
                        <div className={Newpostcss.box_item2_items} id={Newpostcss.box_item2_content2}>
                            {/* yaha name ki value aur usestate m jo name h same hona chaiye */}
                            <textarea maxLength={101} type="text" placeholder="What's on your mind" name='post_data' value={post.post_data} onChange={handlepost} />
                        </div>
                        <div className={Newpostcss.box_item2_items} id={Newpostcss.box_item2_content3} style={{display: state.addphoto }}>
                            <label className={Newpostcss.label} htmlFor="myfile">
                                {
                                    image_preview == ''?
                                    <>
                                        <div className={Newpostcss.label_content}>Add photo</div>
                                        <div className={Newpostcss.label_content}>
                                            <AddPhotoAlternateIcon/>
                                        </div>
                                    </>
                                    :<img src={image_preview} alt="" />

                                    
                                }
                                
                            </label>
                            <input type="file" id="myfile" name="image" onChange={handleimage}/>
                        </div>
                    </div>
                    <div className={Newpostcss.main_box_item} id={Newpostcss.box_item3}>
                        <div className={Newpostcss.box_item3_items} id={Newpostcss.box_item3_content1}>
                            Add to your post
                        </div>
                        <div className={Newpostcss.box_item3_items} id={Newpostcss.box_item3_content2}>
                            <PhotoIcon fontSize='large' htmlColor='#45bd62'onClick={()=> setstate({...state,addphoto:'flex'})}/>
                            <InsertEmoticonIcon fontSize='large' htmlColor='#f7b928'/>
                            <LocationOnIcon fontSize='large' htmlColor='orange'/>
                            <LocalOfferIcon fontSize='large' htmlColor='red'/>

                        </div>
                    </div>
                    <div className={Newpostcss.main_box_item} id={Newpostcss.box_item4}>
                        <button id={Newpostcss.post_button} type='submit'>Post</button>
                    </div>
                </div>
            </form>
            <div className={Newpostcss.main}>
                <div className={Newpostcss.main_wrap}>

                <div className={Newpostcss.items} id={Newpostcss.upperpart}>
                    <div className={Newpostcss.upperpart_items} id={Newpostcss.item_1}>
                        <div className={Newpostcss.imagebox}>
                            <img src={user_data.profile_image} alt="" />
                        </div>
                    </div>
                    <div className={Newpostcss.upperpart_items} id={Newpostcss.item_2}>
                        <button className={Newpostcss.button} onClick={()=> setstate({...state,first:'flex'})}>What's on your mind</button>
                        
                    </div>
                </div>
                <div className={Newpostcss.items} id={Newpostcss.lowerpart}>
                    <div className={Newpostcss.lowerpart_items} id={Newpostcss.new_item_1}>
                        <VideoCameraBackIcon fontSize='large' htmlColor='red'/> Live video
                    </div>
                    <div className={Newpostcss.lowerpart_items} id={Newpostcss.new_item_2} onClick={()=> setstate('flex')}>
                        <PhotoIcon fontSize='large' htmlColor='#45bd62'/> Photo/Video
                    </div>
                    <div className={Newpostcss.lowerpart_items} id={Newpostcss.new_item_3}>
                        <InsertEmoticonIcon fontSize='large' htmlColor='#f7b928'/> Feeling/Activity
                    </div>
                </div>
            </div>
                </div>
        </div>
    )
}
