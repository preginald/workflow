<template>
    <v-app-bar app dense>
      <v-toolbar-title>
        <v-btn text to="/">Workflow</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <template v-if="userProfile"> 
        <v-btn icon @click="toggleEditDoc()" v-if="isOwner && this.$route.name == 'UserDoc'"><v-icon>mdi-pencil-outline</v-icon></v-btn>
        <v-btn icon to="/new"><v-icon>mdi-plus</v-icon></v-btn>
        <v-btn text @click="logout()">Sign out</v-btn>
      </template>
      <template v-else> 
        <v-btn text to="/login">Sign in</v-btn>
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
     ...mapState(["userProfile","isOwner"]),
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
