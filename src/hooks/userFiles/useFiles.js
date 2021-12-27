import { ref, onMounted } from 'vue'
import feathersApp from '../../socket/socket.js'
import store from '../../store/index.js'

export default function useFiles() {

    const files = ref([])
    const isLoading = ref(false)
    const loadErr = ref('')
    const URI = ref(null)

    const getFiles = async () =>  {

        isLoading.value = true
        loadErr.value = ''

        feathersApp.service("user-files").find({
                            query: {userId: store.state.userId}
                        })

                    .then(result => {
                        console.log(result)
                        files.value = result.data  



                    })

                    .catch(e => {
                        loadErr.value = e;  
                        console.error('Loading error', e);
                    })

                    .finally(() => isLoading.value = false)          

    }

    onMounted(() => {
        if (store.state.isAuth) {
            getFiles()
        }
    })

    return {
        files, getFiles, loadErr, isLoading
    }

}
