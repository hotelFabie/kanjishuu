import { useState, useEffect } from 'react'
import './App.css'
import Menu from './components/Menu.tsx';
import ButtonArea from './components/ButtonArea.tsx';

type ResponseData = {
  limit : number;
  offset : number;
  total : number;
  words : Word[];
}

//move up.
type Word = {
  word : string;
  meaning: string;
  furigana : string;
  romaji : string;
  level : number;
}

//do i have reason to store this outside?
let allWords : Word[] = [];

function App() {
  const [words, setWords] = useState<Word[]>([]); 
  const [levels, setLevels] = useState<number[]>([5]); 
  
  //this will be deprecated, i just keep it here until i know the function works.
  /*
  useEffect(() => {
    fetch(`https://jlpt-vocab-api.vercel.app/api/words?level=${level}`)
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data);
        console.log(typeof data);
        console.log(Array.isArray(data));
        setWords(data.words);
      })
  }, [level]);
  */

  //wip: add proper logging.
  //should provide an error/message if nothing is given. 
  //concatenation, because we want a new, mixed array.
  function fetchWordsFromChosenLevels(chosenLevels: number[]) {
    console.log("Chosen levels:", chosenLevels);
    chosenLevels.forEach(level => {
      fetch(`https://jlpt-vocab-api.vercel.app/api/words?level=${level}`)
        .then(response => response.json())
        .then((data: ResponseData) => {
          allWords = allWords.concat(data.words); 
          setWords(allWords);
        })
    })
  }
  
  return (
    <>
      <Menu />
      <ButtonArea levels={levels} setLevels={setLevels} fetchWordsFromChosenLevels={fetchWordsFromChosenLevels} />
      <ul>
        {words.map((word : any, index) => (
          <li key={index}>{word.word}</li>
        ))}
      </ul>
    </>
  )
}

export default App
