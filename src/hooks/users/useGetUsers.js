import { ref } from 'vue'

export default function useGetUsers(sock) {

    const users = ref([])
    const isLoading = ref(false)
    const loadErr = ref('')

    const getUsers = async (sock) =>  {

        isLoading.value = true
        loadErr.value = ''

        sock.emit('find', 'users', (error, result) => {
                
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
