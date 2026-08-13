//wip: should contain the ButtonArea.
import { useState } from 'react'
import ButtonArea from '../components/ButtonArea.tsx';
import Footer from '../components/Footer.tsx';
import Menu from '../components/Menu.tsx';
//import ExistingCardsPrecaution from '../components/ExistingCardsPrecaution.tsx';
import { useNavigate } from 'react-router';

export function SelectionPage() {
  const [levels, setLevels] = useState<number[]>([]);
  let [hasNoLevelSelected, setHasNoLevelSelected] = useState<boolean>(false);
  let [hasCardsSaved, setHasCardsSaved] = useState(sessionStorage.getItem("cards") !== null); //or a const...

  const navigate = useNavigate();

  function redirectToPractice(levels: number[]) {
    if (levels.length > 0) {
      navigate("/practice", { state: { levels } });
      setHasNoLevelSelected(false);
    } else {
      setHasNoLevelSelected(true);
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

  //uncertain if this is needed, we will need to setCards() somehow.
  function discardCards(): void {
    sessionStorage.removeItem('cards');
    setHasCardsSaved(false);
    console.log("Attempt at discarding cards done.");
    console.log("sessionStorage value is: " + sessionStorage.getItem('cards'));
  }

  return (
    <>
      <Menu />
      <>
      { !hasCardsSaved
        ? 
        <div className="defaultStart"> 
          <ButtonArea toggleLevel={toggleLevel} />   
          <p className={hasNoLevelSelected ? "visiblewarning" : "hiddenwarning"}>A level must be chosen first.</p>      
          <button onClick={() => { redirectToPractice(levels) }} onAnimationEnd={() => { setHasNoLevelSelected(false) }}>start!</button>
        </div >
        : <div className="existingCardsPrecaution">
            <p>You already have fetched cards, do you: </p>
            <button onClick={() => navigate("/practice", { state: { levels } })}>Continue</button>
            <button onClick={() => discardCards()}>Discard</button>
          </div>
      }
      </>

      <Footer />
    </>
  )
}