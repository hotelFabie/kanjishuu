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
        } else {
            setLevels([...levels, level]);
        }
    }

    /*you cannot use the same id multiple times, so i will have to do something about this*/
    return (
        <>
            <button className="levelToggle" onClick={() => toggleLevel(1)} style={{backgroundColor: levels.includes(1) ? "selectedLevel" : ""}}>N1</button>
            <button className="levelToggle" onClick={() => toggleLevel(2)} style={{backgroundColor: levels.includes(2) ? "selectedLevel" : ""}}>N2</button>
            <button className="levelToggle" onClick={() => toggleLevel(3)} style={{backgroundColor: levels.includes(3) ? "selectedLevel" : ""}}>N3</button>
            <button className="levelToggle" onClick={() => toggleLevel(4)} style={{backgroundColor: levels.includes(4) ? "selectedLevel" : ""}}>N4</button>
            <button className="levelToggle" onClick={() => toggleLevel(5)} style={{backgroundColor: levels.includes(5) ? "selectedLevel" : ""}}>N5</button>

            <button onClick={() => fetchWordsFromChosenLevels(levels)}>start!</button>
        </>
    );

}