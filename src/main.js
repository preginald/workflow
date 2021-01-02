import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios"
import firebase from 'firebase/app'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
