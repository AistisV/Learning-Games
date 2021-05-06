import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./navbarElement";

const Navbar = (props) => {
  return (
    <Nav>
      <Bars />
      <NavMenu>
        <NavLink to="/">sup</NavLink>
        <NavLink to="/services">Make a Test</NavLink>
        <NavLink to="/contact-us">button</NavLink>
        <NavLink to="/sign-up">another button</NavLink>
        {/* Second Nav */}
        {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/signin">Sign In</NavBtnLink>
      </NavBtn>
    </Nav>
  );
};

export default Navbar;
