import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import CellButton from './components/CellButton'
import './App.css'
import Button from './components/Button'
import Modal from './components/Modal'

const GRID = Array.from({ length: 9 }, (_, index) => index)

const WINNER_COMPS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App () {
  const [player, setPlayer] = useState<'X' | 'O'>('X')
  const [plays, setPlays] = useState<Map<number, 'X' | 'O'>>(new Map())
  const [showReset, setShowReset] = useState(false)
  const [showWinnerModal, setShowWinnerModal] = useState(false)

  function handleClick (cell: number) {
    if (plays.get(cell)) return

    const draft = new Map(plays).set(cell, player)

    const winner = WINNER_COMPS.find(comp => comp.every(cell => draft.get(cell) === player))
    setPlays(draft)

    if (winner) {
      setShowWinnerModal(true)
      return
    }
    if (plays.size >= 8 && !winner) setShowReset(true)

    setPlayer(prevPlayer => (prevPlayer === 'X' ? 'O' : 'X'))
  }

  function handleReset () {
    setShowWinnerModal(false)
    setShowReset(false)
    setPlayer('X')
    setPlays(new Map())
  }

  return (
    <main>
      <header>
        <h1>TA TE TI</h1>
        <div className='turns'>
          <span>
            TURNO DE:
          </span>
          <span className={`player-${player} player marginLeft`}>
            {player}
          </span>
        </div>
      </header>
      <section>
        {GRID.map(pos => (
          <CellButton key={pos} label={plays.get(pos)!} onClick={() => handleClick(pos)} />
        ))}
      </section>
      <footer>
        <AnimatePresence>
          {showReset && (
            <Button
              label='RESET'
              onClick={handleReset}
              className='reset-btn'
              initial={{ opacity: 0, height: 0, translateY: 85 }}
              animate={{
                opacity: 1,
                height: '100%',
                translateY: 0,
                transition: { duration: 0.3 }
              }}
              exit={{ opacity: 0, height: 0, translateY: 85 }}
            />
          )}
        </AnimatePresence>
      </footer>
      <AnimatePresence>
        {showWinnerModal && (
          <Modal
            title={player}
            message={`Ha ganado el jugador ${player}`}
            onClick={handleReset}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

export default App
