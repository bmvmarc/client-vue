import {ref} from 'vue';
import axios from 'axios';
import store from '../store';

export default function useGetUsers() {
    
    const users = ref([]);
    const isLoading = ref(false);
    const isLoginError = ref(false);

    const getUsers = async () =>  {

        isLoading.value = true;
        isLoginError.value = false;

        try {
            const authStr = 'Bearer '.concat(store.state.accessToken); 
          
            const response = await axios.get('http://localhost:3030/users', 
                                            { 'headers': { 'Authorization': authStr }});

            users.value = response.data.data;
            console.log(response.data.data);
  
        } catch(err) {
            console.log('Something went wrong...');
            isLoginError.value = true;
        } finally {
            isLoading.value = false;
        }   
    }

    return {
        users, getUsers, isLoginError, isLoading
    }

}