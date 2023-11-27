'use client'

import { useSocket } from '@/hooks/socket';
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

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
    socket.on('joinedGame', (element) => {
      setTurn(element)
      push('/game')} 
    )
  })

  return (
    <div className='flex flex-col'>
      <div>Inicio</div>
      <input type="text" placeholder='Código' onChange={(e) => setCode(e.target.value)} />
      <button onClick={joinGame}>Jogar</button>
      <button onClick={createGame}>Criar jogo</button>
    </div>
  )
}
