<template>
    <div>
        <h1> Welcome to our wonderful site! </h1>

        <p v-if="$store.state.isAuth"> You are an authorized user!  </p>

        <p v-else>Please, log in!</p>

        <div v-show="$store.state.isAuth">

            <my-button
                    @click="$store.dispatch('getUsers')">
                        Load users</my-button>
                <ul 
                    name="users-list"
                    v-for="item in $store.getters.allUsersList"
                    :key="item.id">
                        <li class="user">
                            <div>{{ item.name }}</div>
                            <div>{{ item.id }}</div>
                        </li>
                </ul>

        </div>

    </div>
</template>

<script>
export default {
    
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