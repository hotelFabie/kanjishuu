import { useLocation } from "react-router";
import { useEffect, useState, useRef } from 'react'

//wip: removal or update!!!
/*
type ResponseData = {
  limit : number;
  offset : number;
  total : number;
  words : Word[];
}
*/

/*would also need a boolean*/
type Word = {
  //data fetched from api
  word : string;
  meaning: string;
  furigana : string;
  romaji : string;
  level : number;

  //custom data
  isCorrectOnFirstTry : boolean;
}

export function PracticePage() {
    const textInput = useRef<HTMLInputElement>(null);

    const [words, setWords] = useState<Word[]>([]); //not using "words" yet.

    const location = useLocation();
    const chosenLevels = location.state.levels;
    
    console.log("retrieved levels: ", chosenLevels);

    useEffect(() => {
            console.log("useEffect triggered.");

            //belonging here?
            let allWords : Word[] = [];

            chosenLevels.forEach((level : number) => {
            fetch(`https://jlpt-vocab-api.vercel.app/api/words/all?level=${level}`)
                .then(res => res.json())
                .then((data: Word[]) => {
                    console.log("response from api: ", data);
                    
                    //wondering if we should make this a function for the sake of readability, not sure...
                    //for the moment, we'll just select 10, and that will suffice.
                    for (let i : number = 0; i < 10; i++){
                        let randomIndex = Math.floor(Math.random() * data.length);
                        console.log('this is the data entry: ', data[randomIndex]);
                        allWords.push(data[randomIndex]);
                        data.splice(randomIndex, 1); //gotta check if it works. this is just not to get duplicates.
                    }
                    
                    console.log("all words in total: ", allWords);

                    setWords(allWords);
                });
            });
            
    }, [chosenLevels]);

      
    //<char instead? not sure...>
    //useRef, because passing like 'value={...}' will make the content 
    //impossible for the user to erase. 
    function addChouonpuLetter(letter : string) : void {
        if (textInput.current !== null) {
            textInput.current.value += letter;
            textInput.current.focus();
        }
    }

    /*should be something here.
    it should be a randomized word, we basically pop it out of the array.
    store it in a variable, so that we can use it as the current value.
    using "enter" as the input. 
    input type="text" will get the onChange, to say the least.
    */
    return (
        <>
            
            <input type="text" title="write corresponding romaji here..." ref={textInput}></input>
            <div> 
                <button onClick={() => addChouonpuLetter("ā")}>ā</button>
                <button onClick={() => addChouonpuLetter("ī")}>ī</button>
                <button onClick={() => addChouonpuLetter("ū")}>ū</button>
                <button onClick={() => addChouonpuLetter("ē")}>ē</button>
                <button onClick={() => addChouonpuLetter("ō")}>ō</button>
            </div>
        </>
    )
    /*
        <p style={{color: 'green'}}>0</p>
        <p style={{color: 'red'}}>0</p>
    */
}