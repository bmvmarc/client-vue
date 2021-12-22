import { ref } from 'vue'
import store from '../../store'
import socket from '../../socket/socket.js'

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

        socket.emit('update', 'tasks', taskData.id,
                {                  
                    user_id:   store.state.userId, 
                    date:      taskChange.date,
                    title:     taskChange.title,
                    completed: taskChange.completed                 
                },
                (error) => {
            
                    if (error) {
                        isChangeError.value = true
                        console.log(error)
                    } 
                    isLoading.value = false
                })                    
    }

    return {
        tasks,
        changeTask,
        isChangeError,
        isLoading
    }

}
