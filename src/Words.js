import wordsBank from "./words-bank.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordsBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArray = result.split("\r\n");
      todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)];
      wordSet = new Set(wordArray);
    });
  return { wordSet, todaysWord };
};
