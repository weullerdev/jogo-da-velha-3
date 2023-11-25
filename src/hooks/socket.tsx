'use client'

import { ReactNode, createContext, useContext, useState } from 'react'
import io, { Socket } from 'socket.io-client';

interface SocketContextData {
  socket: Socket
}

interface SocketProviderProps {
  children: ReactNode
  connection: Socket
}

const SocketContext = createContext({} as SocketContextData)

export function SocketProvider({ children, connection }: SocketProviderProps) {
  const socket = connection

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)

  return context
}