<template>
    <v-app-bar app dense>
      <template v-if="nav"> 
        <v-btn icon :to="userLink"><v-icon>mdi-home-account</v-icon></v-btn>
      </template>
      <template v-else>
        <v-btn icon to="/"><v-icon>mdi-home</v-icon></v-btn>
      </template>

      <v-spacer></v-spacer>
      <template v-if="nav"> 
        <v-btn icon @click="toggleEditDoc()" v-if="isOwner && this.$route.name == 'UserDoc'"><v-icon>mdi-pencil-outline</v-icon></v-btn>
        <v-btn icon to="/new"><v-icon>mdi-plus</v-icon></v-btn>
        <v-btn icon @click="logout()"><v-icon>mdi-logout-variant</v-icon></v-btn>
      </template>
      <template v-else> 
        <v-btn icon to="/login"><v-icon>mdi-login-variant</v-icon></v-btn>
        <!-- <v-btn text to="/register">Sign up</v-btn> -->
      </template>
      <v-switch
        v-model="$vuetify.theme.dark"
        :label="$vuetify.theme.dark ? 'Dark' : 'Light'"
        hide-details
      ></v-switch>
    </v-app-bar>

</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Navigation",

  computed: {
     ...mapState(["nav","userProfile","isOwner","userLink"]),
  },
  methods: {
    ...mapActions(["toggleEditDoc","logout"]),
    init(){
      console.log()
    },
  },
  mounted() {
    this.init()
  }

}; </script>
