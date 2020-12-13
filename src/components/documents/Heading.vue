<template>
  <v-row>
    <v-col>
      <h2 class="text-h6">
        <router-link class="text-decoration-none" :to="docLink(doc)">{{
          doc.username
        }}</router-link>
        /
        {{ doc.title }}
      </h2>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["doc"]),
  components: {},
  data: () => ({}),
  methods: {
    docLink(doc) {
      return "/" + doc.username;
    },
  },
};
</script>