<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>{{ doc.title }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                label="database name"
                v-model="doc.variables.databaseName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                label="database user"
                v-model="doc.variables.databaseUser"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                label="database password"
                v-model="doc.variables.databasePassword"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title
            >Create a MySQL database and user for WordPress</v-card-title
          >
          <v-row>
            <v-col>
              <v-card-text>mysql -u root -p</v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-text
                >CREATE DATABASE
                {{ this.doc.variables.databaseName }};</v-card-text
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-text
                >CREATE USER {{ doc.variables.databaseUser }} IDENTIFIED BY '{{
                  doc.variables.databasePassword
                }}';</v-card-text
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-text>
                <kbd>
                  GRANT ALL PRIVILEGES ON {{ doc.variables.databaseUser }}.* TO
                  {{ doc.variables.databaseUser }}@localhost;</kbd
                >
              </v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-text>GRANT ALL PRIVILEGES</v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-text>FLUSH PRIVILEGES</v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-text>exit</v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data: () => ({
    doc: {
      title: "Install Wordpress on Apache2 VirtualHost",
      variables: {
        databaseName: "wordpress",
        databaseUser: "user",
        databasePassword: "supersecret",
      },
      steps: [
        {
          order: 1,
          title: "Create a MySQL database and user for WordPress",
          tasks: [
            { order: 1, title: "mysql -u root -p" },
            {
              order: 2,
              title: "CREATE DATABASE <variable>databaseName</variable>;",
            },
            {
              order: 3,
              title: "CREATE USER username IDENTIFIED BY 'password';",
            },
            {
              order: 4,
              title:
                "GRANT ALL PRIVILEGES ON databasename.* TO username@localhost;",
            },
            { order: 5, title: "FLUSH PRIVILEGES;" },
            { order: 6, title: "exit" },
          ],
        },
        {
          order: 2,
          title: "Download WordPress",
        },
      ],
    },
  }),
  methods: {
    taskInterpreter(task) {
      let n = task.search("<variable>");
      if (n) {
        let o = task.search("</variable>");
        let variable = task.substring(n + 10, o);
        // o = task.substring(n, o);
        // n = variable + o;
        this.doc.variables.variable = variable;
        n = this.doc.variables.variable;
      }
      task = n;
      return task;
    },
  },
};
</script>