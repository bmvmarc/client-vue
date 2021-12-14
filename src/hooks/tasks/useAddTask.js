import {ref} from 'vue';
import axios from 'axios';
import store from '../../store';

export default function useAddTask() {

    const isError = ref(false);
    const isLoading = ref(false);

    const addTask = async ({title, date}) =>  {
       
        isError.value = false;
        isLoading.value = true;             
        
        try {
            const authStr = 'Bearer '.concat(store.state.accessToken); 
            const response = await axios.post(store.state.SERVER_URL + '/tasks',
                    {                  
                        "date": date,
                        "title": title,
                        "user_id": store.state.userId,
                        "completed": false                    
                    },
                    {   
                        headers: { 'Authorization': authStr },
                    });          

        } catch(err) {
            isError.value = true;
        } finally {
            isLoading.value = false;
        }            
    }

    return {
        addTask,
        isError,
        isLoading
    }

}