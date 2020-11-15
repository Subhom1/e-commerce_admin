import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../redux/constant";
import Avatar1 from "../../../../../assets/images/user/avatar-1.jpg";
import Firebase from "../../../../../firebase";
import { connect } from "react-redux";
class NavRight extends Component {
  state = {
    listOpen: false,
  };

  render() {
    return (
      <Aux>
        <ul className="navbar-nav ml-auto">
          <li>
            <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                <i className="icon feather icon-settings" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <div className="pro-head">
                  <img
                    src={Avatar1}
                    className="img-radius"
                    alt="User Profile"
                  />
                  <span>{this.props.displayName}</span>
                  <a
                    className="dud-logout"
                    title="Logout"
                    href={DEMO.BLANK_LINK}
                    onClick={() =>
                      Firebase.logout().then((resp) =>
                        console.log(resp, "resp")
                      )
                    }
                  >
                    <i className="feather icon-log-out" />
                  </a>
                </div>
                <ul className="pro-body">
                  <li>
                    <Link className="dropdown-item" to="/panel/profile">
                      <i className="feather icon-user" /> Profile
                    </Link>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => ({ ...state.auth.currentUser });
export default connect(mapStateToProps, null)(NavRight);
