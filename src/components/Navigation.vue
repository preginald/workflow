<template>
    <v-app-bar app dense>
      <template v-if="Object.keys(userProfile).length"> 
        <v-btn text :to="userLink"><v-icon>mdi-home-account</v-icon></v-btn>
      </template>
      <template v-else>
        <v-btn text to="/"><v-icon>mdi-home</v-icon></v-btn>
      </template>

      <v-spacer></v-spacer>
      <template v-if="Object.keys(userProfile).length"> 
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
     ...mapState(["userProfile","isOwner","userLink"]),
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
