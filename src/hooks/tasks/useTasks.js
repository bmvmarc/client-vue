import { ref } from 'vue'
import store from '../../store'

export default  function useTasks() {

    const tasks = ref([])
    const tasksLoading = ref(false)
    const errorTasksLoading = ref(false)
    const curNumber = ref(0)
    const allTasksLoaded = ref(false)

    const fetchTasks = async (sock) => {

        tasksLoading.value = true
        errorTasksLoading.value = false
       
        sock.emit('find', 'tasks', 
                { 
                    user_id: store.state.userId, 
                    $skip: curNumber.value 
                },
                (error, result) => {
            
                    if (error) {

                        errorTasksLoading.value = true
                        console.log(error)

                    } else {
                        console.log(result)
                        tasks.value = [...tasks.value, ...result.data]
                        curNumber.value = curNumber.value + 10
                        if (tasks.value.length == result.total) {
                            allTasksLoaded.value = true
                            console.log('All tasks are loaded')
                        }     

                    }

                    tasksLoading.value = false
                }) 
    }

    return {
        tasks, fetchTasks, tasksLoading, errorTasksLoading, 
        allTasksLoaded, curNumber
    }

}