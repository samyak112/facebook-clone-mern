import React, { useEffect,useState } from 'react'
import navbarcss from  './Navbar.module.css'
import logo from '../client_icons/logo.svg'
import { Home, LiveTv,Feedback,Settings,Help,Nightlight,Logout , Storefront , Groups , SportsEsports,AccountCircle,ArrowDropDown,Widgets,Notifications,ChatBubbleOutlined} from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { bindActionCreators } from 'redux';
import {action} from '../../state/index'
import Homepage from '../Home/Home'
import usedata from '../usedata'


export default function Navbar() {
    const Navigate = useNavigate();
    const [issearchbar, setissearchbar] = useState(false);
    const [search, setsearch] = useState({searchquery:''});
    const [searchResults, setsearchResults] = useState([{first_name:'',second_name:'',id:'',profile_image:''}]);

    const handlesearch = async(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setsearch({...search,[name]:value})
        // const{searchquery} = search;
        const res = await fetch('/searchResults',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({
                searchquery:value
            })
        })
        const data = await res.json();
        setsearchResults(data.response_array)
    }
    
    const getSearchResults = () => {

        if(issearchbar == false){
            setissearchbar(true)
        }
        else{
            setissearchbar(false)
        }
    }

    const user_data = usedata()
    
    return (
        <>
            <div className={navbarcss.main}>
            {/* left part of navbar */}
                <div className={navbarcss.nav_items} id={navbarcss.item_left}>
                    <Link to='/' className={navbarcss.left_side_items}>
                        <img src={logo} alt='logo' />
                    </Link>
                    <div className={navbarcss.left_side_items} id={navbarcss.search_bar}>
                        <input type='text' placeholder='Search' name='searchquery' value={search.searchquery} onChange={handlesearch} onClick={getSearchResults}/>
                    </div>
                    
                    {issearchbar==true?
                    <div className={navbarcss.dropdown_menu}>
                        <>
                            {   
                                searchResults=='No results'|| searchResults.length==0 || searchResults[0].id==''?
                                    <div className={navbarcss.no_results}>
                                        No results
                                    </div>
                                :
                                searchResults.map((elem)=>{
                                    return(
                                            <Link to={`/profile/${elem.id}`} className={navbarcss.search_results}>
                                                <div className={navbarcss.search_results_content} id={navbarcss.profile_pic}>
                                                    <img src={elem.profile_image} alt="" />
                                                </div>
                                                <div className={navbarcss.search_results_content} id={navbarcss.username}>{elem.first_name} {elem.second_name}</div>
                                            </Link>
                                        )
                                    })
                            }
                        </>
                        </div>
                    : ''}

                {/* middle part of navbar */}
                </div>
                <div className={navbarcss.nav_items} id={navbarcss.item_middle}>
                    <div className={navbarcss.material_styling} id={navbarcss.home}>
                            <Home fontSize='large' className={navbarcss.material_styling_inner}/>
                    </div>
                    <div className={navbarcss.material_styling} id={navbarcss.LiveTv}>
                        <LiveTv fontSize='large'  className={navbarcss.material_styling_inner} />
                    </div>
                    <div className={navbarcss.material_styling} id={navbarcss.Storefront}>
                        <Storefront fontSize='large'  className={navbarcss.material_styling_inner} />
                    </div>
                    <div className={navbarcss.material_styling} id={navbarcss.Groups}>
                        <Groups fontSize='large'  className={navbarcss.material_styling_inner} />
                    </div>
                    <div className={navbarcss.material_styling} id={navbarcss.SportsEsports}>
                        <SportsEsports fontSize='large'  className={navbarcss.material_styling_inner} />
                    </div>
                </div>

                {/* right side of navbar */}
                <div className={navbarcss.nav_items} id={navbarcss.item_right}>
                    <div className={navbarcss.item_right_content} id={navbarcss.item_right_left}>
                        <Link to={`/profile/${user_data.id}`} id={navbarcss.user_image} className={navbarcss.user_info}>
                            {/* <img src={user_data.profile_image} alt="" /> {user_data.first_name} */}
                            <div id={navbarcss.user_info_1}>
                                <img src={user_data.profile_image} alt="" /> 
                            </div>
                            <div id={navbarcss.user_info_2}>
                            {user_data.first_name}
                            </div>
                        </Link>
                    </div>
                    <div className={navbarcss.item_right_content} id={navbarcss.item_right_right}>
                        <div className={navbarcss.item_right_right_wrap}>
                            <div className={navbarcss.options}>
                                <Widgets fontSize='medium' className={navbarcss.material_styling_right} />
                            </div>
                            <div className={navbarcss.options}>
                                <ChatBubbleOutlined fontSize='medium' className={navbarcss.material_styling_right} />
                            </div>
                            <div className={navbarcss.options}>
                                <Notifications fontSize='medium' className={navbarcss.material_styling_right} />
                            </div>
                            <div className={navbarcss.options_2}>
                                <Dropdown>
                                    <Dropdown.Toggle id={navbarcss.dropdown_basic}>
                                        
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className={navbarcss.menu_items} >
                                        <Dropdown.Item className={navbarcss.menu_items_individual} id={navbarcss.menu_items_item1}>
                                            <div className={navbarcss.profile}>
                                                <div className={navbarcss.profile_leftpart} >
                                                    <img src={user_data.profile_image} alt="" />
                                                </div>
                                                <div className={navbarcss.profile_rightpart}>
                                                    <div className={navbarcss.profile_rightpart_upper}>{user_data.first_name}</div>
                                                    <div className={navbarcss.profile_rightpart_lower}> See your Profile</div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item className={navbarcss.menu_items_individual} >
                                            <div className={navbarcss.profile_2}>
                                                <div className={navbarcss.dropdown_icons}> <Feedback htmlColor='white'/> </div>
                                                <div className={navbarcss.profile_rightpart_2}>
                                                    <div className={navbarcss.profile_rightpart_upper_2}>Give Feedback</div>
                                                    <div className={navbarcss.profile_rightpart_lower}>Help us improve Socialbook</div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item className={navbarcss.menu_items_individual}>
                                        <div className={navbarcss.profile_2}>
                                                <div className={navbarcss.dropdown_icons}> <Settings htmlColor='white'/> </div>
                                                <div className={navbarcss.profile_rightpart_2}>
                                                    <div className={navbarcss.profile_rightpart_upper_2}>Settings & Privacy</div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item className={navbarcss.menu_items_individual}>
                                        <div className={navbarcss.profile_2}>
                                                <div className={navbarcss.dropdown_icons}> <Help htmlColor='white'/> </div>
                                                <div className={navbarcss.profile_rightpart_2}>
                                                    <div className={navbarcss.profile_rightpart_upper_2}>Help & Support</div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item className={navbarcss.menu_items_individual}>
                                        <div className={navbarcss.profile_2}>
                                                <div className={navbarcss.dropdown_icons}> <Nightlight htmlColor='white'/> </div>
                                                <div className={navbarcss.profile_rightpart_2}>
                                                    <div className={navbarcss.profile_rightpart_upper_2}>Display & accessbility</div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item className={navbarcss.menu_items_individual} onClick={()=>{
                                                localStorage.clear();
                                                Navigate('/')
                                                window.location.reload();
                                        }}>
                                        <div className={navbarcss.profile_2}>
                                                <div className={navbarcss.dropdown_icons}> <Logout  htmlColor='white'/> </div>
                                                <div className={navbarcss.profile_rightpart_2}>
                                                    <div className={navbarcss.profile_rightpart_upper_2}  >Log out</div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
