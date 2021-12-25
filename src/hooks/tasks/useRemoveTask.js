import { ref } from 'vue'
import feathersApp from '../../socket/socket.js'

export default function useAddTask(tasks) {

    const isRemoveError = ref(false)
    const isLoading = ref(false)

    const removeTask = async (id) =>  {
       
        isRemoveError.value = false
        isLoading.value = true              

        feathersApp.service("tasks").remove(id)

                    .then(result => {
                        console.log(result)
                        tasks.value = tasks.value.filter(el => el._id != id)
                    })

                    .catch(e => {
                        isRemoveError.value = true;  
                        console.error('Remove error', e);
                    })

                    .finally(() => isLoading.value = false) 

                  
    }

    return {
        tasks,
        removeTask,
        isRemoveError,
        isLoading
    }

}