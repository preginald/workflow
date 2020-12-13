<template>
  <v-container>
    <Heading />
    <Form />
    <Stepper />
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import Heading from "@/components/documents/Heading";
import Form from "@/components/Form";
import Stepper from "@/components/Stepper";

export default {
  computed: mapState(["doc"]),
  name: "Home",
  components: { Heading, Form, Stepper },
  data: () => ({
    step: 1,
  }),
};
</script>