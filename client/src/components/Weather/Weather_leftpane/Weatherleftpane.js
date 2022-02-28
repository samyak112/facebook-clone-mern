import React , {useState} from 'react';
import Weather_leftpanecss from './Weather_leftpane.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Weather_leftpane() {

  const [valuestate, setvaluestate] = useState(true)
  const [id, setId] = useState(null);


  const togglearrow = (val)=>{        
    if(valuestate==true){
      setvaluestate(false)
    }else{
      setvaluestate(true)
    }
    setId(val);
  }

  
  return <div>
      <div className={Weather_leftpanecss.main}>
        <div id={Weather_leftpanecss.item_1}>Weather</div>
        <div id={Weather_leftpanecss.item_2}>
          <input type="text" placeholder='Search for city..' />
        </div>
        <div id={Weather_leftpanecss.item_3} className={Weather_leftpanecss.item3and4}> 
          <div className={Weather_leftpanecss.item_3_content} id="item_3_1">
            Cities
          </div>
          <div className={Weather_leftpanecss.item_3_content} id="item_3_2" onClick={() => togglearrow('item_3_2')} >
            {valuestate && id == 'item_3_2' ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
          </div>
        </div>
        <div id={Weather_leftpanecss.item_4} className={Weather_leftpanecss.item3and4}>
          <div className={Weather_leftpanecss.item_4_content} id="item_4_1">
            Settings
          </div>
          <div className={Weather_leftpanecss.item_4_content} id="item_4_2" onClick={() => togglearrow('item_4_1')}>
          {valuestate && id == 'item_4_1' ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
          </div>
        </div>
      </div>

  </div>;
}