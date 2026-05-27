type ButtonAreaProps = {
    levels : number[];
    setLevels: (levels: number[]) => void;
    fetchWordsFromChosenLevels: (chosenLevels: number[]) => void;
}

export default function ButtonArea({levels, setLevels, fetchWordsFromChosenLevels} : ButtonAreaProps) {

    //spreading the array, or filtering it. [BETTER COMMENT INCOMING]
    function toggleLevel(level: number) {
        if (levels.includes(level)) {
            setLevels(levels.filter(l => l !== level));
            console.log(`button pressed: level ${level} turned off.`);
        } else {
            setLevels([...levels, level]);
            console.log(`button pressed: level ${level} turned on.`);
        }
        
    }

    /*it renders from top to bottom, so the <span> of course needs to come after the input so it lands on top.*/
    /*label, with the text being represented through <span> (a generic, it actually takes it as an acceptable alternative),
    so that we can customize it later on.*/
    return (
        <>
            <label>
                <input type="checkbox" onChange={() => toggleLevel(1)}></input>
                <span className="toggle">N1</span>
            </label>
            <label>
                <input type="checkbox" onChange={() => toggleLevel(2)}></input>
                <span className="toggle">N2</span>
            </label>
            <label>
                <input type="checkbox" onChange={() => toggleLevel(3)}></input>
                <span className="toggle">N3</span>
            </label>
            <label>
                <input type="checkbox" onChange={() => toggleLevel(4)}></input>
                <span className="toggle">N4</span>
            </label>
            <label>
                <input type="checkbox" onChange={() => toggleLevel(5)}></input>
                <span className="toggle">N5</span>
            </label>

            <button onClick={() => fetchWordsFromChosenLevels(levels)}>start!</button>
        </>
    );

}