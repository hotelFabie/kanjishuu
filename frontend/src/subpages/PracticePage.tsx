import { useLocation } from "react-router";
import { useState, useEffect } from 'react'

//wip: removal!!!
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
    const [words, setWords] = useState<Word[]>([]);
    
    const location = useLocation();
    const chosenLevels = location.state.levels;
    
    console.log("retrieved levels: ", chosenLevels);

    useEffect(() => {
            console.log("useEffect triggered.");
            //keeping this below until i know it all works.
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
                    
                    //legacy method: allWords = allWords.concat(data);
                    console.log("THIS. is... :", allWords);

                    setWords(allWords);
                    console.log("allWords variable: ", allWords);
                    console.log("all words after fetch: ", words); //i think i see a problem, this seems to always be empty, it isn't loaded in to our state.
                });
            });
            
    }, [chosenLevels]); //is there supposed to be something here, or?

    //for some reason, it just happens not to see a word of desirability.
    return (
        <>
            <div>
                <p>just to see that something gets outputted</p>
                {words.map((word : Word) => (
                    <p>meaning: {word.meaning}</p>
                ))}
            </div>
        </>
    )
    /*it is highly likely that it does not output anything because we do not have "words" in the 'all' resource.*/
}