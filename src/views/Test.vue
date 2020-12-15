<template>
  <v-container>
    <Heading />
    <Form />
    <Flat />
    <Stepper />
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import Heading from "@/components/documents/Heading";
import Form from "@/components/Form";
import Stepper from "@/components/Stepper";
import Flat from "@/components/Flat";

export default {
  computed: mapState(["doc"]),
  name: "Home",
  components: { Heading, Form, Stepper, Flat },
  data: () => ({
    // step: 1,
  }),
};
</script>