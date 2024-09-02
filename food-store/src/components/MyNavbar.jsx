import React, {useState} from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown
} from "@nextui-org/react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import LoginForm from "./forms/LoginForm";
import SignupForm from "./Signup/SignupForm";
import Cart from "./Cart";
// import { Link } from 'react-router-dom';
=======
import { useAuthStore } from '../store/Auth'
>>>>>>> dev



export default function MyNavbar() {
<<<<<<< HEAD
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };
=======
  const { status: authStatus, logout } = useAuthStore()

  const handleLogout = () => {
    const response = logout()

    if (!response.success) {
      alert('Error loging out...')
      return
    }

    alert('Logged out successfully...')
    
  }
>>>>>>> dev

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link to="/">
          <p className="font-extrabold text-3xl text-inherit">Mealo</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" to="/partner-with-us">
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
<<<<<<< HEAD
        <NavbarItem className="hidden lg:flex">
        
          <LoginForm />
         
        </NavbarItem>
        <NavbarItem>
          <SignupForm />
        </NavbarItem>
        <NavbarItem>
          <Cart />
        </NavbarItem>
=======
        {!authStatus ? (<>
          <NavbarItem className="">
            <Link color="default" to="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="" to="/signup">Signup</Link>
          </NavbarItem>
        </>
        ):(
          <>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
>>>>>>> dev
      </NavbarContent>
    </Navbar>
  );
}
