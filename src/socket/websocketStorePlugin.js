export default function createWebfeathersAppPlugin (feathersApp) {
    return store => {
      store.$feathersApp = feathersApp

      feathersApp.io.on('connect', payload => store.dispatch('SOCKET_connect', payload))
     
 

      feathersApp.service("users").on('created', payload => console.log('--user created--', payload))
      feathersApp.service("users").on('removed', payload => console.log('--user removed--', payload))
      
      feathersApp.service("users").on('newuser', payload => console.log('--new user--', payload))


      
      feathersApp.service("tasks").on('created', payload => console.log('--task created--', payload))
      feathersApp.service("tasks").on('removed', payload => console.log('--task removed--', payload))

      feathersApp.service("tasks").on('newtask', payload => console.log('--new task--', payload))
   

    }
  }