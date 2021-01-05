<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h5">Create a new document</h1>
        <p> A document consists of steps and tasks </p>
      </v-col>
    </v-row>
  <v-row v-if="userProfile">
    <v-col>
      <h2 class="text-h6">
        <router-link class="text-decoration-none" :to="userLink">{{
          userProfile.username
        }}</router-link>
        <template v-if="doc.title"> / {{ title }} </template >
      </h2>
    </v-col>
  </v-row>
    <v-row>
      <v-col>
        <v-text-field label="Title" v-model="title"></v-text-field>
        <v-text-field label="Slug" v-model="doc.slug"></v-text-field>
        <v-textarea label="Description" v-model="doc.description"></v-textarea>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title class="text-h7">Inputs</v-card-title>
        <v-card-text>
          <v-row>
          <v-col sm="3">
           <v-text-field label="label" v-model="input.label"></v-text-field>
         </v-col>
          <v-col sm="3">
            <v-text-field label="name" v-model="input.name"></v-text-field>
          </v-col>
          <v-col sm="3">
            <v-text-field label="value" v-model="input.value"></v-text-field>
          </v-col>
          <v-col sm="3">
          </v-col>
        </v-row>
        </v-card-text>
      <v-card-actions>
        <v-btn @click="addInput()">Add input</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mt-3">
      <v-card-text>
        <v-row>
          <v-col v-for="input in doc.inputs" :key="input.name" sm="3">
            <v-text-field
              :label="input.label"
              v-model="input.value"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

        <v-card v-for="(step, i) in doc.steps" v-bind:key="i">
          <v-card-title>{{stepNumber(i)}} {{ step.title}}</v-card-title>
          <v-card-text>
            <v-text-field label="Title" v-model="step.title"></v-text-field>
            <v-card-title class="text-h9">{{ step.tasks.length }} Tasks</v-card-title>
              <v-card v-for="(task, taskKey) in step.tasks" :key="taskKey">
                <v-card-text>
                  <v-row>
                <v-col md="6">
                  <v-text-field v-model="task.title"></v-text-field>
                </v-col>
                <v-col md="6">
                  <kbd> {{ taskInterpreter(task.title) }}</kbd>
                </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions> 
                  <v-btn v-if="taskKey == (step.tasks.length - 1)" @click="addTask(i)">Add task</v-btn>
                </v-card-actions>
              </v-card>
            <v-card-actions>
              <v-btn v-if="i == (doc.steps.length - 1)" @click="addStep()">Add step</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>

    <v-row>
      <v-col>
        <v-btn @click="saveNewDoc()">Save doc</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["userLink","userProfile"]),
  },
  name: "Home",
  components: { 
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['constructUserLink']),
    init(){
      this.constructUserLink()
    },
    saveNewDoc(){
      console.log(this.doc)
    },
    titleToSlug(){
      this.doc.slug = this.title.replace(/\s+/g, '-').toLowerCase();
    },
    stepNumber(i){
      return 'Step '  + parseInt(i + 1)  
    },
    addInput(){
      this.doc.inputs.push(this.input)
      this.input = {label: '', name: '', value: ''}
    },
    addStep(){
      this.doc.steps.push({title: '', tasks: [{title: ''}]})
    },
    addTask(i){
      this.doc.steps[i].tasks.push({title: ''})
    },
    taskInterpreter(task) {
      let n = task.search("<variable>");
      if (n == -1) {
        return task;
      } else {
        let open = task.split("<variable>")
        let n = task.split("</variable>");
        let newTask = "";
        if(open.length == n.length){
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
  },
  watch: {
    title(){
      this.titleToSlug()
    }
  },
  data: () => ({
    title: '',
      input: {
        label: '',
        name: '',
        value: '',
      },
    doc: {
      title: '',
      slug: '',
      description: '',
      steps: [{title: 'First step', tasks: [{title: ''}]}],
      inputs: [{label: 'dbname', name: 'dbname', value: 'wordpress'}],
    }
    // step: 1,
  }),
};
</script>
