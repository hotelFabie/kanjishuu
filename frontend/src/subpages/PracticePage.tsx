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
    //https://stackoverflow.com/questions/38096687/how-can-i-remove-the-first-element-of-an-array-and-return-the-rest
    const keyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") {
            return;
        }   
        
        //perhaps that we save and convert the value to small letters here?

        if (e.currentTarget.value === cards[0].romaji) {
            const [, ...remainingCards] = cards;
            setCards(remainingCards);
            console.log("The answer given by the user was correct!");
            e.currentTarget.value = ""; //should be done with a state setter, however.
        } else {
            //tell the user how it actually should be spelled.
            const [firstCard, ...remainingCards] = cards;
            remainingCards.push(firstCard);
            setCards(remainingCards);
            e.currentTarget.value = ""; //this will be done regardless
        }
    }

    //would be better to simply say something like "loading"
    //redirect when all the cards have been iterated through.
    //most likely that we cannot say "cards.length === 0" immediately,
    //because...
    return (
        <>
            <p>{cards[0]?.word}, {cards[0]?.romaji}</p>
            <input type="text" title="Write corresponding romaji here..." ref={textInput} onKeyDown={keyDown}></input>
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