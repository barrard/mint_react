import React from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class Navigation extends React.Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){
    return(
      <div>
        <Navbar color="light" light expand="md">
            <Link className="logo_link" to="/">
              <div class="stencil-text">
                Crowdsale Creator
              </div>
            </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto nav-gradient" navbar>
              <NavItem>
                <Link className="nav_link" to="/"                >Home</Link>
              </NavItem>
              <NavItem>
                <Link className="nav_link" to="/Create"                >Create</Link>
              </NavItem>
              <NavItem>
                  <Link className="nav_link" to="/My_Data"     >My_Data</Link>  
              </NavItem>
              <NavItem>
                  <Link className="nav_link" to="/Tokens" >Tokens</Link>  
              </NavItem>
              <NavItem>
                  <Link className="nav_link" to="/Crowdsale_list" >Crowdsale_list</Link>  
              </NavItem>
              <NavItem>
                  <Link className="nav_link" to="/About" >About</Link>  
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>

    )
  }
}
export default Navigation

{/*<nav>
  <Link to="/"               className="nav-item">Home</Link>
  <Link to="/User_stats"     className="nav-item">User Stats</Link>  
  <Link to="/Crowdsale_list" className="nav-item">Crowdsale List</Link>  
</nav>*/}