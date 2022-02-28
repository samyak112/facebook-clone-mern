import React from 'react';
import Friendscss from './Friends.module.css'
import Friends_rightpane from './Friends_rightpane/Friends_rightpane';
import Friends_leftpane from './Friends_leftpane/Friends_leftpane';
import Navbar from '../navbar/Navbar'

function Friends() {
    return <div className={Friendscss.parent}>
    <Navbar/>
    <div className={Friendscss.main}>
      <Friends_leftpane/>
      <Friends_rightpane/>
    </div>

         
  </div>;
}

export default Friends;
