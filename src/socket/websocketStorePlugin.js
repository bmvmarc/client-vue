export default function createWebSocketPlugin (socket) {
    return store => {
      store.$socket = socket

      socket.on('connect', payload => store.dispatch('SOCKET_connect', payload))
     


      socket.on('users created', payload => console.log('--user created--', payload))
      socket.on('users removed', payload => console.log('--user removed--', payload))
      
      socket.on('users newuser', payload => console.log('--new user--', payload))


      
      socket.on('tasks created', payload => console.log('--task created--', payload))
      socket.on('tasks removed', payload => console.log('--task removed--', payload))

      socket.on('tasks newtask', payload => console.log('--new task--', payload))
   

    }
  }