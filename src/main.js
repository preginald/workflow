import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios"
import * as firebase from 'firebase'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCRikWNRskGXxWcvmk-Lj9mDV96TOLrSHg",
  authDomain: "workflow-a.firebaseapp.com",
  projectId: "workflow-a",
   storageBucket: "workflow-a.appspot.com",
   messagingSenderId: "612098345904",
   appId: "1:612098345904:web:a7df21a1193600d1eee475",
   measurementId: "G-HVBJCNKTDC"
 };
// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
