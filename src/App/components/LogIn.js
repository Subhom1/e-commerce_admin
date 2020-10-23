import React from "react";
import { NavLink } from "react-router-dom";
import Firebase from "../../firebase.js";
import "../../assets/scss/style.scss";
import Aux from "../../hoc/_Aux";
import { SET_CURRENT_USER } from "../../auth/auth.actions";
import { connect } from "react-redux";
import Loader from "../layout/Loader/index";
class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false,
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onLogin = async (e) => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    try {
      let resp = await Firebase.login(email, password);
      let result = await resp.user;
      this.props.setCurrentUser(result);
      this.props.history.replace("/panel/dashboard");
      this.setState({ loading: false });
      console.log(result, "result");
    } catch (err) {
      console.error("Error >>>", err);
    }
  };
  render() {
    const { email, password, loading } = this.state;
    return (
      <Aux>
        {loading && <Loader />}
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
                  <i className="feather icon-unlock auth-icon" />
                </div>
                <h3 className="mb-4">Login</h3>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group text-left">
                  <div className="checkbox checkbox-fill d-inline">
                    <input
                      type="checkbox"
                      name="checkbox-fill-1"
                      id="checkbox-fill-a1"
                    />
                    <label htmlFor="checkbox-fill-a1" className="cr">
                      {" "}
                      Save credentials
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-primary shadow-2 mb-4"
                  onClick={this.onLogin}
                  disabled={loading}
                >
                  Login
                </button>
                <p className="mb-2 text-muted">
                  Forgot password? <NavLink to="/reset-password">Reset</NavLink>
                </p>
                <p className="mb-0 text-muted">
                  Don’t have an account? <NavLink to="/signup">Signup</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (data) => dispatch(SET_CURRENT_USER(data)),
});
export default connect(null, mapDispatchToProps)(LogIn);
