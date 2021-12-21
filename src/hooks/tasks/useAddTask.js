import { ref } from 'vue'
import store from '../../store'

export default function useAddTask() {

    const isError = ref(false)
    const isLoading = ref(false)

    const addTask = async ({title, date}, sock) =>  {
       
        isError.value = false
        isLoading.value = true            
        
        sock.emit('create', 'tasks', 
                {                  
                    date,
                    title,
                    user_id: store.state.userId,
                    completed: false                    
                },
                (error, result) => {
            
                    if (error) {

                        isError.value = true
                        console.log('Something went wrong...')

                    } else {
                        console.log(result)  
                    }
                    isLoading.value = false
                })           
    }

    return {
        addTask,
        isError,
        isLoading
    }
}