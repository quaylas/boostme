import React from 'react';
//import { Link } from 'react-router-dom';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';


    function Navigator() {

return(
        <div>
          <nav id="nav">
								<ul>
									<li class="current"><a href="">Home</a></li>
									<li>
									<UncontrolledDropdown color='white'>
      <DropdownToggle>
        Dropdown
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem a href='http://www.github.com/quaylas'>Quayla</DropdownItem>
        <DropdownItem a href='http://www.github.com/jleatham78'>Janele</DropdownItem>
		<DropdownItem a href='http://www.github.com/tonganknight'>Malachi</DropdownItem>
        <DropdownItem a href='http://www.github.com/nickovalles'>Nick</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
	</li>
									<li><a href="doorway.html">Log In / Sign Up</a></li>
								</ul>
							</nav>
        </div>
      );
    }
    
    export default Navigator;





  