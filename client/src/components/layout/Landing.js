import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="landing">
          <div className="text-center landing-inner overlay text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="display-3 mb-3">JamFind</h1>
                  <p className="lead mb-4">
                    Connect and collaborate with local and international
                    musicians.
                  </p>
                  <Link
                    to="/create-account"
                    className="btn btn-custom-primary btn-lg mr-1"
                  >
                    Create Account
                  </Link>
                  <Link to="/login" className="btn btn-custom-secondary btn-lg">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-icons">
          <div className="text-center feature-icons-inner">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="card custom-card">
                    <span className="card-img-top p-2">
                      <i className="fas fa-search fa-5x enlarge" />
                    </span>
                    <div className="card-body">
                      <h3 className="card-title">Find Local Talent</h3>
                      <p className="card-text">
                        Get to know likeminded musician's in your hometown.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card custom-card">
                    <span className="card-img-top p-2">
                      <i className="fas fa-microphone fa-5x enlarge" />
                    </span>
                    <div className="card-body">
                      <h3 className="card-title">Collaborate</h3>
                      <p className="card-text">
                        Build a team to work on music projects with.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card custom-card">
                    <span className="card-img-top p-2">
                      <i className="fas fa-bullhorn fa-5x enlarge" />
                    </span>
                    <div className="card-body">
                      <h3 className="card-title">Share Feedback</h3>
                      <p className="card-text">
                        Get feedback on your work or skills, and offer your
                        opinion to others.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="feature-showcase text-center">
          <div className="container-fluid p-0">
            <div className="row no-gutters">
              <div className="col-md-6">
                <div className="feature-text">
                  <h2>Find Musician's In Your Area</h2>
                  <p className="lead">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="feature-image f-img-1" />
              </div>
            </div>
            <div className="row no-gutters d-flex">
              <div className="col-md-6 order-2 order-md-1">
                <div className="feature-image f-img-2" />
              </div>
              <div className="col-md-6 order-1 order-md-2">
                <div className="feature-text">
                  <h2>Collaborate</h2>
                  <p className="lead">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-md-6">
                <div className="feature-text">
                  <h2>Give And Receive Valuable Insight</h2>
                  <p className="lead">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="feature-image f-img-3" />
              </div>
            </div>
          </div>
        </div>
        <div className="testimonials text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="mt-5 mb-4">
                  What professional artists are saying...
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card custom-card">
                  <img
                    src="https://res.cloudinary.com/mtninja/image/upload/c_scale,h_200,w_200/v1546924700/testimonial-1_joiu2o.jpg"
                    className="card-img-top rounded-circle"
                    alt="..."
                  />
                  <div className="card-body">
                    <h3 className="card-title">John D.</h3>
                    <p className="card-text">
                      "Finding buddies to jam with has never been easier."
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card custom-card">
                  <img
                    src="https://res.cloudinary.com/mtninja/image/upload/ar_1:1,bo_0px_solid_rgb:ffffff,c_fill,g_auto,h_200,r_max,w_200/v1546924320/testimonial-3_ny31vk.jpg"
                    className="card-img-top rounded-circle"
                    alt="..."
                  />
                  <div className="card-body">
                    <h3 className="card-title">Jessica W.</h3>
                    <p className="card-text">
                      "I'm so happy to work with new people!"
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card custom-card">
                  <img
                    src="https://res.cloudinary.com/mtninja/image/upload/ar_1:1,bo_0px_solid_rgb:ffffff,c_fill,g_auto,h_200,r_max,w_200/v1546924359/testimonial-2_yajc2g.jpg"
                    className="card-img-top rounded-circle"
                    alt="..."
                  />
                  <div className="card-body">
                    <h3 className="card-title">Eduardo S.</h3>
                    <p className="card-text">
                      "I've grown so much as a musician with JamFind because I
                      know I can get feedback at any time."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-bottom">
          <div className="text-center landing-bottom-inner overlay-bottom text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <p className="lead mb-4">Ready to get started?</p>
                  <Link
                    to="/create-account"
                    className="btn btn-custom-primary btn-lg mr-1"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
