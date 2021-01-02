<template>
  <v-container>
    <v-row> <v-col>
        <h2>Register</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-row>
    <v-row>
      <v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Register",
  components: {},
  data: () => ({
  }),
  methods: {
    },
};
</script>
