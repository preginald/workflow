<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Welcome to <span class="blue--text darken-2">doc</span><span class="red--text">Re</span><span class="blue--text">place</span></h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Why doReplace</v-card-title>
          <v-card-text>
            <p>I created docReplace because I wanted a strutured and dynamic way to document my devops processes.</p>
            <p>Dynamic because I can fill in some variable fields and the document will be updated accordingly.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>What it isn't</v-card-title>
          <v-card-text>
            <p>docReplace is not a "how to" wiki.</p>
          </v-card-text>
        </v-card>
        <h2></h2>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>What it is</v-card-title>
          <v-card-text>
            <p>docReplace is a repository of workflow documents.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Who is it for?</v-card-title>
          <v-card-text>
            <p>docReplace is someone who works in IT and runs shell commands or needs to write config files.</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Here are some examples</v-card-title>
          <v-card-text>
            <p><router-link to="/preginald/how-to-start-and-end-an-ssh-session">How to start and end an ssh session</router-link></p>
            <p><router-link to="/preginald/install-wordpress-on-apache2-virtualhost">Install Wordpress on Apache2 VirtualHost</router-link></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
  computed: {
  },
  data: () => ({
  }),
};
</script>
