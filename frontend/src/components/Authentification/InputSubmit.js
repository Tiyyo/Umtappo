import React from "react";
import LoaderUI from "../Loader/LoaderUI";

const InputSubmit = ({ value, isSubmitting, errorMessage }) => {
  return (
    <div className="inputWrapper" style={{ textAlign: "center" }}>
      {isSubmitting ? (
        <div className="input__submit">
          <LoaderUI size={20} />
        </div>
      ) : (
        <input
          type="submit"
          className="input__submit"
          value={value}
          disabled={isSubmitting}
        />
      )}
      <div className="inputError" style={{ fontSize: "1rem" }}>
        {errorMessage}
      </div>
    </div>
  );
};

export default InputSubmit;
