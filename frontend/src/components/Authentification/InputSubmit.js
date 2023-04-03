import React from "react";
import LoaderUI from "../Loader/LoaderUI";
import ErrorIcon from "@mui/icons-material/Error";

const InputSubmit = ({ value, isSubmitting, errorMessage, isError }) => {
  return (
    <div className="inputWrapper" style={{ textAlign: "center" }}>
      {isSubmitting && !isError ? (
        <div className="input__submit">
          <LoaderUI size={20} position={"absolute"} />
        </div>
      ) : (
        <input
          type="submit"
          className="input__submit"
          value={value}
          disabled={isSubmitting}
        />
      )}
      <div className="inputError inputError--submit">
        {errorMessage ? <ErrorIcon /> : ""}
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default InputSubmit;
