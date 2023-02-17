import React from "react";

const Preference = () => {
  return (
    <div className="preference">
      <label for="languages">Languages</label>
      <select name="languages" id="languages">
        <option value=""></option>
        <option value="French">Français</option>
        <option value="Spannish">Español</option>
        <option value="English">English</option>
      </select>
      <div>
        <p>Prefered Theme</p>
        <button type="button">Dark</button>
        <button type="button">Light</button>
      </div>
    </div>
  );
};

export default Preference;
