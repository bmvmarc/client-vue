import {ref} from 'vue'
import store from '../../store'

export default function useTryToLogin() {

    const email = ref('')
    const password = ref('')
    const wrongData = ref(false)
    const isLoading = ref(false)
    const isLoginError = ref(false)

    const tryToLogIn = async (sock) =>  {

        if (email.value == '' || password.value =='') {
            wrongData.value = true

        } else {
            wrongData.value = false
            isLoginError.value = false
            isLoading.value = true

            sock.emit('create', 'authentication', {
                strategy: 'local',
                email: email.value,
                password: password.value
                }, (error, authResult) => {

                    if (error) {
                        console.log(error.message); 
                        isLoginError.value = true;  
                    } else {
                        store.commit('setUserData',  
                                        {
                                            userName:    authResult.user.name,
                                            email:       authResult.user.email,
                                            userId:      authResult.user._id,
                                            accessToken: authResult.accessToken,
                                            isAuth:      true
                                        });
                       
                        email.value = '';
                        password.value = '';                                        
                    }
                    isLoading.value = false;
            })
   
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