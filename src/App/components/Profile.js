import React, { Component } from "react";
import styled from "@emotion/styled";
import userImg from "../../assets/images/user/avatar.jpg";
import keyImg from "../../assets/images/key.svg";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // width: "500px",
    // height: "400px",
  },
};
Modal.setAppElement("#root");

const ProfileCss = styled("div")`
  .profile__image__wraper img {
    width: 100%;
  }
  .profile__image__wraper {
    width: 50%;
    float: right;
    margin-right: 15%;
    position: relative;
  }
  .edit__icon,
  .mail__icon {
    font-size: 20px;
    color: #000;
  }
  // .clearfix::after {
  //   content: "";
  //   clear: both;
  //   display: table;
  // }
  .name__box,
  email__box {
    padding-top: 25px;
  }
  .email__box h4 {
    margin-left: 10px;
    margin-bottom: 0;
  }
  ._flex {
    display: flex;
  }
  .edit__icon {
    margin-top: 4px;
    font-size: 15px;
    margin-right: 2px;
  }
  .mail__icon {
    margin-top: 4px;
  }
  .change__password__box h5 {
    margin-left: 10px;
    margin-bottom: 0;
  }
  .email__box,
  .change__password__box {
    margin: 25px 0;
  }
  .change__password__box {
    width: 35%;
    cursor: pointer;
  }
  .name__box span {
    color: #000;
    font-size: 15px;
    padding-left: 15px;
  }
  img.change__password__img {
    width: 20px;
  }
  .name__box input,
  .email__box input {
    width: 100%;
    border: none;
    outline: none;
    background: none;
    font-size: 15px;
    color: #555;
    padding: 15px;
  }
  .username,
  .useremail {
    width: 50%;
    border-radius: 8px;
    box-shadow: inset 7px 7px 7px #cbcde1, inset -7px -7px 7px #fff;
  }
  button {
    outline: none;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    color: #fff;
    box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #fff;
    transition: 0.5s;
    padding: 15px;
    width: 47%;
    text-transform: uppercase;
    font-weight: 700;
  }
  button.update__button {
    background: #24cfaa;
  }
  button.cancel__button {
    background: #f00;
    margin-right: 15px;
  }
  button.update__button:hover {
    background: #2fdbb6;
  }
  button.update__button:active {
    background: #1da88a;
  }
  .edit_info {
    cursor: pointer;
  }
  h4.email__display {
    display: inline-block;
  }
  .info__email {
    width: 100%;
  }
  .button__wrapper {
    width: 50%;
  }
  .error_message {
    font-size: 12px;
    color: #f00;
  }
  .upload__overlay {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    transition: 0.5s ease;
    left: 0;
    bottom: -109px;
    background: #607d8ba6;
    clip-path: circle(50% at 50% -2.5%);
    text-align: center;
    cursor: pointer;
  }
  .profile__image__wraper:hover .upload__overlay {
    opacity: 1;
  }
  .upload__overlay span.upload__text i {
    margin: 0 5px;
  }
  span.upload__text {
    font-size: 20px;
    color: #fff;
    margin-top: 25px;
    display: inline-block;
    width: 100%;
  }

  .ReactModal__Overlay.ReactModal__Overlay--after-open {
    background-color: #00000047;
  }
  button.styles_closeButton {
    background: transparent;
    outline: none;
    border: none;
    position: absolute;
    top: 15px;
    right: 15px;
  }
`;
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      modalIsOpen: false,
      showCrop: false,
      src: null,
      crop: {
        width: 260,
        height: 260,
      },
      mainCanvasWidth: 376,
      mainCanvasHeight: 260,
    };
  }
  handleEditMode = () => this.setState({ editMode: true });
  closeModal = () => this.setState({ modalIsOpen: false, showCrop: false });
  afterOpenModal = () => {
    let elem = document.getElementsByClassName("ReactModal__Overlay");
    elem[0].style.backgroundColor = "#0000004a";
  };
  canvasIt = (image, crop) => {
    crop = { width: crop.width + 2, height: crop.height + 2 };
    let mainCanvasWidth = this.state.mainCanvasWidth;
    let mainCanvasHeight = this.state.mainCanvasHeight;
    var canel = document.getElementById("can");
    var cancontext = canel.getContext("2d");
    var img = new Image();
    img.src = image;

    var cap = {
      width: 0,
      height: 0,
    };

    var activateMouse = false;
    var imagecrop = (image) => {
      this.setState(
        {
          croppedImageUrl: image,
        },
        () => {
          console.log(this.state.croppedImageUrl, "img");
        }
      );
      // console.log(image,"img")
    };
    img.crossOrigin = "Anonymous";
    var loadImage = () => {
      canel.width = mainCanvasWidth;
      canel.height = mainCanvasHeight;
      img.width = cap.width =
        img.naturalWidth > mainCanvasWidth ? mainCanvasWidth : img.naturalWidth;
      img.height = cap.height =
        (img.width * img.naturalHeight) / img.naturalWidth;

      if (img.height < crop.height) {
        img.height = cap.height = crop.height;
        img.width = cap.width =
          (img.height * img.naturalWidth) / img.naturalHeight;
      }
      var zoom;
      if (img.naturalWidth > img.naturalHeight) {
        zoom =
          canel.width / img.naturalWidth < 1
            ? canel.width / img.naturalWidth
            : 1;
      } else {
        zoom =
          canel.height / img.naturalHeight < 1
            ? canel.height / img.naturalHeight
            : 1;
      }

      // Draw image on center of the
      var imgCoordinate = {};
      if (img.naturalWidth < canel.width) {
        imgCoordinate.x = (canel.width - crop.width) / 2;
      } else {
        imgCoordinate.x =
          (canel.width / 2 - (img.naturalWidth * zoom) / 2) *
          (img.width / canel.width);
      }
      if (img.naturalHeight < canel.height) {
        imgCoordinate.y = (canel.height - crop.height) / 2;
      } else {
        imgCoordinate.y = canel.height / 2 - img.height / 2;
      }

      cancontext.drawImage(
        img,
        imgCoordinate.x,
        imgCoordinate.y,
        img.width,
        img.height
      );

      //Draw crop rectangle
      var drawCropArea = () => {
        cancontext.beginPath();
        cancontext.lineWidth = "1";
        cancontext.strokeStyle = "white";
        cancontext.fillStyle = "rgba(0,0,0,0.3)";

        cancontext.beginPath();
        cancontext.rect(0, 0, canel.width, canel.height, false);
        cancontext.rect(
          (canel.width - crop.width) / 2,
          (canel.height - crop.height) / 2,
          crop.width,
          crop.height,
          true
        );
        cancontext.stroke();
        cancontext.fill("evenodd");
      };
      drawCropArea();
      var imgData;
      var collectImageData = () => {
        imgData = cancontext.getImageData(
          (canel.width - crop.width) / 2 + 1,
          (canel.height - crop.height) / 2 + 1,
          crop.width - 2,
          crop.height - 2
        );
      };
      collectImageData();

      // var thumbnailTimeout;
      var generateThumbnail = () => {
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        ctx.putImageData(imgData, 0, 0);
        imagecrop(cutoutCanvas.toDataURL("image/png"));
      };
      var restrictions = (e) => {
        if (
          imgCoordinate.x + img.width + e.movementX <
          (canel.width - crop.width) / 2 + crop.width
        ) {
          imgCoordinate.x = -(
            img.width -
            ((canel.width - crop.width) / 2 + crop.width)
          );
        } else {
          imgCoordinate.x += e.movementX;
        }

        if (imgCoordinate.x + e.movementX > (canel.width - crop.width) / 2) {
          imgCoordinate.x = (canel.width - crop.width) / 2;
        } else if (
          imgCoordinate.x + img.width + e.movementX <
          (canel.width - crop.width) / 2 + crop.width
        ) {
          imgCoordinate.x = -(
            img.width -
            ((canel.width - crop.width) / 2 + crop.width)
          );
        } else {
          imgCoordinate.x += e.movementX;
        }

        if (imgCoordinate.y + e.movementY > (canel.height - crop.height) / 2) {
          imgCoordinate.y = (canel.height - crop.height) / 2;
        } else if (
          imgCoordinate.y + img.height + e.movementY <
          (canel.height - crop.height) / 2 + crop.height
        ) {
          imgCoordinate.y = -(
            img.height -
            ((canel.height - crop.height) / 2 + crop.height)
          );
        } else {
          imgCoordinate.y += e.movementY;
        }
      };

      var render = () => {
        cancontext.clearRect(0, 0, canel.width, canel.height);
        cancontext.drawImage(
          img,
          imgCoordinate.x,
          imgCoordinate.y,
          img.width,
          img.height
        );
        drawCropArea();
        collectImageData();
      };
      canel.addEventListener("mousedown", (e) => {
        activateMouse = true;
      });
      canel.addEventListener("mouseup", (e) => {
        activateMouse = false;
        render();
        //drawCropArea();
        generateThumbnail();
      });
      canel.addEventListener("mouseout", (e) => {
        activateMouse = false;
        generateThumbnail();
      });

      // var should_stop_zooming = false;
      canel.addEventListener("wheel", (e) => {
        activateMouse = false;
        if (
          img.naturalWidth > canel.width ||
          img.naturalHeight > canel.height
        ) {
          if (e.wheelDelta > 0) {
            if (img.width >= canel.width && img.width < img.naturalWidth) {
              img.width = img.width + e.wheelDelta;
              img.height = (img.width * img.naturalHeight) / img.naturalWidth;
            } else {
              img.width = img.naturalWidth;
              img.height = img.naturalHeight;
            }
          } else {
            if (img.width > canel.width && img.width <= img.naturalWidth) {
              img.width =
                img.height > crop.height ? img.width + e.wheelDelta : img.width;
              img.height =
                (img.width * img.naturalHeight) / img.naturalWidth > crop.width
                  ? (img.width * img.naturalHeight) / img.naturalWidth
                  : crop.width;
            } else {
              img.width = canel.width;
              if (
                canel.width * (img.naturalHeight / img.naturalWidth) <
                crop.height
              ) {
                img.height = crop.height;
                img.width =
                  crop.height * (img.naturalWidth / img.naturalHeight);
              } else {
                img.height =
                  canel.width * (img.naturalHeight / img.naturalWidth) >
                  crop.height
                    ? canel.width * (img.naturalHeight / img.naturalWidth)
                    : crop.height;
              }
            }
          }
          restrictions(e);
          render();
          generateThumbnail();
        }
      });

      canel.addEventListener("mousemove", (e) => {
        if (activateMouse) {
          restrictions(e);

          render();
          generateThumbnail();
        }
      });

      var cutoutCanvas = document.getElementById("dup");
      cutoutCanvas.width = crop.width - 2;
      cutoutCanvas.height = crop.height - 2;

      var ctx = cutoutCanvas.getContext("2d");
      ctx.rect(0, 0, img.width * zoom, img.height * zoom);
      ctx.fillStyle = "black";
      ctx.fill();

      generateThumbnail();
    };
    img.onload = loadImage;
  };
  onSelectFile = (e) => {
    this.setState({ showCrop: true });
    if (e.target.files && e.target.files.length > 0) {
      this.setState({ noImg: false });
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result }, () => {
          this.canvasIt(reader.result, this.state.crop);
        })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  render() {
    const { editMode, modalIsOpen, src, showCrop } = this.state;
    return (
      <ProfileCss>
        <div className="row">
          <div className="col-lg-5">
            <div className="profile__image__wraper">
              <img src={userImg} alt="profile_img" className="img-radius" />
              <div
                className="upload__overlay"
                onClick={() => this.setState({ modalIsOpen: true })}
              >
                <span className="upload__text">
                  <i className="feather icon-upload"></i>Change
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="name__box _flex">
              {!editMode ? (
                <div className="info__name">
                  <h2
                    className="name __text"
                    style={{ display: "inline-block", verticalAlign: "top" }}
                  >
                    Subhom Kundu
                  </h2>
                  <span className="edit_info" onClick={this.handleEditMode}>
                    <i className="feather icon-edit-2 edit__icon" />
                    edit info
                  </span>
                </div>
              ) : (
                <div className="username">
                  <input
                    type="text"
                    className="input__name"
                    name="username"
                    placeholder="Username"
                  />
                </div>
              )}
            </div>
            <div className="email__box _flex">
              {!editMode ? (
                <div className="info__email">
                  <i className="feather icon-mail mail__icon" />
                  <h4 className="email__display">subhomkundu@outlook.com</h4>
                </div>
              ) : (
                <>
                  <div className="useremail">
                    <input
                      type="email"
                      className="input__email"
                      name="email"
                      placeholder="Emai"
                    />
                  </div>
                  {/* <span className="error_message">Please enter an email</span> */}
                </>
              )}
            </div>
            {editMode && (
              <div className="button__wrapper">
                <button
                  className="cancel__button"
                  onClick={() => this.setState({ editMode: false })}
                >
                  Cancel
                </button>
                <button className="update__button">Update</button>
              </div>
            )}
            {!editMode && (
              <div className="change__password__box _flex">
                <img
                  src={keyImg}
                  alt="change password"
                  className="change__password__img"
                />
                <h5>Change Password</h5>
              </div>
            )}
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Profile Photo Update Modal"
          // className="Modal"
          // overlayClassName="modal__overlay"
        >
          <button
            className="styles_closeButton"
            style={{
              background: "transparent",
              outline: "none",
              border: "none",
              position: "absolute",
              top: "10px",
              right: "5px",
            }}
            onClick={this.closeModal}
          >
            <svg
              className="cross_svg"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 36 36"
            >
              <path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"></path>
            </svg>
          </button>
          <div
            className="crop__wrapper"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "30px 20px",
              paddingBottom: "10px",
            }}
          >
            {src && showCrop && (
              <>
                <canvas id="can"></canvas>
                <canvas id="dup" style={{ display: "none" }}></canvas>
              </>
            )}
            <div
              className="File__input__wrapper"
              style={{
                marginTop: "20px",
              }}
            >
              <input
                className="uploadImage"
                name="image"
                id="fileupload"
                type="file"
                onChange={this.onSelectFile}
                accept="image/x-png,image/jpeg"
                style={{ maxWidth: "250px" }}
              />
              {src && showCrop && (
                <button
                  className="update__button"
                  style={{
                    padding: "10px 20px",
                    fontSize: "15px",
                    display: "inline-block",
                    width: "25%",
                    border: "1px solid green",
                    borderRadius: "5px",
                    color: "#fff",
                    backgroundColor: "green",
                    outline: "none",
                    float: "right",
                  }}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </Modal>
      </ProfileCss>
    );
  }
}

export default Profile;
