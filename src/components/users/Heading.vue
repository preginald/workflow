<template>
  <v-row>
    <v-col>
      <h2 class="text-h6">
        {{ activeDoc.username }}
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
  methods: {},
};
</script>
