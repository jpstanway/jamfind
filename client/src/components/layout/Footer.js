import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="footer bg-darkwood mt-5">
        <div className="footer-inner">
          <nav className="navbar navbar-expand-sm navbar-dark">
            <div className="container">
              <div className="left-footer">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Terms of Use
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
                <small className="text-light">
                  Copyright &copy; 2019 JamFind
                </small>
              </div>

              <ul className="navbar-nav ml-auto landing-social-links">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <span className="social-link-bg">
                      <i className="fab fa-facebook fa-2x" />
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <span className="social-link-bg">
                      <i className="fab fa-twitter-square fa-2x" />
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <span className="social-link-bg">
                      <i className="fab fa-instagram fa-2x" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </footer>
    );
  }
}

export default Footer;
