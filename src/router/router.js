import { createWebHistory, createRouter } from 'vue-router';
import Main from '../pages/Main.vue';
import About from '../pages/About.vue';
import Login from '../pages/Login.vue'


const routes = [
    {
        path: '/',
        component: Main
    },

    {
        path: '/login',
        component: Login
    },

    {
        path: '/about',
        component: About
    }
]

const router = createRouter({
    routes,
    history: createWebHistory('/')
});

export default router;