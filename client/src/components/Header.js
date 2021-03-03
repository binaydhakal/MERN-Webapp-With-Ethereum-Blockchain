import React, { Fragment } from "react";
import "../css/Header.css";
import { Link, withRouter} from "react-router-dom";
import { isAuthenticated, logout } from "../helpers/auth";

const Header = ({ history }) => {

  const handleLogout = (evt) => {
    logout(() => {
      history.push('/signin');
    });
  }


  const showNavigation = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          AGB-BANK
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">


            {!isAuthenticated() && (
              <Fragment>
               <li className="nav-item px-3">
                <Link className="nav-link" aria-current="page" to="/">
                 <i className="fas fa-home"></i> Home
                </Link>
              </li>

              <li className="nav-item px-3 ">
                <Link className="nav-link " aria-current="page" to="#">
                <i class="fas fa-users"></i> About Us
                </Link>
              </li>
              <li className="nav-item px-3 ">
                <Link className="nav-link " aria-current="page" to="/signup">
                <i class="fas fa-user-plus"></i> SignUp
                </Link>
              </li>
              <li className="nav-item px-3">
                <Link className="nav-link" to="/signin">
                <i class="fas fa-sign-in-alt"></i> SignIn
                </Link>
              </li>

              </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().role === 1 && (
              <Fragment>
               <li className="nav-item px-3">
                <Link className="nav-link" aria-current="page" to="/admin/dashboard">
                <i className="fas fa-home"></i> Admin Home
                </Link>
              </li>

              <li className="nav-item px-3 ">
                <Link className="nav-link " aria-current="page" to="#">
                <i class="fas fa-table"></i> User Data
                </Link>
              </li>
              </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().role === 0 && (
              <Fragment>
               <li className="nav-item px-3">
                <Link className="nav-link" aria-current="page" to="/user/dashboard">
                <i className="fas fa-home"></i> User Home
                </Link>
              </li>

              <li className="nav-item px-3 ">
                <Link className="nav-link " aria-current="page" to="#">
                <i class="fas fa-table"></i> KYC
                </Link>
              </li>
              <li className="nav-item px-3 ">
                <Link className="nav-link " aria-current="page" to="/signup">
                <i class="fas fa-bell"></i> Notification
                </Link>
              </li>
              </Fragment>
            )}

            {isAuthenticated() && (
              <Fragment>
              <li className="nav-item px-3">
                <button className="btn btn-link text-decoration-none pl-0" onClick={handleLogout}>
                <i class="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>

              </Fragment>
            )}
            



          </ul>
        </div>
      </div>
    </nav>
  );

  return <header>{showNavigation()}</header>;
};

export default withRouter(Header);
