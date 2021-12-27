<template>
    <div>
        <my-button
            v-focus
            @click="$store.dispatch('logOut')">
                Log out
        </my-button>

        

        <form  
            class="form-profile"
            @submit.prevent="onSubmitFile">

            <h3> You can upload files </h3>
            
            <file-upload
                required
                v-model="file">
            </file-upload> 

            <my-button
                type="submit">
                    Load
            </my-button>

        </form>    

        <ul class="file-list"
            v-show="$store.state.isAuth">
            <li v-for="i in files"
                :key="i._id"> 

                <a :href="i.uri.uri"
                    :download="i.fileName"> 
                    {{i.fileName}} 
                </a>

            </li>       
        </ul>

        <div v-show="loadErr">
            <h3> {{ loadErr }} </h3>
        </div>

    </div>
</template>

<script>
import useFiles from '../hooks/userFiles/useFiles.js'

export default {
    name: "profile",

    data() {
        return {
            file: null
        }
    },

    methods: {
        
        async onSubmitFile() {

            const toBase64 = file => new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = error => reject(error)
            });

            const result = await toBase64(this.file).catch(e => Error(e));
            if (result instanceof Error) {
                console.log('Error: ', result.message)
                return
            }

            this.$feathersApp.service("uploads").create({
                                        uri: result,
                                        name:  this.file.name
                                    })
                        .then((response) => {
                                console.log('Server responded with: ', response)
                            })                      
                        .catch(e => { 
                                console.error('Upload error', e)
                            })
        }
        
    },

    setup(props) {
        const { getFiles, files, loadErr } = useFiles();
        return { getFiles, files, loadErr };

    }
}
</script>

<style scoped>
    .form-profile {
        display: grid;
        margin-top: 15px;
    }
    .file-list {
        background-color: #00FA9A;
        margin-top: 15px;

    }
</style>