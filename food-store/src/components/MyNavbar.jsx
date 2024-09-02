import React from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/Auth'

export default function MyNavbar() {
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
    <Navbar isBordered>
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
      </NavbarContent>
    </Navbar>
  );
}
