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