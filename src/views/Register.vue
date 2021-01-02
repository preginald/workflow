<template>
  <v-container>
    <v-row> <v-col>
        <h2>Register</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-form @submit.prevent="userRegistration">
        <v-container>
          <v-row>
            <v-col v-if="error">
              {{ error.message }}
            </v-col>

          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                type="email"
                v-model="user.email"
                required
                label="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                type="password"
                v-model="user.password"
                label="password"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn type="submit">Register</v-btn>
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
//import * as firebase from "firebase/app"
import firebase from "firebase"

export default {
  name: "Register",
  components: {},
  data: () => ({
    user: {
      email: "",
      password: "",
      error: "",
      },
  }),
  methods: {
    userRegistration() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: this.user.name
          })
          .then(() => {
            this.$router.push('/login')
          });
      })
      .catch((error) => {
         alert(error.message);
      });
    }
  },
};
</script>
