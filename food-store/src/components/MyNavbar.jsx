import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import LoginForm from "./LoginForm";
import SignupForm from "./Signup/SignupForm";
// import { Link } from 'react-router-dom';

export default function MyNavbar() {
  return (
    <Navbar shouldHideOnScroll isBordered>
      <NavbarBrand>
        <Link color="foreground" href="/">
          <p className="font-extrabold text-3xl text-inherit">Mealo</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href="/PartnerWithUs">
            Partner with us
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="#">
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
      </NavbarContent>
    </Navbar>
  );
}
