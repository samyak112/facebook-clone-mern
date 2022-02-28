import Leftpane from '../Leftpane/Leftpane'
import Rightpane from '../Rightpane/Rightpane'
import Middlebody from '../Middlebody/Middlebody'
import HomeCss from './Home.module.css'
import Navbar from '../navbar/Navbar'
import React , {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux';
import {action} from '../../state/index'

export default function Home() {

  return <div>
     
    <Navbar />
      <div className={HomeCss.main__body}>
          <Leftpane />
          <Middlebody />
          <Rightpane/>
        </div>
      
  </div>;
}
