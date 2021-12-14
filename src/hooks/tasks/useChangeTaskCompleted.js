
// export default function useChangeTaskCompleted(tasks) {

//     const changeTaskCompleted = (id) => {
//         const ind = tasks.value.findIndex(el => el.id === id);
//         tasks.value[ind].completed = !tasks.value[ind].completed;
//     }

//     return {
//         changeTaskCompleted
//     };

// }

import {ref} from 'vue';
import axios from 'axios';
import store from '../../store';

export default function useChangeTaskCompleted(tasks) {

    const isChangeError = ref(false);
    const isLoading = ref(false);

    const changeTaskCompleted = async (id) =>  {
       
        isChangeError.value = false;
        isLoading.value = true;             
        
        try {
            const index = tasks.value.findIndex(el => el._id === id);
            const taskChange = tasks.value[index];
            taskChange.completed = !taskChange.completed;

            const authStr = 'Bearer '.concat(store.state.accessToken); 
            const response = await axios.put(store.state.SERVER_URL + `/tasks/${id}`,
                    {                  
                        "date": taskChange.date,
                        "title": taskChange.title,
                        "user_id": store.state.userId, 
                        "completed": taskChange.completed                 
                    },            
                    {   
                        headers: { 'Authorization': authStr },
                    });          
            

        } catch(err) {
            isChangeError.value = true;
        } finally {
            isLoading.value = false;
        }            
    }

    return {
        tasks,
        changeTaskCompleted,
        isChangeError,
        isLoading
    }

}
