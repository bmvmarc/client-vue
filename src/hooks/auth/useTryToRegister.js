import {ref} from 'vue';

export default function useTryToRegister(isLoading) {

    const emailReg = ref('');
    const userNameReg = ref('');
    const passwordReg = ref('');
    const wrongDataReg = ref(false);
    const isRegError = ref(false);

    const tryToRegister = async (sock) =>  {
       
        if (emailReg.value == '' || passwordReg.value =='') {
            wrongDataReg.value = true;

        } else {
            wrongDataReg.value = false;
            isRegError.value = false;
            isLoading.value = true;
            
            sock.emit('create', 'users', {
                name: userNameReg.value || emailReg.value,
                email: emailReg.value,
                password: passwordReg.value
                }, (error, result) => {

                    if (error) {
                        console.log(error.message); 
                        isRegError.value = true;  
                    } else {
                        console.log(result); 
                        emailReg.value = '';
                        userNameReg.value = '';
                        passwordReg.value = '';                                       
                    }
                    isLoading.value = false;
            });           
                                
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