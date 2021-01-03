<template>
  <v-app>
    
    <Navigation v-if="showNav"></Navigation>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import firebase from "firebase"
import { mapState } from "vuex";
import Navigation from "./components/Navigation"

export default {
  name: "App",
  components: { Navigation },

  computed: {
    ...mapState(["userProfile"]),
    showNav(){
      return Object.keys(this.userProfile).length > 1
    },   
  },

  data: () => ({
  }),
  methods: {
  }

};
</script>
