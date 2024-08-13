import React from "react";
import { ReactComponent as EmptyTickmark } from "../../../assets/tickmark-empty.svg";
import { ReactComponent as Tickmark } from "../../../assets/tick-mark.svg";

// import "./CustomCheckbox.css"; // Import the CSS file for styling

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <div onClick={onChange}>
      {/* {checked && <span className="checkmark">✓</span>} */}
      {checked ? <Tickmark /> : <EmptyTickmark />}
    </div>
  );
};

export default CustomCheckbox;
