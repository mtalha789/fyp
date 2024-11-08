import React from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/Auth';
import { Cart } from './index' 




export default function MyNavbar() {
  const navigate = useNavigate()
  const { status: authStatus, logout } = useAuthStore()

  const handleLogout = () => {
    const response = logout()

    if (!response.success) {
      alert('Error loging out...')
      return
    }

    alert('Logged out successfully...')
    
  }

  return (
    <Navbar isBordered className="shadow-lg py-1 mb-2 md:mb-4">
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
        <NavbarItem>
          <Cart />
        </NavbarItem>
        {!authStatus ? (<>
          <NavbarItem className="">
            <Button color="primary" onClick={() => navigate('/login')} >Login</Button>
          </NavbarItem>
          <NavbarItem>
            <Button color="primary" onClick={() => navigate('/signup')}>Signup</Button>
          </NavbarItem>
        </>
        ):(
          <>
            <Button onClick={handleLogout} color="primary">
              Logout
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
