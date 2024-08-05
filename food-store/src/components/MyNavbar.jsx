import React, {useState} from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./Signup/SignupForm";
import Cart from "./Cart";
// import { Link } from 'react-router-dom';



export default function MyNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Navbar shouldHideOnScroll isBordered>
      <NavbarBrand>
        <Link to="/">
          <p className="font-extrabold text-3xl text-inherit">Mealo</p>
          </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" to="/PartnerWithUs">
            Partner with us
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" to="/Careers">
            Careers
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <LoginForm />
        </NavbarItem>
        <NavbarItem>
          <SignupForm />
        </NavbarItem>
        <NavbarItem>
          <Cart />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
