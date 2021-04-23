import React from 'react';
//import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';


    function Navigator() {

return(
        <div>
          <Navbar color="light" light expand="md">
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/components/">Home</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    About Us
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Nick
                    </DropdownItem>
                    <DropdownItem>
                      Quayla
                    </DropdownItem>
                    <DropdownItem>
                      Malachi
                    </DropdownItem>
                    <DropdownItem>
                      Janele
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <NavbarText>Login/Signup</NavbarText>
          </Navbar>
        </div>
      );
    }
    
    export default Navigator;





  