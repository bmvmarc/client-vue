import { ref } from 'vue'
import store from '../../store'
import feathersApp from '../../socket/socket.js'

export default function useChangeTask(tasks) {

    const isChangeError = ref(false)
    const isLoading = ref(false)

    const changeTask = async (taskData) =>  {
       
        isChangeError.value = false
        isLoading.value = true         

        const index = tasks.value.findIndex(el => el._id === taskData.id)
        const taskChange = tasks.value[index]
        taskChange.date = taskData.date
        taskChange.title = taskData.title
        taskChange.completed = taskData.completed


        feathersApp.service("tasks").update(taskData.id,
                                            {                  
                                                user_id:   store.state.userId, 
                                                date:      taskChange.date,
                                                title:     taskChange.title,
                                                completed: taskChange.completed                 
                                            })

                    .then(result => {
                        console.log(result)
                    })

                    .catch(e => {
                        isChangeError.value = true;  
                        console.error('Error', e);
                    })

                    .finally(() => isLoading.value = false)  
                 
    }

    return {
        tasks,
        changeTask,
        isChangeError,
        isLoading
    }

}
