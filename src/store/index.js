import { createStore } from 'vuex';

export default createStore({
    state: () => ({
       
        isAuth: false,
        email: '',
        userName: '',
        accessToken: ''
    
     }),

    mutations: {
        setIsAuth(state, bool) {
            state.isAuth = bool;
        },        
        setEmail(state, email) {
            state.email = email;
        },
        setUserName(state, userName) {
            state.userName = userName;
        },
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },        

        deleteUsersData(state) {
            state.userName = '';
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