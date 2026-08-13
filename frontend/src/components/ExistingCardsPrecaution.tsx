//PROBABLY TOO OLD. Deleting this is only necessary if we solve the problem with the cards.

type ExistingCardsProps = {
    levels : number[];
}

import { useNavigate } from 'react-router';

export default function ExistingCardsPrecaution({levels} : ExistingCardsProps) {
    const navigate = useNavigate();
    
    function discardCards() : void {
        sessionStorage.removeItem('cards');
        console.log("Attempt at discarding cards done.");
        console.log("sessionStorage value is: " + sessionStorage.getItem('cards'));
    }
    
    return (
        <>
            <p>You already have fetched cards, do you: </p>
            <button onClick={() => navigate("/practice", { state: { levels } })}>Continue</button>
            <button onClick={() => discardCards()}>Discard</button>
        </>
    )
}