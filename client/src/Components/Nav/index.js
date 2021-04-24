import React from 'react';
import { Link } from 'react-router-dom';
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
				<li>
                    <Link to='/'>
                        Home
                    </Link>
                    </li>
				    <li>
					<UncontrolledDropdown color='white'>
                    <DropdownToggle caret>
                        About Us
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem a href='http://www.github.com/quaylas'>Quayla</DropdownItem>
                    <DropdownItem a href='http://www.github.com/jleatham78'>Janele</DropdownItem>
                    <DropdownItem a href='http://www.github.com/tonganknight'>Malachi</DropdownItem>
                    <DropdownItem a href='http://www.github.com/nickovalles'>Nick</DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                    </li>
				<li>
                    <Link to='/login'>
                    Log In
                    </Link>
                    <Link to='/signup'>
                    Sign Up
                    </Link>

                </li>
			</ul>
		    </nav>
        </div>
      );
    }
    
    export default Navigator;





  