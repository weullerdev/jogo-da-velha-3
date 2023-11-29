'use client'

import { useSocket } from '@/hooks/socket';
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import PLAYER_X from '@/assets/playerX.svg'
import PLAYER_O from '@/assets/playerO.svg'
import Image from 'next/image';

export default function Home() {
  const [code, setCode] = useState('');

  const { socket, setTurn } = useSocket()
  const { push } = useRouter()

  const createGame = () => {
    socket.emit('createGame', 'x')
    setTurn('x')
    push('/game')
  }

  const joinGame = () => {
    socket.emit('joinGame', code)
  }

  useEffect(() => {
    socket.on('errorCode', () => console.log('errou'))
    socket.on('joinedGame', (element: string) => {
      setTurn(element)
      push('/game')} 
    )
  })

  return (
      
    <div className='w-screen h-screen flex flex-col justify-center items-center overflow-hidden'>
      <div className='absolute w-full h-screen scroll-hidden z-0 overflow-hidden'>
        <div className="animation-circle-cross"><Image src={PLAYER_X} alt='' width={40} height={40} /></div>
        <div className="animation-circle-cross"><Image src={PLAYER_O} alt='' width={40} height={40} /></div>
        <div className="animation-circle-cross"><Image src={PLAYER_X} alt='' width={40} height={40} /></div>
        <div className="animation-circle-cross"><Image src={PLAYER_O} alt='' width={40} height={40} /></div>
        <div className="animation-circle-cross"><Image src={PLAYER_X} alt='' width={40} height={40} /></div>
        <div className="animation-circle-cross"><Image src={PLAYER_O} alt='' width={40} height={40} /></div>
        <div className="animation-circle-cross"><Image src={PLAYER_X} alt='' width={40} height={40} /></div>
        <div className="animation-circle-cross"><Image src={PLAYER_O} alt='' width={40} height={40} /></div>
      </div> 
      <div className='login w-96 h-96 flex flex-col items-center justify-evenly p-4 bg-[#2c4a58] z-10 overflow-hidden'>
        <h1 className='text-2xl text-white'>JOGO DA VELHA 3</h1>
        <div className='w-screen flex justify-center gap-8'>
          <Image src={PLAYER_X} alt='' width={40} height={40} />
          <Image src={PLAYER_O} alt='' width={40} height={40} />
        </div>
        <button 
          className='w-64 h-10 rounded-2xl text-lg text-white bg-[#31c4be] hover:bg-[#24918c] transition ease-in-out duration-300'
          onClick={createGame}
        >
          Novo jogo
        </button>
        <div className='flex flex-col gap-3'>
          <input 
            className='h-10 p-1 pl-2 text-white rounded-lg outline-none bg-[#253f4a] transition ease-in-out duration-300 focus:ring-2 focus:ring-[#f2b237]'
            type="text" 
            autoFocus
            placeholder='Código' 
            onChange={(e) => setCode(e.target.value)} 
          />
          <button 
            className='w-64 h-10 rounded-2xl text-lg text-white bg-[#f2b237] hover:bg-[#bf8c2b] transition ease-in-out duration-300'
            onClick={joinGame}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  )
}
