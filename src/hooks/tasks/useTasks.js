import {ref, onMounted} from 'vue';
import axios from 'axios';
import store from '../../store';

export default  function useTasks() {

    const tasks = ref([]);

    const tasksLoading = ref(false);
    const errorTasksLoading = ref(false);
    
    const curNumber = ref(0);
    const allTasksLoaded = ref(false);


    const fetchTasks = async () => {

        tasksLoading.value = true;
        errorTasksLoading.value = false;

        try {
            const authStr = 'Bearer '.concat(store.state.accessToken); 

            const response = await axios.get(
                store.state.SERVER_URL + '/tasks', 
                {   
                    'headers': { 'Authorization': authStr },
                    'params': {                  
                        user_id: store.state.userId,
                        $skip: curNumber.value                
                    }
                });

            tasks.value = [...tasks.value, ...response.data.data];
            
           
            curNumber.value = curNumber.value + 10;

            if (tasks.value.length == response.data.total) {
                allTasksLoaded.value = true;
                console.log('All tasks are loaded');
            }

        }
        catch(err) {
            errorTasksLoading.value = true;     
            console.log('Something went wrong...');
        } finally {
            tasksLoading.value = false;
        }
    }

    return {
        tasks, fetchTasks, tasksLoading, errorTasksLoading, 
        allTasksLoaded, curNumber
    }

}
