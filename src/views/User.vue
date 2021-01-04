<template>
  <v-container>
    <Heading v-if="userDocs" />
    <v-row v-if="userDocs">
      <v-list v-for="doc in userDocs.docs" :key="doc.slug">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              ><a @click.prevent="loadUserDoc(doc)" :href="docLink(doc)">{{
                doc.title
              }}</a></v-list-item-title
            >
            <v-list-item-subtitle>{{ doc.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-row>
     <!-- <div @click="uetchUserDocs()">{{ docs }}</div> -->
  </v-container>
</template>

<script>
import { docsCollection } from  '../firebase'
import { mapState, mapMutations, mapActions } from "vuex"
import Heading from "../../src/components/users/Heading";

export default {
  computed: mapState(["userDocs"]),
  components: { Heading },
  data: () => ({
  }),
  mounted() {
    this.fetchUserDocs("preginald")
  },
  methods: {
    docLink(doc) {
      return this.$route.params.userName + "/" + doc.slug;
    },
    ...mapMutations(['setUserDocs']),
    ...mapActions(['loadUserDoc']),
    async fetchUserDocs(username = this.$route.params.userName) {
      const docs = await docsCollection.where('username', '==', username).get()

      let docsArray = []

      docs.forEach(doc => {
        let test = doc.data()
        test.id = doc.id
        docsArray.push(test)
      })

      let userDocs = {}
      userDocs.username = username
      userDocs.docs = docsArray
      this.setUserDocs(userDocs)
    }
  },
};
</script>
