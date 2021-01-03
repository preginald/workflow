<template>
    <v-app-bar app dense>
      <v-toolbar-title>Workflow</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/test">Test</v-btn>
      <v-spacer></v-spacer>
      <template v-if="userProfile"> 
      <v-btn text @click="logout()">Sign out</v-btn>
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

</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Navigation",

  computed: {
     ...mapState(["userProfile"])
  },
  methods: {
    ...mapActions(["logout"]),
  }

};
</script>
