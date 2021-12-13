import {ref, onMounted } from 'vue';
import axios from 'axios';
import store from '../../store';

export default function useGetUsers() {
    
    const users = ref([]);
    const isLoading = ref(false);
    const isLoginError = ref(false);

    const getUsers = async () =>  {

        isLoading.value = true;
        isLoginError.value = false;

        try {
            const authStr = 'Bearer '.concat(store.state.accessToken); 
          
            const response = await axios.get(store.state.SERVER_URL + '/users', 
                                            { 'headers': { 
                                                    'Authorization': authStr 
                                                }
                                            });

            users.value = response.data.data;
  
        } catch(err) {
            console.log('Something went wrong...');
            isLoginError.value = true;
        } finally {
            isLoading.value = false;
        }   
    }

    onMounted(() => {
        if (store.state.isAuth) {
            getUsers();
        }
    });

    return {
        users, getUsers, isLoginError, isLoading
    }

}