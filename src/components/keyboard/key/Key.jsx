import { useContext } from "react";
import { AppContext } from "../../../App";

export const Key = ({ keyValue, biggerKey, disabled }) => {
  const { onSelectLetter, onRemoveLetter, onEnterLetter } = useContext(AppContext);

  const selectLetter = () => {
    if (keyValue === "ENTER") {
      onEnterLetter();
    } else if (keyValue === "DELETE") {
      onRemoveLetter();
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
