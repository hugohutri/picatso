import React from "react";
import { Link } from "react-router-dom";

import "../styles.css";

// Navigation bar at the top of the page
function Nav() {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper blue lighten-2">
          <div className="nav-wrapper container">
            <ul className="left">
              <Link to="/about" className="">
                <i className="material-icons">terrain</i>
              </Link>
            </ul>
            <ul className="">
              <li>
                <Link
                  to="/"
                  className="btn waves-effect waves-light blue darken-4"
                >
                  <i className="material-icons">home</i>
                </Link>
              </li>
              <li>
                <Link
                  to="/myprofile"
                  className="btn waves-effect waves-light blue darken-4"
                >
                  <i className="material-icons">person</i>
                </Link>
              </li>
              <li>
                <Link
                  to="/users"
                  className="btn hide waves-effect waves-light blue darken-4"
                >
                  <i className="material-icons">people</i>
                </Link>
              </li>
            </ul>

            <ul className="right hide-on-small-and-down">
              <form className="" id="form1">
                <div className="input-field">
                  <input type="search" className="search-m white" />
                  <label className="label-icon" htmlFor="search">
                    <i className="material-icons black-text">search</i>
                  </label>
                  <i className="material-icons">close</i>
                  <div id="searchResults" />
                </div>
              </form>
            </ul>

            <ul className="right show-on-small">
              <form className="" id="form1">
                <div className="input-field">
                  <input type="search" className="search-s white" />
                  <label className="label-icon" htmlFor="search">
                    <i className="material-icons black-text">search</i>
                  </label>
                  <i className="material-icons">close</i>
                  <div id="searchResults" />
                </div>
              </form>
            </ul>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
