<template>
  <v-app>
    <v-app-bar app dense>
      <v-toolbar-title>Workflow</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/test">Test</v-btn>
      <v-spacer></v-spacer>
      <template v-if="user"> 
      <v-btn text @click="logOut">Sign out</v-btn>
      </template>
      <template v-else> 
      <v-btn text to="/login">Sign in</v-btn>
      <v-btn text to="/register">Sign up</v-btn>
      </template>
      <v-switch
        v-model="$vuetify.theme.dark"
        :label="$vuetify.theme.dark ? 'Dark' : 'Light'"
        hide-details
      ></v-switch>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase"

export default {
  name: "App",

  created(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });

  },

  components: {},

  data: () => ({
    user: null
  }),
  methods: {
    logOut() {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          this.$router.push('/login')
        })
      })
    }
  }

};
</script>
