import {ref} from 'vue';
import axios from 'axios';
import store from '../../store';

export default function useTryToRegister(isLoading) {

    const emailReg = ref('');
    const userNameReg = ref('');
    const passwordReg = ref('');
    const wrongDataReg = ref(false);
 
    const regMessage = ref('');

    const isRegError = ref(false);

    const tryToRegister = async () =>  {
       
        if (emailReg.value == '' || passwordReg.value =='') {
            wrongDataReg.value = true;

        } else {
            wrongDataReg.value = false;
             try {
                isRegError.value = false;
                isLoading.value = true;
                
                const response = await axios.post(store.state.SERVER_URL + '/users',
                        {   
                            "name": userNameReg.value || emailReg.value,
                            "email": emailReg.value,
                            "password": passwordReg.value
                        });
                regMessage.value = 'User has been registered';
                setTimeout(() => {
                    regMessage.value = '';                  
                }, 5000);               

            } catch(err) {
                isRegError.value = true;
            } finally {
                isLoading.value = false;
            }            

            emailReg.value = '';
            userNameReg.value = '';
            passwordReg.value = '';                                
        }
    }

    return {
        emailReg,
        userNameReg,
        passwordReg,
        wrongDataReg,

        tryToRegister,

        isRegError,
        regMessage
    }

}