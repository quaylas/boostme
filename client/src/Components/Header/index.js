import React from 'react';
import { Link } from 'react-router-dom'
import Nav from '../Nav';
import Carousel from '../Carousel';

function Header() {

    return (
      <div>
{/*       <div id="header-wrapper"> */}
      <header id="header" >

          <div id="logo">
            <h1><a href="#">BoostMe</a></h1>
          

          <Nav />
      </div>
      </header>
 {/*    </div> */}
      </div>


          );
}

export default Header;