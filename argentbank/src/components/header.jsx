import { Link } from "react-router-dom";

import Connection from "./connection";

import logo from "../assets/img/argentBankLogo.png";
import "../index.css";


function Header() {
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Connection />
            </div>
        </nav>
    );
}

export default Header;