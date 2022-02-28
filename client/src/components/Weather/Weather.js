import React from 'react';
import weathercss from './weather.module.css'
import Weatherleftpane from './Weather_leftpane/Weatherleftpane'
import Weatherrightpane from './Weather_rightpane/Weatherrightpane';
import Navbar from '../navbar/Navbar';
export default function Weather() {
  return <div>
    <Navbar/>
    <div className={weathercss.main}>
      <Weatherleftpane/>
      <Weatherrightpane/>
    </div>

         
  </div>;
}
