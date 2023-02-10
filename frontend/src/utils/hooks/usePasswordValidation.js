import { useState, useEffect } from "react";
export const usePassword = (password, confirmedPassword) => {
  const [hasNumber, setHasNumber] = useState(null);
  const [hasUppercase, setHasUppercase] = useState(null);
  const [validLength, setValidLength] = useState(null);
  const [hasLowercase, setHasLowercase] = useState(null);
  const [match, setMatch] = useState(null);
  const [specChar, setSpecChar] = useState(null);

  let requiredLength = 8;

  useEffect(() => {
    setValidLength(password.length >= requiredLength ? true : false);
    setHasUppercase(password.toLowerCase() !== password);
    setHasLowercase(password.toUpperCase() !== password);
    setHasNumber(/\d/.test(password));
    setMatch(password && password === confirmedPassword);
    setSpecChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));
  }, [password, confirmedPassword, requiredLength]);

  return [validLength, hasNumber, hasUppercase, hasLowercase, specChar, match];
};
