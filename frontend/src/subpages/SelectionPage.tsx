//wip: should contain the ButtonArea.
import { useState } from 'react'
import Menu from '../components/Menu.tsx';
import ButtonArea from '../components/ButtonArea.tsx';
import { useNavigate } from 'react-router';

export function SelectionPage() {
  const [levels, setLevels] = useState<number[]>([]);

  const navigate = useNavigate();

  //will do a redirection of sorts, only if this array isn't empty.
  function someFunction(levels: number[]) {
    if (levels.length > 0) {
      navigate("/practice", { state: { levels } }); //is this a safe practice?
    } else {
      //wip: produce the error message.
    }
  }

  return (
    <>
      <Menu />
      <ButtonArea levels={levels} setLevels={setLevels} someFunction={someFunction} />
    </>
  )
}