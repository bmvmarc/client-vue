import { ref } from 'vue'
import socket from '../../socket/socket.js'

export default function useAddTask(tasks) {

    const isRemoveError = ref(false)
    const isLoading = ref(false)

    const removeTask = async (id) =>  {
       
        isRemoveError.value = false
        isLoading.value = true             
 
        socket.emit('remove', 'tasks', id,
                    (error) => {
                        if (error) {
                            isRemoveError.value = true
                            console.log(error)
                        } else {
                            tasks.value = tasks.value.filter(el => el._id != id)
                        }
                        isLoading.value = false
                    })                    
    }

    return {
        tasks,
        removeTask,
        isRemoveError,
        isLoading
    }

}