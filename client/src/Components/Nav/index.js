import React from 'react';
import Auth from "../../utils/auth";
import { Link } from 'react-router-dom';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';


    function Navigator() {
      if (Auth.loggedIn()) {
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
                        <Link to='/dashboard'>
                            My Dashboard
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
                        <DropdownItem a href='https://tonganknight.github.io/'>Malachi</DropdownItem>
                        <DropdownItem a href='http://www.github.com/nickovalles'>Nick</DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                      </li>
                    <li>
                      <Link to='/home' onClick={() => Auth.logout()}>
                      Log Out
                      </Link>
  
                    </li>
                    </ul>
                </nav>
                </div>
                );
      } else {
        return (
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
                        <DropdownItem a href='https://tonganknight.github.io/'>Malachi</DropdownItem>
                        <DropdownItem a href='http://www.github.com/nickovalles'>Nick</DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                      </li>
                    <li>
                      <Link to='/login'>
                      Log In
                      </Link>
  
                  </li>
                </ul>
            </nav>
          </div>
        )
      }
    }
    
    export default Navigator;



  