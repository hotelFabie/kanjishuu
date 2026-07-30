//wip: should contain the ButtonArea.
import { useState } from 'react'
import ButtonArea from '../components/ButtonArea.tsx';
import Footer from '../components/Footer.tsx';
import Menu from '../components/Menu.tsx';
import ExistingCardsPrecaution from '../components/ExistingCardsPrecaution.tsx';
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

  function toggleLevel(level: number) : void {
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
      <Menu />
      <>
      { sessionStorage.getItem('cards') === null
        ? <ButtonArea toggleLevel={toggleLevel} />
        : <ExistingCardsPrecaution />
      }
      </>

      <div>
        <p className={hasNoLevelSelected ? "visiblewarning" : "hiddenwarning"}>choose a level first</p>
        <button onClick={() => { redirectToPractice(levels) }} onAnimationEnd={() => { setHasNoLevelSelected(false) }}>start!</button>
      </div>
      <Footer />
    </>
  )
}