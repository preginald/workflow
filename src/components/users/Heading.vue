<template>
  <v-row>
    <v-col>
      <h2 class="text-h6">
        {{ users[0].name }}
      </h2>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["users"]),
  components: {},
  data: () => ({}),
  methods: {},
};
</script>