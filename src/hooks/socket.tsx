'use client'

import { ReactNode, createContext, useContext, useState } from 'react'
import io, { Socket } from 'socket.io-client';

interface SocketContextData {
  socket: Socket
  turn: string
  setTurn: (turn: string) => void
  code: string
  setCode: (code: string) => void
}

interface SocketProviderProps {
  children: ReactNode
  connection: Socket
}

const SocketContext = createContext({} as SocketContextData)

export function SocketProvider({ children, connection }: SocketProviderProps) {
  const [turn, setTurn] = useState('')
  const [code, setCode] = useState('')
  const socket = connection

  return (
    <SocketContext.Provider value={{ socket, turn, setTurn, code, setCode }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)

  return context
}