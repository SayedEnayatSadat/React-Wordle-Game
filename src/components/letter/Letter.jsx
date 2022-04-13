import "./Letter.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../App";


export const Letter = ({ letterPosition, attemptValue }) => {
  const { board, correctWord, currentAttempt, setDisabledLetters } =
    useContext(AppContext);

  const letter = board[attemptValue][letterPosition];
  // If the letter entered is in the correct position, it is "correct"
  const correct = correctWord.toUpperCase()[letterPosition] === letter;
  //If the letter entered is not correct, if it is not empty, and if the correct word includes that letter but in another position, then that letter is "almost"
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  const letterState =
    currentAttempt.attempt > attemptValue &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};
