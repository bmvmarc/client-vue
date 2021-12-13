<template>
    <div class="menu">
        <div
            @click="$router.push('/')">
            <img src="../../public/favicon.png" alt="logo"/>
        </div>
        <div class="menu-btns">
        
            <my-button
                class="menu-btn"
                @click="$router.push('/tasks')">
                To do
            </my-button>

            <my-button
                class="menu-btn"
                @click="$router.push('/about')">
                About
            </my-button>         

            <my-button
                class="menu-btn"
                @click="$router.push('/login')">
                {{  $store.state.isAuth ? $store.state.userName : 'My account'}}
            </my-button>

        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .menu {
        height: 50px;
        background-color: lightgray;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }
    .menu-btns {
        margin-left: auto;
    }
    .menu-btn {
        margin-left: 20px;
    }

</style>