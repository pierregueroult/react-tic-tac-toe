import { useState, Fragment, ReactElement, useEffect } from "react"
import Topbar from "./Topbar";
import Symbols from "./Symbols";


export default function App(): ReactElement {

  const defaultPatern = [[0, 0, 0], [0, 0, 0],[0, 0, 0]]
  
  const [currentPatern, setCurrentPatern] = useState(defaultPatern);
  // ! with 0 => null, 1 => noughts, 2 => crosses
  const [currentPlayer, setCurrentPlayer] = useState(2);
  // ! with 1 => noughts, 2 => crosses

  // * Nought play first
  const [round, setRound] = useState(0)
  const [win, setWin] = useState(false);

  function action(row: number, col: number) {
    updateCurrentPatern(row, col);
    updateCurrentPlayer();
    setRound(round + 1);
  }

  function replay() {
    setRound(0);
    setCurrentPatern(defaultPatern);
    setCurrentPlayer(2)
    setWin(false);
  }

  function updateCurrentPatern(row: number, col: number): void {
    let storage = [...currentPatern]
    if(currentPlayer === 1) {
      storage[row][col] = 1
    } else {
      storage[row][col] = 2
    }
    setCurrentPatern(storage);
  }

  function updateCurrentPlayer(): void {
    if(currentPlayer === 1) {
      setCurrentPlayer(2)
    } else {
      setCurrentPlayer(1)
    }
  }

  function checkPattern(pattern: number[][]): void {
    for (let i = 0; i < pattern.length; i++) {
      // check for row combo
      if (pattern[i][0] === pattern[i][1] && pattern[i][1] === pattern[i][2] && pattern[i][1] !== 0) {
        setWin(true);
        return
      }
      // check for column combo 
      if (pattern[0][i] === pattern[1][i] && pattern[1][i] === pattern[2][i] && pattern[1][i] !== 0) {
        setWin(true);
        return
      }
    }
    // check for diagonal
    if (pattern[0][0] === pattern[1][1] && pattern[1][1] === pattern[2][2] && pattern[1][1] !== 0) {
      setWin(true);
      return
    }
    if (pattern[0][2] === pattern[1][1] && pattern[1][1] === pattern[2][0] && pattern[1][1] != 0) {
      setWin(true);
      return
    }
    
  }

  useEffect(() => {
    checkPattern(currentPatern);
    
    // return () => {}
  }, [round])
  

  return (
    <div className="container">
      <Topbar round={round} replay={replay}/>
      <div className="render">
        {currentPatern.map((el, i) => (
          <Fragment key={i + 1}>
            {el.map((ele, j) => (
            ele === 1 ? (
              <Symbols status='nought' key={j + 1}/>
            ) : ele === 2 ? (
              <Symbols status='cross' key={j + 1}/>
            ) : ele === 0 ? (
              <button className='input-field' key={j + 1} onClick={win === false ? () => action(i, j) : void(0)}></button>
            ) : ( 'error wtf' )
          ))}
          </Fragment>
        ))
        }
      </div>
      <div className="win">
      {win === true ? 
        <p>The winner is <span className='bold-span'>{currentPlayer === 1 ? 'cross' : 'nought'}</span></p>
        : ''
      }
      {win === false && round === 9 ? 
        <p>There is no winner, click <span onClick={replay} className='bold-span'>here</span> to replay</p>
        : ''
      }
      </div>
    </div>
  )
}
