import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer bg-light">
        <div className="footer-inner">
          <nav className="navbar navbar-expand-sm navbar-light">
            <div className="container">
              <div className="left-footer">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link text-nowrap" href="#">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Contact
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Terms of Use
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
                <small>Copyright &copy; 2019 JamFind</small>
              </div>

              <ul className="navbar-nav ml-auto landing-social-links">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span className="social-link-bg">
                      <i className="fab fa-facebook fa-2x" />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span className="social-link-bg">
                      <i className="fab fa-twitter-square fa-2x" />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span className="social-link-bg">
                      <i className="fab fa-instagram fa-2x" />
                    </span>
                  </a>
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
