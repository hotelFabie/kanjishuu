import { useLocation } from "react-router";
import { useEffect, useState, useRef } from 'react'
import Footer from '../components/Footer.tsx';
import { useNavigate } from 'react-router';

//Representation of the specific data you get from fetching the JLPT API.
type ApiData = {
  word : string;
  meaning: string;
  furigana : string;
  romaji : string;
  level : number;

}

//WIP: Not sure just yet if this variable is of use; depends on what we want to show in the Review page.
type Card = ApiData & {
    hasCorrectUserAnswer : boolean;
}

export function PracticePage() {
    const textInput = useRef<HTMLInputElement>(null);

    //WIP: need to add a state to all the cards that they are accepted.
    const [cards, setCards] = useState<Card[]>(() => {
        const saved = sessionStorage.getItem("cards");
        return saved ? JSON.parse(saved) : [];
    });

    const [isLoading, setIsLoading] = useState<Boolean>(true); //this will probably only be necessary if....
    const isComplete : boolean = !isLoading && cards.every(card => card.hasCorrectUserAnswer === true);

    const location = useLocation();
    const chosenLevels = location.state.levels;

    const navigate = useNavigate();
    
    console.log("retrieved levels: ", chosenLevels);

    //this is kind of dangerous, because we are using cards.push, not the setter.
    //this should have something that is temporary, 
    function retrieveRandomCards(data: ApiData[]) : Card[] {
        const randomCards : Card[] = []; 
        for (let i: number = 0; i < 10; i++) {
            let randomIndex = Math.floor(Math.random() * data.length);
            const selectedWord: Card = { ...data[randomIndex], hasCorrectUserAnswer: false };
            randomCards.push(selectedWord);
            console.log('this is the data entry: ', data[randomIndex]);
            data.splice(randomIndex, 1); //gotta check if it works. this is just not to get duplicates.
        }
        return randomCards;
    }

    

    useEffect(() => {
        var responses;
        
        console.log("useEffect triggered.");

        //this is a promise remake of what i am having under this construction.
        async function loadCards() {
            const ssCards: string | null = sessionStorage.getItem('cards');

            //No point in fetching if we already have relevant data.
            if (ssCards !== null) {
                const cards = JSON.parse(ssCards);
                setCards(cards);
                console.log("session storage values: ", cards);
            } else {
                //everything below here.
                responses = await Promise.all(
                    chosenLevels.map((l: number) =>
                        fetch(`https://jlpt-vocab-api.vercel.app/api/words/all?level=${l}`)
                            .then((res: Response) => res.json())
                    )
                );

                console.log(responses);

                const cards: Card[] = responses.flatMap((data: ApiData[]) => retrieveRandomCards(data));

                sessionStorage.setItem("cards", JSON.stringify(cards));

                setCards(cards);
            }
            setIsLoading(false);
        }

        loadCards();

    }, [chosenLevels]); 

    useEffect(() => {
        //no point in fetching if this is true.
        if (isComplete) {
            navigate("/review");
            return;
        }
    });

    function addChouonpuLetter(letter : string) : void {
        if (textInput.current !== null) {
            textInput.current.value += letter;
            textInput.current.focus();
        }
    }

    //necessary to have the "React."? can maybe retrieve KeyboardEvent directly.
    //https://stackoverflow.com/questions/38096687/how-can-i-remove-the-first-element-of-an-array-and-return-the-rest
    const keyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") {
            return;
        }   
        
        //is correct should be true here. 

        if (e.currentTarget.value === cards[0].romaji) {
            //we will probably need to make sure to set the boolean right here.
            cards[0].hasCorrectUserAnswer = true; //just testing rn, maybe this is too exposed.
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

    return (
        <>
            <p className="currentWord">{cards.length !== 0 ? cards[0]?.word + ' ' + cards[0]?.romaji : 'Loading in cards...'}</p>
            <input type="text" title="Write corresponding romaji here..." ref={textInput} onKeyDown={keyDown}></input>
            <div> 
                <button onClick={() => addChouonpuLetter("ā")}>ā</button>
                <button onClick={() => addChouonpuLetter("ī")}>ī</button>
                <button onClick={() => addChouonpuLetter("ū")}>ū</button>
                <button onClick={() => addChouonpuLetter("ē")}>ē</button>
                <button onClick={() => addChouonpuLetter("ō")}>ō</button>
            </div>
            <p>Remaining cards left: {cards.length}</p>
            <button className="altStyleButton" onClick={() => navigate("/review")}>Skip to review</button>
            <Footer />
        </>
    )
}