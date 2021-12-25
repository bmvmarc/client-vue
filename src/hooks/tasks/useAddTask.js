import { ref } from 'vue'
import store from '../../store'
import feathersApp from '../../socket/socket.js'

export default function useAddTask() {

    const isError = ref(false)
    const isLoading = ref(false)

    const addTask = async ({title, date}) =>  {
       
        isError.value = false
        isLoading.value = true            
        
        feathersApp.service("tasks").create({                  
                                            date,
                                            title,
                                            user_id: store.state.userId,
                                            completed: false                    
                                        })

                    .then(result => {
                        console.log(result);                                      
                    })

                    .catch(e => {
                        isError.value = true;  
                        console.error('Error', e);
                    })

                    .finally(() => isLoading.value = false)            
       
    }

    return {
        addTask,
        isError,
        isLoading
    }
}