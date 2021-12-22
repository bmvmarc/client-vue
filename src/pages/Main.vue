<template>
    <div>
        <h1> Users </h1>

        <p v-show="!$store.state.isAuth">Please, log in!</p>

        <div v-show="$store.state.isAuth">
                <my-button @click="load">Load users</my-button>
                <ul 
                    name="users-list"
                    v-for="item in users"
                    :key="item._id">
                        <li class="user">
                            <div>{{ item.name + ' ' + item.email}}</div>
                            <div>{{ item._id }}</div>
                        </li>
                </ul>

        </div>

        <div v-show="loadErr">
            <h3> {{ loadErr }} </h3>
        </div>

    </div>
</template>

<script>
import useGetUsers from '../hooks/users/useGetUsers.js';

export default {
    setup(props) {
        const { getUsers, users, loadErr } = useGetUsers();
        return { getUsers, users, loadErr };
    },

    methods: {
        load() {
            if (this.$store.state.isAuth) {
                this.getUsers();
            }
        },
        receiveMessage (payload) {
            console.log('need to add a new user', payload)
            this.users.push(payload)
        }
    },

    created() {
        this.$socket.on('users created', this.receiveMessage)
    },
  
    destroyed () {
        this.$socket.removeAllListeners('users created')
    }

}
</script>

<style scoped>
    p {
        margin: 20px 0;
    }
    .user {
        padding: 15px;
        border: solid 2px teal;
        border-radius: 5px;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: lightblue;
    }    
</style>