import { connected, disconnected } from './reducers/socket'

const websocketMiddleware = () => {
  let socket: WebSocket | null = null;

  const onOpen = (store, joinPayload) => () => {
    socket?.send(JSON.stringify({ type: 'join', payload: joinPayload }));
    store.dispatch(connected());
  }

  const onDisconnect = store => () => {
    store.dispatch(disconnected());
  }

  const onMessage = store => (event) => {
    const action = JSON.parse(event.data);

    if (action.type.startsWith('game') || action.type.startsWith('player')) {
      store.dispatch({
        ...action,
        server: true
      });
    }
  }

  return store => next => action => {
    switch (action.type) {
      case 'socket/connect':
        if (socket !== null)
          socket.close();

        socket = new WebSocket('ws://localhost:8090');
        socket.onopen = onOpen(store, action.payload);
        socket.onerror = onDisconnect(store);
        socket.onmessage = onMessage(store);
        
        return next(action);
      default:
        if (socket !== null && !action.server && action.type.startsWith('game'))
          socket.send(JSON.stringify(action));
        
        return next(action);
    }
  }
}

export default websocketMiddleware();