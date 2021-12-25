import {ref} from 'vue'
import store from '../../store'
import feathersApp from '../../socket/socket.js'

export default function useTryToLogin() {

    const email = ref('')
    const password = ref('')
    const wrongData = ref(false)
    const isLoading = ref(false)
    const isLoginError = ref(false)

    const tryToLogIn = async () =>  {

        if (email.value == '' || password.value =='') {
            wrongData.value = true

        } else {
            wrongData.value = false
            isLoginError.value = false
            isLoading.value = true

            feathersApp.authenticate({
                                        strategy: 'local',
                                        email: email.value,
                                        password: password.value
                                    })

                        .then((authResult) => {
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

                            })
                        
                        .catch(e => {
                                isLoginError.value = true;  
                                console.error('Authentication error', e);
                            })
                        
                        .finally(() => isLoading.value = false)
   
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