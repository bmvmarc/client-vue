import {ref} from 'vue';
import axios from 'axios';
import store from '../../store';

export default function useAddTask() {

    const title = ref('');
    const date = ref('');
    const wrongData = ref(false);
    const message = ref('');
    const isError = ref(false);
    const isLoading = ref(false);

    const addTask = async () =>  {
       
        if (title.value == '') {
            wrongData.value = true;

        } else {
            wrongData.value = false;
            isError.value = false;
            isLoading.value = true;             
            
            try {
                const authStr = 'Bearer '.concat(store.state.accessToken); 
                const response = await axios.post(store.state.SERVER_URL + '/tasks',
                        {                  
                            "date": date.value,
                            "title": title.value,
                            "user_id": store.state.userId                    
                        },
                        {   
                            headers: { 'Authorization': authStr },
                        });
                message.value = 'The task has been created';
                setTimeout(() => {
                    message.value = '';                  
                }, 5000);               

            } catch(err) {
                isError.value = true;
            } finally {
                isLoading.value = false;
            }            

            title.value = '';
            date.value = '';
        }
    }

    return {
        title,
        date,
        wrongData,
        addTask,
        isError,
        message,
        isLoading
    }

}