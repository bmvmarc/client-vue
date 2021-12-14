import {ref, onMounted} from 'vue';
import axios from 'axios';
import store from '../../store';

export default  function useTasks() {

    const tasks = ref([]);

    const tasksLoading = ref(false);
    const errorTasksLoading = ref(false);


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
                        user_id: store.state.userId                    
                    }
                });

            tasks.value = response.data.data;

            // if (tasks.value.length == response.headers['x-total-count']) {
            // }

        }
        catch(err) {
            errorTasksLoading.value = true;     
            console.log('Something went wrong...');
        } finally {
            tasksLoading.value = false;
        }
    }
    
    onMounted(() => {
        if (store.state.isAuth) {
            fetchTasks();
        }
    });

    return {
        tasks, fetchTasks, tasksLoading, errorTasksLoading 
    }

}
