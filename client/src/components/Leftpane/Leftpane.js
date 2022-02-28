import React from 'react'
import {AccountCircle} from '@mui/icons-material';
import Leftpanecss from './leftpane.module.css'
import friends from '../images/friends.png'
import Groups from '../images/groups.png'
import marketplace from '../images/marketplace.png'
import Watch from '../images/watch.png'
import Messenger from '../images/messenger.png'
import weather from '../images/weather.png'
import blood from '../images/blood_donation.png'
import ad_center from '../images/ad_center.png'
import covid from '../images/covid_centre.png'
import ads_manager from '../images/ads_manager.png'
import memories from '../images/memories.png'
import climate_center from '../images/climate_center.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import usedata from '../usedata'



export default function Leftpane() {
    const user_data = usedata()
    return (
            <div className={Leftpanecss.main}>
                <Link to={`/profile/${user_data.id}`} className={Leftpanecss.items} id={Leftpanecss.item_1} >
                    <div className={Leftpanecss.leftside}>
                        <img src={user_data.profile_image} alt="" />
                    </div>
                    <div className={Leftpanecss.rightside} id='item_left'>{user_data.first_name} {user_data.second_name}</div>
                </Link>
                <Link to='/friends' className={Leftpanecss.items} id={Leftpanecss.item_2}>
                    <div className={Leftpanecss.leftside}>
                        <img src={friends} alt="" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Friends
                    </div>
                </Link>
                <div className={Leftpanecss.items} id={Leftpanecss.item_3}>
                    <div className={Leftpanecss.leftside}>
                        <img src={Groups} alt="groups" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Groups
                    </div>
                </div>
                <div className={Leftpanecss.items} id={Leftpanecss.item_4}>
                    <div className={Leftpanecss.leftside}>
                        <img src={marketplace} alt="marketplace" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Marketplace
                    </div>
                </div>
                <div className={Leftpanecss.items} id={Leftpanecss.item_5}>
                    <div className={Leftpanecss.leftside}>
                        <img src={Watch} alt="Watch" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Watch
                    </div>
                </div>
                <div className={Leftpanecss.items} id={Leftpanecss.item_6}>
                    <div className={Leftpanecss.leftside}>
                        <img src={Messenger} alt="messenger" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Messenger
                    </div>
                </div>
                <Link to='/weather' className={Leftpanecss.items} id={Leftpanecss.item_7}>
                    <div className={Leftpanecss.leftside}>
                        <img src={weather} alt="messenger" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Weather
                    </div>
                </Link>
                <div className={Leftpanecss.items} id={Leftpanecss.item_8}>
                    <div className={Leftpanecss.leftside}>
                        <img src={blood} alt="messenger" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Blood Donation
                    </div>
                </div>
                <div className={Leftpanecss.items} id={Leftpanecss.item_9}>
                    <div className={Leftpanecss.leftside}>
                        <img src={ad_center} alt="messenger" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Ad Centre
                    </div>
                </div>
                <div className={Leftpanecss.items} iid={Leftpanecss.item_10}>
                    <div className={Leftpanecss.leftside}>
                        <img src={covid} alt="messenger" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Covid stats
                    </div>
                </div>
                <div className={Leftpanecss.items} iid={Leftpanecss.item_11}>
                    <div className={Leftpanecss.leftside}>
                        <img src={ads_manager} alt="ads_manager" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Ads Manager
                    </div>
                </div>
                <div className={Leftpanecss.items} iid={Leftpanecss.item_12}>
                    <div className={Leftpanecss.leftside}>
                        <img src={memories} alt="memories" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Memories
                    </div>
                </div>
                <div className={Leftpanecss.items} iid={Leftpanecss.item_13}>
                    <div className={Leftpanecss.leftside}>
                        <img src={climate_center} alt="climate_center" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Climate Center
                    </div>
                </div>
                <div className={Leftpanecss.items} iid={Leftpanecss.item_14}>
                    <div className={Leftpanecss.leftside}>
                        <img src={climate_center} alt="climate_center" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Climate Center
                    </div>
                </div>
                <div className={Leftpanecss.items} iid={Leftpanecss.item_15}>
                    <div className={Leftpanecss.leftside}>
                        <img src={climate_center} alt="climate_center" />
                    </div>
                    <div className={Leftpanecss.rightside}>
                        Climate Center
                    </div>
                </div>
                
                
            </div>
    )
}
