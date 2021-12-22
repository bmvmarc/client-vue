import { ref } from 'vue'
import socket from '../../socket/socket.js'


export default function useGetUsers() {

    const users = ref([])
    const isLoading = ref(false)
    const loadErr = ref('')

    const getUsers = async () =>  {

        isLoading.value = true
        loadErr.value = ''

        socket.emit('find', 'users', (error, result) => {
                
            if (error) {
                loadErr.value = error.message
            } else {
                users.value = result.data           
            }

            isLoading.value = false
        })    
    }

    return {
        users, getUsers, loadErr, isLoading
    }

}
