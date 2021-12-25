import {ref} from 'vue';
import feathersApp from '../../socket/socket.js'

export default function useTryToRegister(isLoading) {

    const emailReg = ref('');
    const userNameReg = ref('');
    const passwordReg = ref('');
    const wrongDataReg = ref(false);
    const isRegError = ref(false);

    const tryToRegister = async () =>  {
       
        if (emailReg.value == '' || passwordReg.value =='') {
            wrongDataReg.value = true;

        } else {
            wrongDataReg.value = false;
            isRegError.value = false;
            isLoading.value = true;
            
            feathersApp.service("users").create({
                                                    name:     userNameReg.value || emailReg.value,
                                                    email:    emailReg.value,
                                                    password: passwordReg.value
                                                })

                        .then(result => {
                                            console.log(result); 
                                            emailReg.value    = '';
                                            userNameReg.value = '';
                                            passwordReg.value = '';                                       
                                        })

                        .catch(e => {
                                        isRegError.value = true;  
                                        console.error('Registration error', e);
                                    })

                        .finally(() => isLoading.value = false)            
                                
        }
    }

    return {
        emailReg,
        userNameReg,
        passwordReg,
        wrongDataReg,
        tryToRegister,
        isRegError
    }

}