import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';
import './style.css';
import './style.scss';

import App from './App.vue';
import router from './routes';
import store from './store';
import '@stripe/stripe-js';

import { useGoogleMapAPI } from '@/composables/google-maps-api';

const app = createApp(App);

useGoogleMapAPI();
app.use(router);
app.use(store);
app.mount('#app');
