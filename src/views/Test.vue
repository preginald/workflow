<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 @click="getTheValue('databaseName')">{{ doc.title }}</h2>
      </v-col>
    </v-row>
    <Form />
    <Stepper />
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import Form from "@/components/Form";
import Stepper from "@/components/Stepper";

export default {
  computed: mapState(["doc"]),
  name: "Home",
  components: { Form, Stepper },
  data: () => ({
    step: 1,
  }),
};
</script>