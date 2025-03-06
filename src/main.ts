import { createApp } from 'vue'
import App from './App.vue'

localStorage.setItem('VITE_API_BASE_URL', 'http://127.0.0.1:5000');
localStorage.setItem('VITE_API_ACCESS_METHOD', 'GET');

createApp(App).mount('#app');
