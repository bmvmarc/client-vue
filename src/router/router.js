import { createWebHistory, createRouter } from 'vue-router';
import Main from '../pages/Main.vue';
import About from '../pages/About.vue';
import Login from '../pages/Login.vue'
import TaskPage from '../pages/TaskPage.vue'

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
    },

    {
        path: '/tasks',
        component: TaskPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory('/')
});

export default router;