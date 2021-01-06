<template>
  <v-container>
    <Heading v-if="userDocs" />
  <v-card>
    <v-list-item two-line v-for="(doc, i) in userDocs" :key="i">
      <v-list-item-content>
        <v-list-item-title><a @click.prevent="loadUserDoc(doc)" :href="docLink(doc)">{{
                doc.title
              }}</a></v-list-item-title>
        <v-list-item-subtitle>{{doc.description}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
     <!-- <div @click="uetchUserDocs()">{{ docs }}</div> -->
  </v-container>
</template>

<script>
import { mapState,  mapActions } from "vuex"
import Heading from "../../src/components/users/Heading";

export default {
  computed: mapState(["userDocs"]),
  components: { Heading },
  data: () => ({
  }),
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['fetchUserDocs','loadUserDoc']),
    init(){
      this.fetchUserDocs(this.$route.params)
    },
    docLink(doc) {
      return this.$route.params.userName + "/" + doc.slug;
    },
  },
};
</script>
