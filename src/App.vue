<template>
    <menu-bar></menu-bar>
    <div class="app">
        <router-view></router-view>
    </div>
</template>


<script>
import MenuBar from './components/Menu.vue';

export default {
    components: {
        MenuBar
    },

    sockets: {
        connect() {
            console.log('socket connected (app.vue)')

            // if (this.$store.state.isAuth) {
               
            //     console.log('re-auth')

            //     this.$socket.emit('create', 'authentication', {
            //             strategy: 'jwt',
            //             accessToken: this.$store.state.accessToken
            //         }, (error, authResult) => {

            //                 if (error) {
            //                     console.log(error.message); 
            //                 } else {
            //                     console.log(authResult)                   
            //                 }
            //             })
            // }
        },
        create(data) {
            console.log('this method was fired by the socket server. eg: io.emit("create", data)')
        },
        authenticate(data) {
            console.log('authenticated: ' , data)
        }
    }  
}
</script>


<style>
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .app {
        padding: 20px;
    }

</style>