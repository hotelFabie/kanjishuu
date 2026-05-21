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

    return (
        <>
            <label className="toggle">
                <input type="checkbox" onClick={() => toggleLevel(1)}></input>
                <span>N1</span>
            </label>

            <button className="levelToggle" onClick={() => toggleLevel(1)}>N1</button>
            <button className="levelToggle" onClick={() => toggleLevel(2)}>N2</button>
            <button className="levelToggle" onClick={() => toggleLevel(3)}>N3</button>
            <button className="levelToggle" onClick={() => toggleLevel(4)}>N4</button>
            <button className="levelToggle" onClick={() => toggleLevel(5)}>N5</button>

            <button onClick={() => fetchWordsFromChosenLevels(levels)}>start!</button>
        </>
    );

}