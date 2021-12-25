import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI'
import router from './router/router'
import directives from './directives'
import store from './store'
import feathersApp from './socket/socket.js'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app.config.globalProperties.$feathersApp = feathersApp

app
    .use(router)
    .use(store)
    .mount('#app')
