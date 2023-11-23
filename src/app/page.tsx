'use client'
import { useState, useEffect } from 'react'

interface SquareGame {
  value: 'x' | 'o' | null
  date?: Date;
}

export default function Home() {
  const [squareGame, setSquareGame] = useState<SquareGame[]>([])
  const [turn, setTurn] = useState<'x' | 'o'>('x')

  const createGame = () => {
    const game = [...Array(9)].map(i => ({ value: null }))
    setSquareGame(game)
    setTurn('x')
  }

  const handleClick = (i: number) => {
    if(squareGame[i].value !== null) return
    const playerTurn = squareGame.filter(v => v.value === turn).sort((a, b) => a.date?.getTime()! - b.date?.getTime()!)

    if(playerTurn.length === 3) {
      const index = squareGame.findIndex(v => v.date?.getTime()! === playerTurn[0].date?.getTime()!)

      squareGame[index] = {
        value: null,
        date: undefined,
      }
    }

    squareGame[i] = {
      value: turn,
      date: new Date(),
    }

    setTurn(turn === 'x' ? 'o' : 'x')
    setSquareGame([...squareGame])
  }

  const winConditions = () => {
    const currentTurn = turn === 'x' ? 'o' : 'x'
    // Verificar linhas
    for(let i = 0; i < 7; i += 3){
      if(squareGame[i].value === currentTurn && squareGame[i + 1].value === currentTurn && squareGame[i + 2].value === currentTurn){
        setTimeout(() => {
          alert(`${currentTurn} ganhou`)

        }, 200)
      }
    }

    // Verificar colunas
    for(let i = 0; i < 3; i++){
      if(squareGame[i].value === currentTurn && squareGame[i + 3].value === currentTurn && squareGame[i + 6].value === currentTurn){
                setTimeout(() => {
          alert(`${currentTurn} ganhou`)

        }, 200)
      }
    }

    // Verificar diagonais
    if(squareGame[0].value === currentTurn && squareGame[4].value === currentTurn && squareGame[8].value === currentTurn){
              setTimeout(() => {
          alert(`${currentTurn} ganhou`)

        }, 200)
    }
    if(squareGame[2].value === currentTurn && squareGame[4].value === currentTurn && squareGame[6].value === currentTurn){
              setTimeout(() => {
          alert(`${currentTurn} ganhou`)

        }, 200)
    }
  }

  useEffect(() => {
    createGame()
  },[])

  useEffect(() => {
    if(squareGame.length === 9){
      winConditions()
    }
  },[squareGame])

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center gap-8'>
      <h1 className='text-white'>Jogo da Velha 3</h1>
      <div className='grid grid-cols-3 w-[calc(128px*3)] gap-y-6 gap-x-16'>
        {squareGame?.map((x, i) => (
          <div onClick={() => handleClick(i)} className='flex items-center justify-center w-32 h-32 rounded-lg bg-gray-600 shadow-lg cursor-pointer'>
            <span className='text-8xl text-white'>{x.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
