import React from 'react';
import Friends_leftpanecss from '../Friends_leftpane/Friends_leftpane.module.css'
import {Settings,People,PersonAdd} from '@mui/icons-material';
function Friends_leftpane() {
  return <div>
      <div className={Friends_leftpanecss.main}>
        <div className={Friends_leftpanecss.upper}>
          <div id={Friends_leftpanecss.upperleft}>
            Friends
          </div>
          <div id={Friends_leftpanecss.upperright} className={Friends_leftpanecss.circle}>
            <Settings/>
          </div>
        </div>
        <div className={Friends_leftpanecss.lower}>
          <div className={Friends_leftpanecss.items} id={Friends_leftpanecss.item_1}>
            <div className={Friends_leftpanecss.circle}> <People/></div>
               Home
          </div>
          <div className={Friends_leftpanecss.items} id={Friends_leftpanecss.item_2}>
            <div className={Friends_leftpanecss.circle}> <PersonAdd/></div>
            Friend requests
          </div>
          <div className={Friends_leftpanecss.items} id={Friends_leftpanecss.item_3}>
            <div className={Friends_leftpanecss.circle}> <PersonAdd/></div> 
            Suggestions
          </div>
          <div className={Friends_leftpanecss.items} id={Friends_leftpanecss.item_4}>
            <div className={Friends_leftpanecss.circle}> <PersonAdd/></div> 
            All Friends
          </div>
          <div className={Friends_leftpanecss.items} id={Friends_leftpanecss.item_5}>
            <div className={Friends_leftpanecss.circle}> <PersonAdd/></div> 
            Birthdays
          </div>
          <div className={Friends_leftpanecss.items} id={Friends_leftpanecss.item_6}>
            <div className={Friends_leftpanecss.circle}> <PersonAdd/></div> 
            Custom Lists
          </div>
        </div>
      </div>
  </div>;
}

export default Friends_leftpane;
