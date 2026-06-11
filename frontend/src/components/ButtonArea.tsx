type ButtonAreaProps = {
    levels : number[];
    setLevels: (levels: number[]) => void;
    someFunction: (levels: number[]) => void; //wip: rename the function.
}

export default function ButtonArea({levels, setLevels, someFunction} : ButtonAreaProps) {

    //wip: useful comment.
    function toggleLevel(level: number) {
        if (levels.includes(level)) {
            setLevels(levels.filter(l => l !== level));
            console.log(`button pressed: level ${level} turned off.`);
        } else {
            setLevels([...levels, level]);
            console.log(`button pressed: level ${level} turned on.`);
        }    
    }

    return (
        <>
            <div className="button-area">
                <label>
                    <input type="checkbox" onChange={() => toggleLevel(1)}></input>
                    <span className={[`toggle`, `n1`].join(' ')}>N1</span>
                </label>
                <label>
                    <input type="checkbox" onChange={() => toggleLevel(2)}></input>
                    <span className={[`toggle`, `n2`].join(' ')}>N2</span>
                </label>
                <label>
                    <input type="checkbox" onChange={() => toggleLevel(3)}></input>
                    <span className={[`toggle`, `n3`].join(' ')}>N3</span>
                </label>
                <label>
                    <input type="checkbox" onChange={() => toggleLevel(4)}></input>
                    <span className={[`toggle`, `n4`].join(' ')}>N4</span>
                </label>
                <label>
                    <input type="checkbox" onChange={() => toggleLevel(5)}></input>
                    <span className={[`toggle`, `n5`].join(' ')}>N5</span>
                </label>
            </div>

            <button className="start" onClick={() => someFunction(levels)}>start!</button>
        </>
    );
}