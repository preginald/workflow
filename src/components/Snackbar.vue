<template>
  <v-snackbar
      v-model="snack"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="setSnackbar(false)"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Snackbar",

  computed: {
     ...mapState(["snackbar"]),
    snack: {
      get: () => {
        return this.snackbar
      },
      set: () => {
        return this.snackbar
      }
    },
  },
  methods: {
    ...mapMutations(["setSnackbar"]),
  },
  data: () => ({
      text: 'My timeout is set to 2000.',
      timeout: 2000,
    }),

}; </script>
