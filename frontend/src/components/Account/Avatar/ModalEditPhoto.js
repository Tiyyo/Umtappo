import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../../Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import ReportIcon from "@mui/icons-material/Report";
import ReactCrop from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import axios from "axios";
import UserContext from "../../../utils/Context/UserContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { updatePictures } from "../../../features/user/slice/user.slice";
import LoaderUI from "../../Loader/LoaderUI";
import { splitGenerateLink } from "./split.link";

const validFilesTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/JPG",
  "image/JPEG",
  "image/PNG",
];

const maxSize = 1024000; // octet

const ModalEditPhoto = ({ isOpen, getStateModal }) => {
  const { userID } = useContext(UserContext);

  const dispatch = useDispatch();

  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);
  const [srcFile, setSrcFile] = useState(null);

  const [completeCrop, setCompleteCrop] = useState(null);
  const [errorType, setErrorType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState(null);

  const handleSelectFile = (e) => {
    const file = e.target.files[0];

    if (!validFilesTypes.find((type) => type === file.type)) {
      setErrorType("File must be an png or jpg type");
      return;
    } else {
      setErrorType("");
    }
    if (file.size > maxSize) {
      setErrorType("File must not exceded 1024 mo");
    }

    if (e.target.files && e.target.files.length > 0) {
      setSrcFile(file);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (
      completeCrop?.width &&
      completeCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      return canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completeCrop
      );
    }
  }, [completeCrop]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const endpoint = "http://localhost:5000/s3Url";
    const generateLink = axios.get(endpoint);

    const { urlCropImage, urlFullImage } = await axios
      .all([generateLink, generateLink])
      .then(
        axios.spread((res1, res2) => {
          return { urlCropImage: res1.data.url, urlFullImage: res2.data.url };
        })
      );

    await fetch(urlFullImage, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: srcFile,
    }).then(() => console.log("full image uploaded succesfully"));

    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    let blob = await new Promise((resolve) =>
      previewCanvasRef.current.toBlob(resolve)
    );

    let imageCrop = new File([blob], "user_profile_crop.png", {
      type: "image/png",
    });

    await fetch(urlCropImage, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: imageCrop,
    }).then((res) => console.log(res));
    const imgFullLink = splitGenerateLink(urlFullImage);
    const imgCropLink = splitGenerateLink(urlCropImage);

    await axios
      .put("http://localhost:5000/user/image", {
        user_id: userID,
        imgFullLink,
        imgCropLink,
      })
      .then(() => {
        setIsLoading(false);
        getStateModal(false);
      })
      .catch((err) => console.log(err.response.data));

    dispatch(updatePictures({ crop: imgCropLink, full: imgFullLink }));
  };

  const pictures = useSelector((state) => state.user.user.pictures);
  const prevFullImage = pictures?.full;

  function getFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      return setFile(e.target.files[0]);
    }
  }

  return (
    <div
      className="modal-edit"
      style={isOpen ? { display: "flex" } : { display: "none" }}
    >
      <div className="modal-edit__blur">
        <div className="modal-edit__container">
          <div
            className="modal-edit__close-btn"
            onClick={() => getStateModal(false)}
          >
            <Button>
              <CloseIcon />
            </Button>
          </div>
          <div className="modal-edit__container__image">
            <ReactCrop
              crop={crop}
              aspect={1}
              circularCrop={true}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompleteCrop(c)}
              className="crop"
            >
              {imgSrc ? (
                <img src={imgSrc} alt="crop mep" ref={imgRef} />
              ) : (
                <img
                  src={prevFullImage ? prevFullImage : ""}
                  alt="current avatar or picture uploaded"
                  ref={imgRef}
                />
              )}
            </ReactCrop>
          </div>
          <div className="modal-edit__container__action">
            <label
              htmlFor="pickProfileImage"
              className="modal-edit__container__label"
            >
              <FileUploadIcon fontSize="small" />
              <span>Edit</span>
            </label>
            <input
              type="file"
              accept="image/*"
              name="pickProfileImage"
              id="pickProfileImage"
              hidden
              className="modal-edit__container__input-file"
              onChange={(e) => {
                handleSelectFile(e);
              }}
            />
            <button
              className="modal-edit__container__validate"
              onClick={handleSubmit}
              style={
                isLoading ? { backgroundColor: "var(--button_loading)" } : {}
              }
              disabled={errorType.length > 0 ? true : false}
            >
              {isLoading ? (
                <LoaderUI size={"1.1rem"} />
              ) : (
                <>
                  {" "}
                  <DownloadDoneIcon fontSize="small" />
                  <span>Confirm</span>
                </>
              )}
            </button>
            {!!completeCrop && (
              <>
                <div>
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      objectFit: "contain",
                      width: completeCrop.width,
                      height: completeCrop.height,
                      borderRadius: "50%",
                      position: "fixed",
                      top: "-100vh",
                      zIndex: "-1",
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <div className="modal-edit__container__error">
            {errorType && (
              <>
                <ReportIcon />
                <p>{errorType}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditPhoto;
