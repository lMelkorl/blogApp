/* eslint-disable jsx-a11y/alt-text */
import "./Topbar.css";
import { useEffect, useState } from "react";
import defaultPP from "../defaultPP/default.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Context/Context";
import axios from 'axios';

export default function Topbar() {
  const PF = process.env.PF;
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { user, dispatch } = useContext(Context);

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace('/')
  };
  
  return (
    <Navbar className="topbar" fixed="top" light expand="md">
      <Container>
        <NavbarBrand href="/">Blog</NavbarBrand>
        <Collapse className="topCenter" isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">
                ANA SAYFA
                {/* <Link to="/" style={{textDecoration: 'none',color: 'inherit'}}>HAKKIMDA</Link> */}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">HAKKIMDA</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact">İLETİŞİM</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/write">YAZ</NavLink>
            </NavItem>
            <UncontrolledDropdown className="catOpt" nav inNavbar>
              <DropdownToggle nav caret>
                Kategoriler
              </DropdownToggle>
              <DropdownMenu right>
            {cats.map((c) => (
                <DropdownItem>
                    <Link
                      to={`/?cat=${c.name}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {c.name}
                    </Link>
                </DropdownItem>
                  ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink style={{ cursor: "pointer" }} onClick={handleLogout}>
                {user && "ÇIKIŞ YAP"}
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={
              user?.profilePic === "default.png" ? defaultPP : PF + user.profilePic
            } />
          </Link>
        ) : (
          <>
            <NavLink href="/login" style={{ color: "inherit" }}>
              Giriş Yap
            </NavLink>
            <NavLink href="/register" style={{ color: "inherit" }}>
              Kayıt Ol
            </NavLink>
          </>
        )}
        <NavbarToggler onClick={toggle}>
          
          </NavbarToggler>
      </Container>
    </Navbar>
  );
}
