<template>
    <v-row v-if="Object.keys(activeDoc).length">
      <v-col>
        <h2 class="text-h6">
          <router-link class="text-decoration-none" :to="userLink">{{
            activeDoc.username
            }}</router-link>
          <span v-if="activeDoc.title"> / </span >
          <router-link class="text-decoration-none" :to="activeDoc.slug">{{
            activeDoc.title
            }}</router-link>
        </h2>
      </v-col>
    </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["activeDoc","userLink"]),
  },
  components: {},
  data: () => ({}),
  methods: {
  },
};
</script>
