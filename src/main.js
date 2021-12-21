import { createApp } from 'vue';
import App from './App.vue';
import components from './components/UI';
import router from './router/router';
import directives from './directives';
import store from './store'
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});

directives.forEach(directive => {
    app.directive(directive.name, directive);
});

app.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3030'),
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }

}));

app
    .use(router)
    .use(store)
    .mount('#app');

