import { createApp } from 'vue'
import App from './App.vue'

localStorage.setItem('REMOTE_API_URL', 'http://127.0.0.1:5000/notasfiscais');

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

createApp(App).mount('#app');
