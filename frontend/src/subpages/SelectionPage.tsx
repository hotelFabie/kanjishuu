//wip: should contain the ButtonArea.
import { useState } from 'react'
import Menu from '../components/Menu.tsx';
//import ButtonArea from '../components/ButtonArea.tsx';
import { useNavigate } from 'react-router';

export function SelectionPage() {
  const [levels, setLevels] = useState<number[]>([]);
  let [hasNoLevelSelected, setHasNoLevelSelected] = useState<boolean>(false);

  const navigate = useNavigate();

  function redirectToPractice(levels: number[]) {
    if (levels.length > 0) {
      navigate("/practice", { state: { levels } });
      setHasNoLevelSelected(false);
    } else {
      setHasNoLevelSelected(true);
      //wip: produce the error message.
      //setHasNoLevelSelected(true); //this will basically always be true now.
    }
  }

      function toggleLevel(level: number) {
        if (levels.includes(level)) {
            setLevels(levels.filter(l => l !== level));
            console.log(`button pressed: level ${level} turned off.`);
        } else {
            setLevels([...levels, level]);
            console.log(`button pressed: level ${level} turned on.`);
        }    
    }

  //see, i am basically calling it a button-area here as well - so it is readable - and that is fine.
  return (
    <>
      <Menu />
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
      <div>
        <p>{hasNoLevelSelected ? "please choose a level" : "..."}</p>
        <button className={hasNoLevelSelected ? "active" : ""} onClick={() => { redirectToPractice(levels) }} onAnimationEnd={() => { setHasNoLevelSelected(false) }}>start!</button>
      </div>
    </>
  )
}