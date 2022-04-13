import "./GameOver.css";
import { useContext } from "react";
import { AppContext } from "../../App";


export const GameOver = () => {
  const { gameOver, correctWord, currentAttempt } = useContext(AppContext);

  return (
    <div className="game-over">
      <h3
        className={
          gameOver.guessedWord ? "game-over-title-win" : "game-over-title-fail"
        }
      >
        {gameOver.guessedWord ? "You got the right word" : "You failed"}
      </h3>

      {gameOver.guessedWord ? (
        <h1 className="game-over-correct-word">
          The right word is:
          <span style={{ textTransform: "uppercase", marginLeft: "8px" }}>
            {correctWord}
          </span>
        </h1>
      ) : (
        <h1 className="game-over-correct-word">
          The right word was:
          <span style={{ textTransform: "uppercase", marginLeft: "8px" }}>
            {correctWord}
          </span>
        </h1>
      )}

      {gameOver.guessedWord ? (
        <h3 className="game-over-attempts">
          You've got the correct word in {currentAttempt.attempt} attempts.
        </h3>
      ) : null}

      {gameOver ? (
        <button
          className="game-over-restart"
          onClick={() => window.location.reload()}
        >
         Replay
        </button>
      ) : null}
    </div>
  );
};
