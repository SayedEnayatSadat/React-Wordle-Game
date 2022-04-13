import { useContext } from "react";
import { AppContext } from "../../../App";

export const Key = ({ keyValue, biggerKey, disabled }) => {
  const { onSelectLetter, onDelete, onEnter } = useContext(AppContext);

  const selectLetter = () => {
    if (keyValue === "ENTER") {
      onEnter();
    } else if (keyValue === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyValue);
    }
  };

  return (
    <div
      className="keyboard-key"
      id={biggerKey ? "bigger" : disabled && "disabled"}
      onClick={selectLetter}
    >
      {keyValue}
    </div>
  );
};
