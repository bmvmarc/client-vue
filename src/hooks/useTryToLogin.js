import {ref} from 'vue';
import axios from 'axios';
import store from '../store';

export default function useTryToLogin() {

    const email = ref('');
    const password = ref('');
    const wrongData = ref(false);

    const isLoading = ref(false);
    const isLoginError = ref(false);
  

    const tryToLogIn = async () =>  {

        if (email.value == '' || password.value =='') {
            wrongData.value = true;

        } else {
            wrongData.value = false;
            isLoginError.value = false;
            isLoading.value = true;
            try {

                const response = await axios.post('http://localhost:3030/authentication',
                    {  
                        "strategy": "local",
                        "email":    email.value,
                        "password": password.value
                    });

                store.commit('setUserName',    response.data.user.name);
                store.commit('setEmail',       response.data.user.email);
                store.commit('setAccessToken', response.data.accessToken);
                store.commit('setIsAuth',      true);                
        
            } catch(err) {
                isLoginError.value = true;
            } finally {
                isLoading.value = false;
            }

            email.value = '';
            password.value = '';                                
        }
    }

    return {
        email,
        password,
        wrongData,

        tryToLogIn,
        
        isLoading,
        isLoginError
    }

}