<template>
  <v-container>
    <Heading />
    <v-row>
      <v-list v-for="doc in users[0].docs" :key="doc.slug">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              ><router-link :to="docLink(doc)">{{
                doc.title
              }}</router-link></v-list-item-title
            >
            <v-list-item-subtitle>{{ doc.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Heading from "@/components/users/Heading";

export default {
  computed: mapState(["users"]),
  components: { Heading },
  methods: {
    docLink(doc) {
      return this.users[0].name + "/" + doc.slug;
    },
  },
};
</script>
