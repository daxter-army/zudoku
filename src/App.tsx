import { useEffect, useRef, useState } from 'react'

import BillBoard from '@/components/BillBoard/BillBoard'
import SudokuGrid from '@/components/SudokuGrid/SudokuGrid'
import TerminalButton from '@/components/TerminalButton/TerminalButton'

import { GAME_MODE, ID_TYPE } from '@/constants/common'
import { fullLed, LED_MATRIX_CONFIG, offLed } from '@/constants/led'
import { GAME_IN_PROGRESS, SELECT_MODE, WELCOME_TEXT } from '@/constants/lang'

import './App.css'

function App() {
  const allTimerRefs = useRef<Map<ID_TYPE, number>>(new Map())

  const [timer, setTimer] = useState(0)
  const [isPlay, setIsPlay] = useState(false)
  const [gameMode, setGameMode] = useState<GAME_MODE | null>(null)
  const [ledMatrix, setLedMatrix] = useState(LED_MATRIX_CONFIG)

  const onEasyModeClickHandler = () => {
    setGameMode(GAME_MODE.EASY)
    setIsPlay(true)
  }

  const onMediumModeClickHandler = () => {
    setGameMode(GAME_MODE.MEDIUM)
    setIsPlay(true)
  }

  const onHardModeClickHandler = () => {
    setGameMode(GAME_MODE.HARD)
    setIsPlay(true)
  }

  // S <-> Z animation switching off
  useEffect(() => {
    if (gameMode) {
      for (const [timerType, timerID] of allTimerRefs.current) {
        if (timerType === ID_TYPE.TIMEOUT) {
          clearTimeout(timerID)
          continue
        }

        clearInterval(timerID)
      }

      allTimerRefs.current.clear()
    }
  }, [gameMode])

  // S <-> Z animation switching on
  useEffect(() => {
    if (gameMode) return

    // S -> Z
    const ZTimerID = setInterval(() => {
      setLedMatrix((prev) => {
        const newLedMatrix = window.structuredClone(prev)

        newLedMatrix[1][3] = fullLed
        newLedMatrix[3][0] = fullLed

        newLedMatrix[1][0] = offLed
        newLedMatrix[2][0] = offLed
        newLedMatrix[2][3] = offLed
        newLedMatrix[3][3] = offLed

        return newLedMatrix
      })
    }, 2000)

    // Z -> S
    let STimerID: number
    const SDelayTimerID = setTimeout(() => {
      STimerID = setInterval(() => {
        setLedMatrix((prev) => {
          const newLedMatrix = window.structuredClone(prev)

          newLedMatrix[1][3] = offLed
          newLedMatrix[3][0] = offLed

          newLedMatrix[1][0] = fullLed
          newLedMatrix[2][0] = fullLed
          newLedMatrix[2][3] = fullLed
          newLedMatrix[3][3] = fullLed

          return newLedMatrix
        })

        allTimerRefs.current.set(ID_TYPE.INTERVAL, STimerID)
      }, 2000)
    }, 1000)

    allTimerRefs.current.set(ID_TYPE.INTERVAL, ZTimerID)
    allTimerRefs.current.set(ID_TYPE.TIMEOUT, SDelayTimerID)

    return () => {
      clearInterval(ZTimerID)
      clearInterval(STimerID)
      clearTimeout(SDelayTimerID)
    }
  }, [gameMode])

  return (
    <div className='h-dvh flex items-center justify-center'>
      <div className='arenaContainer flex flex-col gap-4'>
        <div className='flex flex-col gap-3'>
          <div>
            <BillBoard data={ledMatrix} />
            <p className='mt-4 text-l ibm-plex-mono-medium'>{gameMode ? isPlay ? GAME_IN_PROGRESS : 'paused' : WELCOME_TEXT}</p>
          </div>
          {!gameMode && <div className='flex flex-col gap-2'>
            <p className='text-sm ibm-plex-mono-regular'>{SELECT_MODE}</p>
            <div className='flex gap-4'>
              <TerminalButton
                onClickHandler={onEasyModeClickHandler}
                customShadowClassNames='!bg-[#32CD32]'>
                {GAME_MODE.EASY}
              </TerminalButton>
              <TerminalButton
                onClickHandler={onMediumModeClickHandler}
                customShadowClassNames='!bg-[#FF7F50]'>
                {GAME_MODE.MEDIUM}
              </TerminalButton>
              <TerminalButton
                onClickHandler={onHardModeClickHandler}
                customShadowClassNames='!bg-[#FF0000]'>
                {GAME_MODE.HARD}
              </TerminalButton>
            </div>
          </div>}
        </div>
        <div className='flex flex-col gap-4'>
          {gameMode && <SudokuGrid
            timer={timer}
            isPlay={isPlay}
            gameMode={gameMode}
            setGameMode={setGameMode}
            setTimer={setTimer}
            setIsPlay={setIsPlay}
          />}
        </div>
      </div>
    </div >
  )
}

export default App
