import {ref} from 'vue';
import axios from 'axios';
import store from '../../store';

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

                const response = await axios.post(store.state.SERVER_URL + '/authentication',
                    {  
                        "strategy": "local",
                        "email":    email.value,
                        "password": password.value
                    });

                store.commit('setUserData',  
                                {
                                    userName:    response.data.user.name,
                                    email:       response.data.user.email,
                                    userId:      response.data.user._id,
                                    accessToken: response.data.accessToken,
                                    isAuth:      true
                                });
        
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