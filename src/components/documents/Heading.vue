<template>
  <v-row>
    <v-col>
      <h2 class="text-h6">
        <router-link class="text-decoration-none" :to="docLink()">{{
          activeDoc.username
        }}</router-link>
        /
        {{ activeDoc.title }}
      </h2>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["activeDoc"]),
  components: {},
  data: () => ({}),
  methods: {
    docLink() {
      return "/" + this.activeDoc.username;
    },
  },
};
</script>
