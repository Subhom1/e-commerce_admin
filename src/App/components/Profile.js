import React, { Component } from "react";
import styled from "@emotion/styled";
const ProfileCss = styled("div")`
  // css starts here
`;
class Profile extends Component {
  render() {
    return (
      <ProfileCss>
        <div>Profile Comp</div>
      </ProfileCss>
    );
  }
}

export default Profile;
