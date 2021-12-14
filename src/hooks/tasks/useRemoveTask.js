import {ref} from 'vue';
import axios from 'axios';
import store from '../../store';

export default function useAddTask(tasks) {

    const isRemoveError = ref(false);
    const isLoading = ref(false);

    const removeTask = async (id) =>  {
       
        isRemoveError.value = false;
        isLoading.value = true;             
        
        try {
            const authStr = 'Bearer '.concat(store.state.accessToken); 
            const response = await axios.delete(store.state.SERVER_URL + `/tasks/${id}`,
                    {   
                        headers: { 'Authorization': authStr },
                    });          
            
            tasks.value = tasks.value.filter(el => el._id != id);

        } catch(err) {
            isRemoveError.value = true;
        } finally {
            isLoading.value = false;
        }            
    }

    return {
        tasks,
        removeTask,
        isRemoveError,
        isLoading
    }

}