import { useLocation } from "react-router";
import { useState, useEffect } from 'react'

//wip: removal or update!!!
/*
type ResponseData = {
  limit : number;
  offset : number;
  total : number;
  words : Word[];
}
*/

type Word = {
  word : string;
  meaning: string;
  furigana : string;
  romaji : string;
  level : number;
}

export function PracticePage() {
    const [words, setWords] = useState<Word[]>([]); //not using "words" yet.
    const [text, setText] = useState<string>(""); //maybe does not need that specification?

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
                    console.log("Response from API: ", data);
                    
                    //for the moment, we'll just select 10, and that will suffice.
                    for (let i : number = 0; i < 10; i++){
                        let randomIndex = Math.floor(Math.random() * data.length);
                        console.log('this is the data entry: ', data[randomIndex]);
                        allWords.push(data[randomIndex]);
                        data.splice(randomIndex, 1); //gotta check if it works. this is just not to get duplicates.
                    }
                    
                    console.log("THIS. is... :", allWords);

                    setWords(allWords);
                });
            });
            
    }, [chosenLevels]);

    /*romaji*/
    /*https://stackoverflow.com/questions/41764061/adding-text-to-an-existing-text-element-in-javascript-via-dom*/
    /*styled classes*/
    /*they will probably need a variable or so, so their text can be updated*/
    
    
    //would otherwise typically need lookup to find these specific characters.
    //or, should it be 'char'?
    //onClick only wanted to take undefined as an acceptable value.

    //https://www.reddit.com/r/reactjs/comments/t0qt4i/i_cant_for_the_life_of_me_figure_out_why_i_keep/

    function addChouonpuLetter(letter : string) : undefined {
        setText(text + letter);
    }

    /*then we basically add a function that inserts that letter as an input*/
    //okay, so i really need to understand if it is something like are direct calls without the lambda function
    return (
        <>
            <input type="text" value={text} title="romaji"></input>
            <div> 
                <button onClick={() => addChouonpuLetter("ā")}>ā</button>
                <button onClick={() => addChouonpuLetter("ī")}>ī</button>
                <button onClick={() => addChouonpuLetter("ū")}>ū</button>
                <button onClick={() => addChouonpuLetter("ē")}>ē</button>
                <button onClick={() => addChouonpuLetter("ō")}>ō</button>
            </div>

            <div>
                <p style={{color: 'green'}}>0</p>
                <p style={{color: 'red'}}>0</p>
            </div>
        </>
    )
    /*it is highly likely that it does not output anything because we do not have "words" in the 'all' resource.*/
}