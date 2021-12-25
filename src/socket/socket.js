import io from 'socket.io-client'
import feathers from "@feathersjs/feathers"
import socketio from "@feathersjs/socketio-client"
const auth = require('@feathersjs/authentication-client')

const socket = io('http://localhost:3030')
const feathersApp = feathers()
feathersApp.configure(socketio(socket))
feathersApp.configure(auth())

export default feathersApp