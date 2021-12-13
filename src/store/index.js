import { createStore } from 'vuex';

export default createStore({
    state: () => ({
       
        isAuth: false,
        email: '',
        userName: '',
        userId: '',
        accessToken: '',
        
        SERVER_URL: 'http://localhost:3030'

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
        }              
    }
});