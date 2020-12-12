<template>
  <v-container>
    <v-row>
      <v-cols>
        <h2>{{ heading }}</h2>
      </v-cols>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {},
  data: () => ({
    heading: "Home",
  }),
};
</script>
