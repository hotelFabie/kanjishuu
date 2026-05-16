type ButtonAreaProps = {
    levels : number[];
    setLevels: (levels: number[]) => void;
    fetchWordsFromChosenLevels: (chosenLevels: number[]) => void;
}

//i think my confusion comes from adding a singular

//någonting likt detta: https://www.jqueryscript.net/form/Nice-Checkbox-And-Radio-Button-Replacement-Plugin-nicelabel-js.html
//https://stackoverflow.com/questions/4639572/check-html-checkbox-using-a-button

export default function ButtonArea({levels, setLevels, fetchWordsFromChosenLevels} : ButtonAreaProps) {
    //no hover effect. should switch color during press. press should trigger a function.

    //presuming that i will need to rewrite the buttons, as they can take onclick
    //https://stackoverflow.com/questions/76837048/creating-the-simplest-html-toggle-button
    //a bit too overwhelmed will all the choices right now
    //https://stackoverflow.com/questions/3197702/html-checkbox-onclick-called-in-javascript

    /*
        <button onClick={() => toggleLevel(1)} style={{ backgroundColor: levels.includes(1) ? 'lightblue' : 'white' }}>N1</button>
        <button onClick={() => toggleLevel(2)} style={{ backgroundColor: levels.includes(2) ? 'lightblue' : 'white' }}>N2</button>
        <button onClick={() => toggleLevel(3)} style={{ backgroundColor: levels.includes(3) ? 'lightblue' : 'white' }}>N3</button>
        <button onClick={() => toggleLevel(4)} style={{ backgroundColor: levels.includes(4) ? 'lightblue' : 'white' }}>N4</button>
        <button onClick={() => toggleLevel(5)} style={{ backgroundColor: levels.includes(5) ? 'lightblue' : 'white' }}>N5</button>
    */

    //spreading the array, or filtering it. [BETTER COMMENT INCOMING]
    function toggleLevel(level: number) {
        if (levels.includes(level)) {
            setLevels(levels.filter(l => l !== level));
        } else {
            setLevels([...levels, level]);
        }
    }

    //trying with checkboxes first.
    //add some sort of styling to these.
    //confused why we shape it as a lambda function.

    //implement the css from somewhere.
    
    return (
        <>
            <div className="leveltoggle">
                <input type="checkbox" onClick={() => toggleLevel(1)} />
                <label>N1</label>
            </div>
            <div className="leveltoggle">
                <input type="checkbox" onClick={() => toggleLevel(2)} />
                <label>N2</label>
            </div>
            <div className="leveltoggle">
                <input type="checkbox" onClick={() => toggleLevel(3)} />
                <label>N3</label>
            </div>
            <div className="leveltoggle">
                <input type="checkbox" onClick={() => toggleLevel(4)} />
                <label>N4</label>
            </div>
            <div className="leveltoggle">
                <input type="checkbox" onClick={() => toggleLevel(5)} />
                <label>N5</label>
            </div>

            <button onClick={() => fetchWordsFromChosenLevels(levels)}>start!</button>
        </>
    );

}