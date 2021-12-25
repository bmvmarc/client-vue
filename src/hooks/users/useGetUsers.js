import { ref } from 'vue'
import feathersApp from '../../socket/socket.js'


export default function useGetUsers() {

    const users = ref([])
    const isLoading = ref(false)
    const loadErr = ref('')

    const getUsers = async () =>  {

        isLoading.value = true
        loadErr.value = ''

        feathersApp.service("users").find()

                    .then(result => {
                        console.log(result)
                        users.value = result.data  
                    })

                    .catch(e => {
                        loadErr.value = true;  
                        console.error('Loading error', e);
                    })

                    .finally(() => isLoading.value = false)          

    }

    return {
        users, getUsers, loadErr, isLoading
    }

}
