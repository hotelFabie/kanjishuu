//wip: should contain the ButtonArea.
import { useState } from 'react'
import Menu from '../components/Menu.tsx';
import ButtonArea from '../components/ButtonArea.tsx';
import { useNavigate } from 'react-router';

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
  const [words, setWords] = useState<Word[]>([]); //gotta send these words along. 
  const [levels, setLevels] = useState<number[]>([]); 

  //i put this outside before, and it became an issue, huh...
  const navigate = useNavigate();

  //possibly: further logging if so needed.
  //dealing with errors?
  function fetchWordsFromChosenLevels(chosenLevels: number[]) {
    //does not seem to work as i hoped for it to do.
    if (chosenLevels.length === 0){
        console.log("no levels were chosen. nothing was fetched.");
        //provide something useful worth saying.
        //a popup exactly below the header.
        return;
    }

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

    navigate("/practice", { state: { allWords } }); //is this a safe practice?
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