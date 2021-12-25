import { createStore } from 'vuex'
import createWebSocketPlugin from '../socket/websocketStorePlugin.js'
import feathersApp from '../socket/socket.js'

const websocketPlugin = createWebSocketPlugin(feathersApp)

export default createStore({
    plugins: [websocketPlugin],

    state: () => ({
       
        isAuth: false,
        email: '',
        userName: '',
        userId: '',
        accessToken: ''

     }),

    mutations: {

        setUserData(state, userData) {
            state.userName    = userData.userName;
            state.userId      = userData.userId;
            state.email       = userData.email;
            state.accessToken = userData.accessToken;
            state.isAuth      = userData.isAuth;
        },

        deleteUsersData(state) {
            state.userName = '';
            state.userId = '';
            state.email = '';
            state.accessToken = '';
            state.isAuth = false;
        }
    },

    actions: {
         
        logOut({state, commit}) {
            commit('deleteUsersData');
        },         
        // SOCKET_create ({ commit }, payload) {
        //     // commit('doSomethingWithMessage', payload)
        //     console.log(payload)
        // },        
        
        SOCKET_connect({state}) {
            console.log('connect (store) ')

        }
    }
});