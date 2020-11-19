import React from 'react';
import "./Header.css";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

function Header() {
    return (
        <div className="header">
            <Link to="/home">
            <img className="header__image" src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=007" />
            </Link>
            <Link className="header__navOptionOne" to="/home">
            <h3>G-BLOCKYBANK</h3>
            </Link>
           

            <div className="header__nav"> 
                <Link exact className="header__navOption" to="/home"><AiFillHome />Home</Link>
                <Link exact className="header__navOption" to="/aboutUs">About Us</Link>
                <Link exact className="header__navOption" to="/transaction" >Transaction</Link>
                <Link exact className="header__navOption" to="/notification">Notification</Link>
            </div>

            <div className="header__endNav">
                <FiSettings classname="header__setting" />
            </div>
        </div>

    )
}

export default Header
