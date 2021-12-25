import { ref } from 'vue'
import store from '../../store'
import feathersApp from '../../socket/socket.js'


export default  function useLoadTasks() {

    const tasks = ref([])
    const tasksLoading = ref(false)
    const errorTasksLoading = ref(false)
    const curNumber = ref(0)
    const allTasksLoaded = ref(false)

    const fetchTasks = async () => {

        if (curNumber.value != 0) console.log('loading more tasks')

        tasksLoading.value = true
        errorTasksLoading.value = false
       
        feathersApp.service("tasks").find({
                                            query: {user_id: store.state.userId,
                                                    $skip: curNumber.value}
                                        })

                    .then(result => {
                        
                        console.log(result)
                        tasks.value = [...tasks.value, ...result.data]
                        curNumber.value = curNumber.value + 10
                        if (tasks.value.length >= result.total) {
                            allTasksLoaded.value = true
                        }       

                    })

                    .catch(e => {
                        errorTasksLoading.value = true;  
                        console.error('Loading error', e);
                    })

                    .finally(() => tasksLoading.value = false)  
  
    }

    return {
        tasks, fetchTasks, tasksLoading, errorTasksLoading, 
        allTasksLoaded, curNumber
    }

}