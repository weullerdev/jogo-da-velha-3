'use client'

import { useState, useEffect } from 'react'

import io, { Socket } from 'socket.io-client';

import Image from 'next/image';

import PLAYER_X from '@/assets/playerX.svg'
import PLAYER_O from '@/assets/playerO.svg'
import { useSocket } from '@/hooks/socket';

interface SquareGame {
  value: 'x' | 'o' | null
  date?: Date;
}

let socket: Socket;

export default function Game() {
  const { turn } = useSocket()
  const [squareGame, setSquareGame] = useState<SquareGame[]>([])
  const [turnGame, setTurnGame] = useState<'x' | 'o'>('x')
  const [playerWin, setPlayerWin] = useState(false)

  const ENDPOINT = 'http://localhost:3333'

  const win = (element: string) => {
    setTimeout(() => {
      alert(`${element} ganhou`)
    }, 200)
    // console.log(`${element} win`)
    // socket.emit('reset')
  }

  const handleClick = (i: number) => {
    if(turnGame !== turn) return
    
    if (squareGame[i].value !== null) return
    const playerTurn = squareGame.filter(v => v.value === turn).sort((a, b) => new Date(a.date!)?.getTime()! - new Date(b.date!)?.getTime()!)

    if (playerTurn.length === 3) {
      const index = squareGame.findIndex(v => new Date(v.date!)?.getTime()! === new Date(playerTurn[0].date!)?.getTime()!)

      squareGame[index] = {
        value: null,
        date: undefined,
      }
    }

    squareGame[i] = {
      value: turnGame,
      date: new Date(),
    }

    socket.emit('round', squareGame, turnGame)
  }

  const winConditions = (squareGame: SquareGame[]) => {
    const currentTurn = turnGame === 'x' ? 'o' : 'x'
    // Verificar linhas
    for (let i = 0; i < 7; i += 3) {
      if (squareGame[i].value === currentTurn && squareGame[i + 1].value === currentTurn && squareGame[i + 2].value === currentTurn) {
        setPlayerWin(true)
      }
    }

    // Verificar colunas
    for (let i = 0; i < 3; i++) {
      if (squareGame[i].value === currentTurn && squareGame[i + 3].value === currentTurn && squareGame[i + 6].value === currentTurn) {
        setPlayerWin(true)
      }
    }

    // Verificar diagonais
    if (squareGame[0].value === currentTurn && squareGame[4].value === currentTurn && squareGame[8].value === currentTurn) {
      setPlayerWin(true)
    }
    if (squareGame[2].value === currentTurn && squareGame[4].value === currentTurn && squareGame[6].value === currentTurn) {
      setPlayerWin(true)
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('createGame', 'x')
  }, [])

  useEffect(() => {
    if(playerWin){
      win(turnGame === 'o' ? 'x' : 'o')
      socket.emit('createGame')
      setPlayerWin(false)
    }
  },[playerWin])

  useEffect(() => {
    socket.on('updateGame', (game) => {
      setSquareGame(game.value) 
      setTurnGame(game.turn)
      if(game.value.length === 9){
        winConditions(game.value)
      }
    })
    // socket.on('winner', (element) => win(element))
  })

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center gap-4'>
      <div className='grid grid-cols-3 w-[calc(128px*3+64px)] h-10'>
        <div className='flex items-center gap-2'>
          <Image src={PLAYER_X} alt='' width={25} height={25} />
          <Image src={PLAYER_O} alt='' width={25} height={25} />
        </div>
        <div className='flex items-center justify-center'>
          <div className='flex items-center w-28 h-9 gap-2 rounded-lg bg-[#2c4a58] py-1 px-3'>
            <span className='text-white text-lg'>Turno</span> 
            {turnGame === 'x' ? ( 
              <Image src={PLAYER_X} alt='' width={25} height={25} />
            ) : ( 
              <Image src={PLAYER_O} alt='' width={25} height={25} />
            )}
          </div>
        </div>
        <div className='flex justify-end items-center gap-2'>
          <button 
            className='w-28 h-9 rounded-lg text-base text-white bg-[#7d8d94] hover:bg-[#515c61] transition ease-in-out duration-300'
            onClick={() => socket.emit('createGame', 'x')}
          >
            Recomeçar
          </button>
        </div>
      </div>
      <div className='grid grid-cols-3 w-[calc(128px*3+64px)] gap-y-6 gap-x-8'>
        {squareGame?.map((x, i) => (
          <div key={i} onClick={() => handleClick(i)} className='flex items-center justify-center w-32 h-32 rounded-lg bg-gray-600 shadow-lg cursor-pointer'>
            <div className='flex items-center justify-center text-8xl text-white'>
              {x.value === 'x' ?
                <Image src={PLAYER_X} alt='' width={60} height={60} />
                : x.value === 'o' ?
                  <Image src={PLAYER_O} alt='' width={60} height={60} />
                  : null
              }
            </div>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-3 w-[calc(128px*3+64px)] h-14'>
        <div className='flex items-center'>
          <div className='flex flex-col items-center justify-around w-28 h-13 rounded-lg bg-[#31c4be] bg-opacity-60'>
            <span className='text-white text-lg'>Wins X</span>
            <div className='text-white text-lg'>1</div>
          </div>
        </div>
        <div className='flex justify-center items-center gap-2'>
          <button
            className='w-28 h-9 rounded-lg text-base text-white bg-[#7d8d94] hover:bg-[#515c61] transition ease-in-out duration-300'
          >
            Resetar
          </button>
        </div>
        <div className='flex items-center justify-end'>
          <div className='flex flex-col items-center justify-around w-28 h-13 rounded-lg bg-[#f2b237] bg-opacity-60'>
            <span className='text-white text-lg'>Wins O</span>
            <div className='text-white text-lg'>1</div>
          </div>
        </div>
      </div>
    </div>
  )
}