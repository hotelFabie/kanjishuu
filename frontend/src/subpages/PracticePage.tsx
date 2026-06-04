import { useLocation } from "react-router";


export function PracticePage() {
    
    const location = useLocation();
    console.log("this was retrieved from the selection page: ",location.state.allWords);

    return (
        //word or Word?
        <>
            {location.state.allWords.map((word: any) => (
                <p>
                    {word.word} 
                </p>
            ))}

        </>
    );
}