import { useLocation } from "react-router";
import { useEffect, useState, useRef } from 'react'
import Footer from '../components/Footer.tsx';

//wip: removal or update!!!
/*type ResponseData = {
  limit : number;
  offset : number;
  total : number;
  words : Word[];
}*/

//data fetched from api
type ApiData = {
  word : string;
  meaning: string;
  furigana : string;
  romaji : string;
  level : number;

}

//with custom data
type Card = ApiData & {
    isCorrectOnFirstTry : boolean;
}

export function PracticePage() {
    const textInput = useRef<HTMLInputElement>(null);

    const [cards, setCards] = useState<Card[]>([]);

    const location = useLocation();
    const chosenLevels = location.state.levels;

    //the word should not literally be a word, it should have the thing under it.
    //const currentCard : Card = cards[0];
    
    console.log("retrieved levels: ", chosenLevels);

    /*
        chosenLevels.forEach((level : number) => {
        fetch(`https://jlpt-vocab-api.vercel.app/api/words/all?level=${level}`)
            .then(res => res.json())
            .then((data: ApiData[]) => {
                console.log("response from api: ", data);
                
                //wondering if we should make this a function for the sake of readability, not sure...
                //for the moment, we'll just select 10, and that will suffice.
                for (let i : number = 0; i < 10; i++){
                    let randomIndex = Math.floor(Math.random() * data.length);
                    const selectedWord: Card = {...data[randomIndex], isCorrectOnFirstTry: true};
                    cards.push(selectedWord);
                    console.log('this is the data entry: ', data[randomIndex]);
                    data.splice(randomIndex, 1); //gotta check if it works. this is just not to get duplicates.
                }
                
                console.log("all cards in total: ", cards);

                setCards(cards);
            });
        });
    */

    //this is kind of dangerous, because we are using cards.push, not the setter.
    //this should have something that is temporary, 
    function retrieveRandomCards(data: ApiData[]) : Card[] {
        const randomCards : Card[] = []; 
        for (let i: number = 0; i < 10; i++) {
            let randomIndex = Math.floor(Math.random() * data.length);
            const selectedWord: Card = { ...data[randomIndex], isCorrectOnFirstTry: true };
            randomCards.push(selectedWord);
            console.log('this is the data entry: ', data[randomIndex]);
            data.splice(randomIndex, 1); //gotta check if it works. this is just not to get duplicates.
        }
        return randomCards;
    }

    useEffect(() => {
        console.log("useEffect triggered.");

        //will not even need this?
        //let cards: Card[] = [];

        //this is a promise remake of what i am having under this construction.
        async function loadCards() {
            //no direct data type for json available without aliasing.
            const responses = await Promise.all(
                chosenLevels.map((l: number) =>
                    fetch(`https://jlpt-vocab-api.vercel.app/api/words/all?level=${l}`)
                        .then((res: Response) => res.json())
                )
            );

            console.log(responses);
            
            //this may be a bit ugly...
            const cards : Card[] = responses.flatMap((data: ApiData[]) => retrieveRandomCards(data)); //use the function here.
        

            setCards(cards);
        }

            loadCards();    
        /*
        chosenLevels.forEach((level : number) => {
        fetch(`https://jlpt-vocab-api.vercel.app/api/words/all?level=${level}`)
            .then(res => res.json())
            .then((data: ApiData[]) => {
                console.log("response from api: ", data);
                
                //wondering if we should make this a function for the sake of readability, not sure...
                //for the moment, we'll just select 10, and that will suffice.
                for (let i : number = 0; i < 10; i++){
                    let randomIndex = Math.floor(Math.random() * data.length);
                    const selectedWord: Card = {...data[randomIndex], isCorrectOnFirstTry: true};
                    cards.push(selectedWord);
                    console.log('this is the data entry: ', data[randomIndex]);
                    data.splice(randomIndex, 1); //gotta check if it works. this is just not to get duplicates.
                }
                
                console.log("all cards in total: ", cards);

                setCards(cards);
            });
        });
        */
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

    //necessary to have the "React."? maybe possible to retrieve this instead?
    const keyDown = (e : React.KeyboardEventHandler<HTMLInputElement>) => {
        
        //pseudocode:
        /* 
            convert all letters into small letters
            if [textInput's value] === card[0].romaji then
                correctAtFirstAttempt === "true"
                remove(card[0])
            else 
                cards.pushToEnd(card[0])   
                correctAtFirstAttempt === "false"
                ^set^ 
                tell user the real spelling
        */
    }

    return (
        <>
            <p>{cards[0].word}, {cards[0].romaji}</p>
            <input type="text" title="write corresponding romaji here..." ref={textInput} onKeyDown={keyDown}></input>
            <div> 
                <button onClick={() => addChouonpuLetter("ā")}>ā</button>
                <button onClick={() => addChouonpuLetter("ī")}>ī</button>
                <button onClick={() => addChouonpuLetter("ū")}>ū</button>
                <button onClick={() => addChouonpuLetter("ē")}>ē</button>
                <button onClick={() => addChouonpuLetter("ō")}>ō</button>
            </div>
            <p>Remaining cards left: {cards.length}</p>

        </>
    )
    /*
    <Footer />
    */
}