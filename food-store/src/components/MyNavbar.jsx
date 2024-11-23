import { useState } from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/Auth";
import { Cart } from "./index";
import { Menu, X, } from "lucide-react";

export default function MyNavbar() {
  const navigate = useNavigate();
  const { status: authStatus, logout, user } = useAuthStore();
  const {isOpen, onOpen, onOpenChange}= useDisclosure()

  const handleLogout = () => {
    const response = logout();

    if (!response.success) {
      alert("Error logging out...");
      return;
    }

    alert("Logged out successfully...");
  };

  const toggleMenu = () => onOpenChange(false);

  return (
    <Navbar isBordered className="flex items-center justify-evenly px-4 py-1">
      {/* Brand Logo */}
      <NavbarBrand>
        <Link to="/">
          <p className="font-extrabold text-3xl  cursor-pointer">
            Mealo
          </p>
        </Link>
      </NavbarBrand>

      {/* Desktop Menu Links */}
      <NavbarContent className="hidden md:flex gap-8  md:items-center md justify-center">
        {user?.role?.toUpperCase() === "SELLER" ? (
          <NavbarItem isActive>
            <Link className=" hover:text-gray-500" to="/partner-portal">
              Go to Portal
            </Link>
          </NavbarItem>
        ) : (
          <NavbarItem isActive>
            <Link className=" hover:text-gray-500" to="/partner-with-us">
              Partner with us
            </Link>
          </NavbarItem>
        )}
        <NavbarItem isActive>
          <Link className=" hover:text-gray-500" to="/Careers">
            Careers
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Right Side Content (Cart and Auth Buttons) */}
      <NavbarContent justify="end" className=" md:flex items-center gap-4">
        {!authStatus ? (
          <>
            <NavbarItem>
              <Button variant="flat" onClick={() => navigate("/login")}>
                Login
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:hidden md:block">
              <Button color="default" onClick={() => navigate("/signup")}>
                Signup
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button onClick={handleLogout} color="default">
              Logout
            </Button>
          </NavbarItem>
        )}
        <NavbarItem>
          <Cart />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu Icon */}
      <Button isIconOnly variant="light" className="md:hidden cursor-pointer rounded-full" onClick={isOpen ? onOpenChange : onOpen}>
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Mobile Menu Links */}
      {isOpen &&(

      <div
        className={`md:hidden flex flex-col md:static space-y-4 md:justify-center md:content-center md:bg-black bg-white px-5 items-center  p-4 absolute top-16 left-0 w-full z-10  duration-500  ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link
          className="w-full  hover:text-gray-500"
          to="/partner-with-us"
          onClick={toggleMenu}
        >
          Partner with us
        </Link>
        <Link
          className="w-full  hover:text-gray-500"
          to="/Careers"
          onClick={toggleMenu}
        >
          Careers
        </Link>
      </div>
      )}
    </Navbar>
  );
}
