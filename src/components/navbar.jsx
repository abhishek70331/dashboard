import React from "react";
import { Navbar,Nav } from "react-bootstrap";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';


function NavBar() {
    return (
        <>
        <Navbar bg="dark">
            <Nav className="design">
                <Nav.Link href="/" className="text-white mx-3"><strong>Home</strong></Nav.Link>
                <Nav.Link href="/dashboard" className="text-white mx-3"><strong>Dashboard</strong></Nav.Link>
                <Nav.Link href="/live" className="text-white mx-3"><strong>Live Score</strong></Nav.Link>
                <Nav.Link href="/signup" className="text-white mx-3"><strong>Signup</strong></Nav.Link>
                <Nav.Link href="/login" className="text-white mx-3"><strong>Login</strong></Nav.Link>
            </Nav>
        </Navbar>
        </>
    )
}

export default NavBar;  