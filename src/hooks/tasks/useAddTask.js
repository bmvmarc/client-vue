import { ref } from 'vue'
import store from '../../store'
import socket from '../../socket/socket.js'

export default function useAddTask() {

    const isError = ref(false)
    const isLoading = ref(false)

    const addTask = async ({title, date}) =>  {
       
        isError.value = false
        isLoading.value = true            
        
        socket.emit('create', 'tasks', 
                {                  
                    date,
                    title,
                    user_id: store.state.userId,
                    completed: false                    
                },
                (error, result) => {
                    // console.log('add a task result:', result)
                    if (error) {

                        isError.value = true
                        console.log('Something went wrong...')

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