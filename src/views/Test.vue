<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 @click="getTheValue('databaseName')">{{ doc.title }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-form>
        <v-container>
          <v-row>
            <v-col
              v-for="input in doc.inputs"
              :key="input.name"
              cols="12"
              md="3"
            >
              <v-text-field
                :label="input.label"
                v-model="input.value"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-row>
    <v-stepper v-model="step">
      <v-stepper-header>
        <template v-for="step in doc.steps">
          <v-stepper-step :key="step.order" :step="step.order" editable>
            {{ step.title }}
          </v-stepper-step>
          <v-divider
            v-if="step.order !== doc.steps.length"
            :key="step.title"
          ></v-divider>
        </template>
      </v-stepper-header>
      <v-stepper-items v-for="step in doc.steps" :key="step.order">
        <v-stepper-content :step="step.order">
          <v-row>
            <v-col>
              <h3>{{ step.title }}</h3>
            </v-col>
          </v-row>
          <v-row v-for="task in step.tasks" :key="task.order">
            <v-col>
              <kbd> {{ taskInterpreter(task.title) }}</kbd>
            </v-col>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data: () => ({
    step: 1,
    doc: {
      title: "Install Wordpress on Apache2 VirtualHost",
      inputs: [
        { name: "databaseName", label: "Database name", value: "wordpress" },
        { name: "databaseUser", label: "Database user", value: "wordpress" },
        {
          name: "databasePassword",
          label: "Database password",
          value: "supersecret",
        },
        {
          name: "domainName",
          label: "Domain name",
          value: "wordpress.com",
        },
        {
          name: "subdomain",
          label: "Sub domain",
          value: "www",
        },
      ],
      steps: [
        {
          order: 1,
          title: "Create a database",
          tasks: [
            { order: 1, title: "mysql -u root -p" },
            {
              order: 2,
              title: "CREATE DATABASE <variable>databaseName</variable>;",
            },
            {
              order: 3,
              title:
                "CREATE USER <variable>databaseUser</variable> IDENTIFIED BY '<variable>databasePassword</variable>';",
            },
            {
              order: 4,
              title:
                "GRANT ALL PRIVILEGES ON <variable>databaseName</variable>.* TO <variable>databaseUser</variable>@localhost;",
            },
            { order: 5, title: "FLUSH PRIVILEGES;" },
            { order: 6, title: "exit" },
          ],
        },
        {
          order: 2,
          title: "Download WordPress",
          tasks: [
            { order: 1, title: "cd ~" },
            {
              order: 2,
              title: "rm -rf wordpress",
            },
            {
              order: 3,
              title: "wget http://wordpress.org/latest.tar.gz",
            },
            {
              order: 4,
              title: "tar xzvf latest.tar.gz",
            },
          ],
        },
        {
          order: 3,
          title: "Configure WordPress",
          tasks: [
            { order: 1, title: "cd ~/wordpress" },
            {
              order: 2,
              title: "cp wp-config-sample.php wp-config.php",
            },
            {
              order: 3,
              title: "vim wp-config.php",
            },
            {
              order: 4,
              title: "define('DB_NAME', '<variable>databaseName</variable>’);",
            },
            {
              order: 5,
              title: "define('DB_USER', '<variable>databaseUser</variable>');",
            },
            {
              order: 6,
              title:
                "define('DB_PASSWORD', '<variable>databasePassword</variable>');",
            },
            {
              order: 7,
              title: "define('FS_METHOD','direct');",
            },
          ],
        },
        {
          order: 4,
          title: "Copy files",
          tasks: [
            { order: 1, title: "cd /var/www" },
            {
              order: 2,
              title: "sudo mkdir <variable>domainName</variable>",
            },
            {
              order: 3,
              title:
                "sudo rsync -avP ~/wordpress/ /var/www/<variable>domainName</variable>/",
            },
            {
              order: 4,
              title: "cd /var/www/<variable>domainName</variable>",
            },
            {
              order: 5,
              title:
                "sudo mkdir /var/www/<variable>domainName</variable>/wp-content/uploads",
            },
            {
              order: 6,
              title: "sudo chown -R www-data:www-data *",
            },
          ],
        },
        {
          order: 5,
          title: "Configure Apache",
          tasks: [
            { order: 1, title: "cd /etc/apache2/sites-available" },
            {
              order: 2,
              title:
                "sudo cp 000-default.conf <variable>domainName</variable>.conf",
            },
            {
              order: 3,
              title: "sudo vim <variable>domainName</variable>.conf",
            },
            {
              order: 4,
              title: "ServerName <variable>domainName</variable>",
            },
            {
              order: 5,
              title:
                "ServerAlias <variable>subdomain</variable>.<variable>domainName</variable>",
            },
            {
              order: 6,
              title: "sudo chown -R www-data:www-data *",
            },
          ],
        },
      ],
    },
  }),
  methods: {
    taskInterpreter(task) {
      let n = task.search("<variable>");
      if (n == -1) {
        return task;
      } else {
        let n = task.split("</variable>");
        let newTask = "";
        n.forEach((e) => {
          let x = e.search("<variable>");
          if (x == -1) {
            newTask += e;
          } else {
            let variable = this.getVariable(e);
            let value = this.getValue(variable);
            newTask += e.replace("<variable>" + variable, value);
          }
        });
        return newTask;
      }
    },
    getVariable(task) {
      let n = task.search("<variable>");
      if (n > -1) {
        let variable = task.substring(n + 10, task.length);
        return variable;
      }
    },
    getValue(name) {
      let n = this.doc.inputs.find((e) => e.name == name);
      return n.value;
    },
    taskInterpreterBackup(task) {
      let n = task.search("<variable>");
      if (n == -1) {
        return task;
      } else {
        let variable = this.getVariable(task);
        let value = this.getValue(variable);
        return task.replace("<variable>" + n + "</variable>", value);
      }
    },
  },
};
</script>