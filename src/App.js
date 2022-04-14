import { useState, createContext, useEffect } from "react";
import "./App.css";
import { Board } from "./components/board/Board";
import { GameOver } from "./components/game-over/GameOver";
import { Keyboard } from "./components/keyboard/Keyboard";
import { Navbar } from "./components/navbar/Navbar";
import { boardDefault, generateWordSet } from "./Words";

export const AppContext = createContext();

function App() {
  // Alle of the States declared hier:
  const [board, setBoard] = useState(boardDefault);
  const [wordSet, setWordSet] = useState(new Set());
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPossition: 0,
  });
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");

  //TO Get a Word in Page refresh
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      console.log(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (keyValue) => {
    if (currentAttempt.letterPossition > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPossition] = keyValue;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPossition: currentAttempt.letterPossition + 1,
    });
  };

  const onRemoveLetter = () => {
    if (currentAttempt.letterPossition === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPossition - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPossition: currentAttempt.letterPossition - 1,
    });
  };

  const onEnterLetter = () => {
    if (currentAttempt.letterPossition !== 5) return;
    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }
    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPossition: 0,
      });
    } else {
      alert("The word cannot be found");
    }
    if (currentWord === correctWord.toUpperCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  return (
    <div className="App">
      <Navbar />
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onSelectLetter,
          onRemoveLetter,
          onEnterLetter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          <div className="bottom-side">
            {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
