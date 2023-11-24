'use client'

import { useEffect } from 'react'

import io, { Socket } from 'socket.io-client';

let socket: Socket;

export default function Home() {
  const ENDPOINT = 'http://localhost:3333'

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('createGame', 'x')
  }, [])


  return (
    <div>Inicio</div>
  )
}
