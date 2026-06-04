//wip: should contain the ButtonArea.
import { useState } from 'react'
import Menu from '../components/Menu.tsx';
import ButtonArea from '../components/ButtonArea.tsx';

type ResponseData = {
  limit : number;
  offset : number;
  total : number;
  words : Word[];
}

type Word = {
  word : string;
  meaning: string;
  furigana : string;
  romaji : string;
  level : number;
}

//arguable if i should store this outside.
let allWords : Word[] = [];


export function SelectionPage() {
    // it should 100% be moved in here. 
  const [words, setWords] = useState<Word[]>([]); 
  const [levels, setLevels] = useState<number[]>([]); 
  //const [levels, setLevels] = useState<number[]>([5])

  //possibly: further logging if so needed.
  //dealing with errors?
  function fetchWordsFromChosenLevels(chosenLevels: number[]) {
    console.log("Chosen levels:", chosenLevels);
    chosenLevels.forEach(level => {
      fetch(`https://jlpt-vocab-api.vercel.app/api/words?level=${level}`)
        .then(response => response.json())
        .then((data: ResponseData) => {
          console.log("Response from API: ", data);
          allWords = allWords.concat(data.words); 
          setWords(allWords);
        })
    })
  }

    return (
        <>
        <Menu />
        <ButtonArea levels={levels} setLevels={setLevels} fetchWordsFromChosenLevels={fetchWordsFromChosenLevels} />
            {words.map((word : any, index) => (
            <p key={index}>{word.word}</p>
            ))}
        </>
    )
}