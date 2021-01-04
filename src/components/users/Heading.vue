<template>
  <v-row>
    <v-col>
      <h2 class="text-h6">
        {{ userDocs.username }}
      </h2>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["userDocs"]),
  components: {},
  data: () => ({}),
  methods: {},
};
</script>
