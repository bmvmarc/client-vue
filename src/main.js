import { createApp } from 'vue';
import App from './App.vue';
import components from './components/UI';
import router from './router/router';
import directives from './directives';
import store from './store'

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});

directives.forEach(directive => {
    app.directive(directive.name, directive);
});

app
    .use(router)
    .use(store)
    .mount('#app');


// Clear after module reload
window.addEventListener('message', e => {
    if ('production' !== process.env.NODE_ENV) {
        console.clear();
    }
}); 