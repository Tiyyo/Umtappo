import { useCallback, useEffect, useState } from "react";

const validFilesTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/JPG",
  "image/JPEG",
  "image/PNG",
];

const maxSize = 1024000; // octet

const useSelectedFiles = (file) => {
  const [data, setData] = useState({
    srcFile: null,
    errorType: "",
    imgSrc: "",
  });
  const [test, setTest] = useState("not working");

  const [srcFile, setSrcFile] = useState(null);
  const [errorType, setErrorType] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const validationFile = () => {
    if (!file) return setData({ ...data });

    if (file.size > maxSize) {
      alert("work");
      setErrorType("File must not exceded 1024 mo");
      console.log(errorType);
    }
    if (!validFilesTypes.find((type) => type === file.type)) {
      setErrorType("File must be an png or jpg type");
    } else {
      setErrorType("");
    }

    if (file && file.length > 0) {
      setData({ ...data, srcFile: file });
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    validationFile();
    console.log(srcFile);
  }, [file]);

  return {
    srcFile,
    errorType,
    imgSrc,
  };
};

export default useSelectedFiles;
