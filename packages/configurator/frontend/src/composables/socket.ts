import type { ManagerOptions, SocketOptions } from 'socket.io-client'
import { io } from 'socket.io-client'
import { ref } from 'vue'

export namespace UseSocket {
  export type Status =
    | 'connected'
    | 'disconnected'
    | 'connecting'
    | 'reconnecting'
    | 'reconnect_failed'
    | 'reconnect_error'
    | 'reconnect_attempt'
}

export function useSocket<Namespace extends string>(
  namespace?: Namespace,
  extraOptions: Omit<Partial<ManagerOptions & SocketOptions>, 'path'> = {},
) {
  const status = ref<UseSocket.Status>('disconnected')

  const socket = io(namespace, {
    transports: ['websocket', 'polling', 'webtransport'],
    ...extraOptions,
  })

  // 监听连接成功事件
  socket.on('connect', () => {
    status.value = 'connected'
  })

  // 监听连接断开事件
  socket.on('disconnect', () => {
    status.value = 'disconnected'
  })

  // 监听连接错误事件
  socket.on('connect_error', () => {
    status.value = 'disconnected'
  })

  // 监听重连尝试事件
  socket.on('reconnect_attempt', () => {
    status.value = 'reconnect_attempt'
  })

  // 监听重连错误事件
  socket.on('reconnect_error', () => {
    status.value = 'reconnect_error'
  })

  // 监听重连失败事件
  socket.on('reconnect_failed', () => {
    status.value = 'reconnect_failed'
  })

  // 监听重连成功事件
  socket.on('reconnect', () => {
    status.value = 'connected'
  })

  function sendOnConnected(event: string, ...args: any[]) {
    if (status.value === 'connected') {
      socket.emitWithAck(event, ...args)
    }
    else {
      socket.on('connect', () => {
        socket.emitWithAck(event, ...args)
      })
    }
  }

  return {
    status,
    send: socket.emitWithAck.bind(socket) as typeof socket.emitWithAck,
    listen: socket.on.bind(socket) as typeof socket.on,
    sendOnConnected: sendOnConnected as typeof socket.emitWithAck,
    connect: socket.connect.bind(socket) as typeof socket.connect,
    socket,
  }
}
