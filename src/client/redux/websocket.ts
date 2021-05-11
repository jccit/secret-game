import { connected, disconnected } from './reducers/socket'

const websocketMiddleware = () => {
  let socket: WebSocket | null = null;

  const onOpen = store => () => {
    store.dispatch(connected());
  }

  const onDisconnect = store => () => {
    store.dispatch(disconnected());
  }

  return store => next => action => {
    switch (action.type) {
      case 'socket/connect':
        if (socket !== null)
          socket.close();

        socket = new WebSocket(action.payload);
        socket.onopen = onOpen(store);
        socket.onerror = onDisconnect(store);
        
        return next(action);
      default:
        if (socket !== null)
          socket.send(JSON.stringify(action));
        
        return next(action);
    }
  }
}

export default websocketMiddleware();