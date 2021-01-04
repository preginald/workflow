<template>
  <v-app>
    
    <Navigation></Navigation>

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
  },

  data: () => ({
  }),
  methods: {
  }

};
</script>
