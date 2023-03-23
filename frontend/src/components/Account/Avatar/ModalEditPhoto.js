import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { getCroppedImg } from "./getCroppedImg";

const ModalEditPhoto = ({ isOpen, getStateModal }) => {
  const cropImageRef = useRef();
  const hiddenAnchorRef = useRef();
  const blobUrlRef = useRef('')
  const previewCanvasRef = useRef(null)
  const [imgSrc, setImgSrc] = useState('')
  const [crop, setCrop] = useState();
  const imgRef = useRef(null)


  const [completeCrop, setCompleteCrop] = useState(null);

  const handleSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
      setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleOnLoad = useCallback((img) => {
    cropImageRef.current = img;
  }, []);

  useEffect(() => {
    if (!completeCrop || !cropImageRef) {
      return;
    }
  });

  const handleSubmit = () => {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist')
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob')
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)
      hiddenAnchorRef.current!.href = blobUrlRef.current
      hiddenAnchorRef.current!.click()
    })
  };

  return (
    <div
      className="modal-edit"
      style={isOpen ? { display: "flex" } : { display: "none" }}
    >
      <div
        className="modal-edit__close-btn"
        onClick={() => getStateModal(false)}
      >
        <Button>
          <CloseIcon />
        </Button>
      </div>
      <div className="modal-edit__blur">
        <div className="modal-edit__container">
          <div className="modal-edit__container__image">
            <ReactCrop
              crop={crop}
              aspect={1}
              circularCrop={true}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompleteCrop(c)}
              className="crop"
            >
              {imgUp ? (
                <img src={imgUp} alt="current avatar or picture uploaded" />
              ) : (
                ""
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
              className="modal-edit__container__input-file"
              onChange={(e) => handleSelectFile(e)}
            />
            <button
              className="modal-edit__container__validate"
              onClick={handleSubmit}
            >
              <DownloadDoneIcon fontSize="small" />
              <span>Confirm</span>
            </button>
            {!!completedCrop && (
              <>
                <div>
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      border: "1px solid black",
                      objectFit: "contain",
                      width: completedCrop.width,
                      height: completedCrop.height,
                    }}
                  />
                </div>
                <div>
                  <button onClick={onDownloadCropClick}>Download Crop</button>
                  <a
                    ref={hiddenAnchorRef}
                    download
                    style={{
                      position: "absolute",
                      top: "-200vh",
                      visibility: "hidden",
                    }}
                  >
                    Hidden download
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditPhoto;
