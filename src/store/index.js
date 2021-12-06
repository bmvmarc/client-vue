import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
    state: () => ({
        isAuth: false,
        email: '',
        userName: '',
        accessToken: '',
        isLoading: false,
        isLoginError: false,
        isRegError: false,
        regMessage: '',
        allUsers: []
     }),

    getters: {
        allUsersList(state, getters) {
            return [...state.allUsers]
                .map(i => { return {id: i._id, name: `${i.name} (${i.email})`} } );
        }        
    },

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
        setLoading(state, bool) {
            state.isLoading = bool;
        },
        setLoginError(state, bool) {
            state.isLoginError = bool;
        },
        setRegError(state, bool) {
            state.isRegError = bool;
        },
        setRegMessage(state, str) {
            state.regMessage = str;
        },
        
        setAllUsers(state, data) {
            state.allUsers = data;
        },

        deleteUsersData(state) {
            state.userName = '';
            state.email = '';
            state.accessToken = '';
            state.isAuth = false;
            state.setAllUsers = [];
        }

    },

    actions: {
        async authUser({state, commit}, authParams) {
            try {
                commit('setLoginError', false);
                commit('setLoading', true);
                
                const response = await axios.post('http://localhost:3030/authentication',
                    {  
                        "strategy": "local",
                        "email":    authParams.email,
                        "password": authParams.password
                    });

                commit('setUserName',    response.data.user.name);
                commit('setEmail',       response.data.user.email);
                commit('setAccessToken', response.data.accessToken);
                commit('setIsAuth',      true);                
      
            } catch(err) {
                commit('setLoginError',   true);
            } finally {
                commit('setLoading', false);
            }
          },

          async regUser({state, commit}, regParams) {
            try {
                commit('setRegError', false);
                commit('setLoading', true);
                
                const response = await axios.post('http://localhost:3030/users',
                        {   
                            "name": regParams.userName || regParams.email,
                            "email": regParams.email,
                            "password": regParams.password
                        });
                
                commit('setRegMessage', 'User has been registered');

                setTimeout(() => {
                    commit('setRegMessage', '');                  
                }, 5000);
                

            } catch(err) {
                commit('setRegError', true);
            } finally {
                commit('setLoading', false);
            }
          }, 
          
          async getUsers({state, commit}) {
            try {
                commit('setLoading', true);

                const authStr = 'Bearer '.concat(state.accessToken); 
                
                const response = await axios.get('http://localhost:3030/users', 
                                                { 'headers': { 'Authorization': authStr }});

                commit('setAllUsers', response.data.data);
                console.log(response.data.data);
      
            } catch(err) {
                console.log('Something went wrong...');
            } finally {
                commit('setLoading', false);
            }
          },          
          
        logOut({state, commit}) {
            commit('deleteUsersData');
        }              
    }
});