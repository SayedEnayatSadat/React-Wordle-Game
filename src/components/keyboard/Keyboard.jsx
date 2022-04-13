import "./Keyboard.css";
import { useCallback,useContext , useEffect} from "react";
import { AppContext } from "../../App";
import { Key } from "./key/Key";


export const Keyboard = () => {
  const { onEnter, onDelete, onSelectLetter, currentAttempt, disabledLetters } =
    useContext(AppContext);

  const keysLine1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keysLine2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L",];
  const keysLine3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        keysLine1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keysLine2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keysLine3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    [currentAttempt]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="keyboard-line1">
        {keysLine1.map((key) => {
          return (
            <Key keyValue={key} disabled={disabledLetters.includes(key)} />
          );
        })}
      </div>
      <div className="keyboard-line2">
        {keysLine2.map((key) => {
          return (
            <Key keyValue={key} disabled={disabledLetters.includes(key)} />
          );
        })}
      </div>
      <div className="keyboard-line3">
        <Key keyValue={"ENTER"} biggerKey={true} />
        {keysLine3.map((key) => {
          return (
            <Key keyValue={key} disabled={disabledLetters.includes(key)} />
          );
        })}
        <Key keyValue={"DELETE"} biggerKey={true} />
      </div>
    </div>
  );
};
