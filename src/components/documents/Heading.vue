<template>
  <v-row>
    <v-col>
      <h2 class="text-h6">
        <router-link class="text-decoration-none" :to="userLink(activeDoc.username)">{{
          activeDoc.username
        }}</router-link>
        /
        {{ activeDoc.title }}
      </h2>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState(["activeDoc"]),
  components: {},
  data: () => ({}),
  methods: {
    ...mapActions(['userLink']),
  },
};
</script>
