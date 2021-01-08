<template>
  <v-container>
    <Heading />
  <v-card>
    <v-list dense>
      <v-subheader>Subheader</v-subheader>
      <v-list-item-group v-model="selected">
        <v-list-item two-line v-for="(doc, i) in userDocs" :key="i">
          <v-list-item-icon>
            <v-icon v-text="status(doc.status)"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <a @click.prevent="loadUserDoc(doc)" :href="docLink(doc)">{{
                doc.title
              }}</a>
            </v-list-item-title>
            <v-list-item-subtitle>{{doc.description}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
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
    selected: '',
  }),
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['fetchUserDocs','loadUserDoc']),
    init(){
      this.fetchUserDocs(this.$route.params)
    },
    status(status) {
      let icon = ""
      switch(status){
        case 'publish':
          icon = "mdi-file-outline"
        break;
        case 'draft':
          icon = "mdi-file-edit-outline"
        break;
        case 'delete':
          icon = "mdi-file-remove-outline"
        break;
      }
      return icon
    },
    docLink(doc) {
      return this.$route.params.userName + "/" + doc.slug;
    },
  },
};
</script>
