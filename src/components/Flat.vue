<template>
  <div>
    <v-row v-for="step in doc.steps" :key="step.order">
      <v-col>
        <h3>{{ step.title }}</h3>
        <v-row v-for="task in step.tasks" :key="task.order">
          <v-col>
            <kbd> {{ taskInterpreter(task.title) }}</kbd>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["doc"]),
  components: {},
  data: () => ({
    step: 1,
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
