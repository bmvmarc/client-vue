import {ref} from 'vue';
import axios from 'axios';
import store from '../../store';

export default function useChangeTask(tasks) {

    const isChangeError = ref(false);
    const isLoading = ref(false);

    const changeTask = async (taskData) =>  {
       
        console.log(taskData);

        isChangeError.value = false;
        isLoading.value = true;             
        
        try {
            const index = tasks.value.findIndex(el => el._id === taskData.id);
            const taskChange = tasks.value[index];
            taskChange.date = taskData.date;
            taskChange.title = taskData.title;
            taskChange.completed = taskData.completed;

            const authStr = 'Bearer '.concat(store.state.accessToken); 
            const response = await axios.put(store.state.SERVER_URL + `/tasks/${taskData.id}`,
                    {                  
                        "user_id":   store.state.userId, 
                        "date":      taskChange.date,
                        "title":     taskChange.title,
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
        changeTask,
        isChangeError,
        isLoading
    }

}
