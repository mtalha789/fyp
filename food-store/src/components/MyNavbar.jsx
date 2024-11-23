import { useState } from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/Auth";
import { Cart } from "./index";
import { Menu, X, } from "lucide-react";

export default function MyNavbar() {
  const navigate = useNavigate();
  const { status: authStatus, logout, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/close status

  const handleLogout = () => {
    const response = logout();

    if (!response.success) {
      alert("Error logging out...");
      return;
    }

    alert("Logged out successfully...");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
        <NavbarItem>
          <Cart />
        </NavbarItem>
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
            <Button onClick={handleLogout} color="primary">
              Logout
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile Menu Icon */}
      <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
        {isMenuOpen ? <X /> : <Menu />}
      </div>

      {/* Mobile Menu Links */}
      <div
        className={`md:hidden flex flex-col md:static space-y-4 bg-white px-5 items-center  p-4 absolute top-16 left-0 w-full z-10  duration-500  ${
          isMenuOpen ? "block" : "hidden"
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
    </Navbar>
  );
}
