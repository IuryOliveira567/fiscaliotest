import { createApp } from 'vue'
import App from './App.vue'

localStorage.setItem('REMOTE_API_URL', 'http://127.0.0.1:5000/notasfiscais');

createApp(App).mount('#app');
