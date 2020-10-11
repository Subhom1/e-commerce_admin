import React from "react";
import { NavLink } from "react-router-dom";

import "../../assets/scss/style.scss";
import Aux from "../../hoc/_Aux";

class SignUp extends React.Component {
  render() {
    return (
      <Aux>
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="feather icon-user-plus auth-icon" />
                </div>
                <h3 className="mb-4">Forgot Password</h3>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                <button className="btn btn-primary shadow-2 mb-4">
                  Send Mail
                </button>
                <p className="mb-0 text-muted">
                  Allready have an account? <NavLink to="/login">Login</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignUp;
