<template>
  <v-container>
    <v-row> <v-col>
        <h2>Login</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-form @submit.prevent="userLogin">
        <v-container>
          <v-row>
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
              <v-btn type="submit">Sign in</v-btn>
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
import firebase from "firebase"

export default {
  name: "Login",
  components: {},
  data: () => ({
    user: {
      email: "",
      password: "",
      },
  }),
  methods: {
    userLogin() {
      firebase
      .auth()
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
          this.$router.push('/home')
      })
      .catch((error) => {
          alert(error.message);
      });
    }
  },
};
</script>
