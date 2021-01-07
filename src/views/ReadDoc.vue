<template>
  <v-container>
    <v-row v-if="Object.keys(activeDoc).length">
      <v-col>
        <h2 class="text-h6">
          <router-link class="text-decoration-none" :to="userLink">{{
            activeDoc.username
            }}</router-link>
          <span v-if="activeDoc.title"> / </span >
          <router-link class="text-decoration-none" :to="activeDoc.slug">{{
            activeDoc.title
            }}</router-link>
        </h2>
      </v-col>
    </v-row>
    <v-row v-if="Object.keys(activeDoc).length">
      <v-col sm="4" md="2">
        <v-card class="mb-1" v-if="editDoc">
          <v-card-actions>
            <v-row>
              <v-col>
                <v-btn @click="updateDoc(activeDoc)">Update doc</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
        <v-card v-if="editDoc">
          <v-card-title class="text-h7">Inputs</v-card-title>
          <v-card-text>
            <v-row>
              <v-col sm="12">
                <v-text-field label="label" v-model="inputLabel"></v-text-field>
              </v-col>
              <v-col sm="12">
                <v-text-field label="name" v-model="inputName"></v-text-field>
              </v-col>
              <v-col sm="12">
                <v-text-field label="value" v-model="inputValue"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="addInput()">Add input</v-btn>
          </v-card-actions>
        </v-card>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col v-for="input in activeDoc.inputs" :key="input.name" sm="12">
                <v-text-field
              :label="input.label"
              v-model="input.value"
              :hint="input.name"
            ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col sm="8" md="10">

        <v-row v-if="editDoc">
          <v-col md="6" >
            <v-text-field label="Title" v-model="activeDoc.title"></v-text-field>
            <v-text-field label="Slug" v-model="activeDoc.slug"></v-text-field>
            <v-textarea label="Description" v-model="activeDoc.description"></v-textarea>
          </v-col>
        </v-row>

        <v-card v-for="(step, i) in activeDoc.steps" v-bind:key="i" class="mb-3">
          <v-card-title v-if="!editDoc" class="mb-3">{{stepNumber(i)}}: {{ step.title}}</v-card-title>
          <v-app-bar flat v-if="editDoc">
            <v-toolbar-title>{{stepNumber(i)}}: {{ step.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon v-if="i > 0" @click="deleteStep(i)"><v-icon>mdi-delete</v-icon></v-btn>
          </v-app-bar>
          <v-card-text>
            <v-row>
              <v-col sm="12" :md="md()" lg="6" v-if="editDoc">
                <v-text-field label="Title" v-model="step.title"></v-text-field>
                <v-card-title class="text-h9">{{ step.tasks.length }} Tasks</v-card-title>
              </v-col>
            </v-row>
            <v-card v-for="(task, taskKey) in step.tasks" :key="taskKey" class="mb-3">
              <v-card-text>
                <v-row>
                  <v-col md="6" v-if="editDoc">
                    <v-toolbar>
                      <v-select hide-details label="type" v-model="task.type" :items="taskTypes"></v-select>
                    </v-toolbar>
                    <v-textarea v-model="task.title" :hint="taskTitleInputHint" :rows="rows(task.title)"></v-textarea>
                  </v-col>
                  <v-col sm=12 :md="md()" lg="6">
                    <v-sheet elevation="1" :class="taskContainerClass"><span :class="task.type">{{ taskInterpreter(task.title) }}</span></v-sheet>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions v-if="editDoc"> 
                <v-row>
                  <v-col md="2">
                    <v-btn v-if="taskKey == (step.tasks.length - 1)" @click="addTask(i)">Add task</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
            <v-card-actions v-if="editDoc">
              <v-btn v-if="i == (activeDoc.steps.length - 1)" @click="addStep()">Add step</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["activeDoc", "userLink","userProfile", "isOwner", "editDoc"]),
  },
  name: "Home",
  components: { 
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['constructUserLink','loadUserDoc','updateDoc']),
    init(){
      this.loadUserDoc(this.$route.params)
      this.constructUserLink(this.activeDoc.username)
    },
    md(){
      if(this.editDoc) {
        return 6
      } else {
        return 12
      }
    },
    rows(task){
      return task.split(/\r\n|\r|\n/).length
    },
    titleToSlug(){
      this.activeDoc.slug = this.title.replace(/\s+/g, '-').toLowerCase();
    },
    inputLabelToName(){
      this.inputName = this.inputLabel.replace(/\s+/g, '-').toLowerCase();
    },
    stepNumber(i){
      return 'Step '  + parseInt(i + 1)  
    },
    addInput(){
      this.activeDoc.inputs.push({label: this.inputLabel, name: this.inputName, value: this.inputValue})
      this.taskTitleInputHint = this.activeDoc.inputs.map(input => {return input.name}).join(' ')
      this.inputLabel = ''
      this.inputName = ''
      this.inputValue = ''
    },
    addStep(){
      this.activeDoc.steps.push({title: '', tasks: [{title: ''}]})
    },
    deleteStep(i){
      this.activeDoc.steps.splice(i,1)
    },
    addTask(i){
      this.activeDoc.steps[i].tasks.push({title: ''})
    },
    taskInterpreter(task) {
      const openTag = "<" + this.activeDoc.variableTag + ">"
      const closeTag = "</" + this.activeDoc.variableTag + ">"

      let n = task.search(openTag);
      if (n == -1) {
        return task;
      } else {
        let open = task.split(openTag)
        let n = task.split(closeTag);
        let newTask = "";
        if(open.length == n.length){
        n.forEach((e) => {
          let x = e.search(openTag);
          if (x == -1) {
            newTask += e;
          } else {
            let variable = this.getVariable(e);
            let value = this.getValue(variable);
            newTask += e.replace(openTag+ variable, value);
          }
        });
        return newTask;

        }
      }
    },
    getVariable(task) {
      const openTag = "<" + this.activeDoc.variableTag + ">"
      let n = task.search(openTag);

      if (n > -1) {
        let variable = task.substring(n + openTag.length, task.length);
        return variable;
      }
    },
    getValue(name) {
      let n = this.activeDoc.inputs.find((e) => e.name == name);
      return n.value;
    },
  },
  watch: {
    title(){
      this.titleToSlug()
    },
    inputLabel(){
      this.inputLabelToName()
    },
  },
  data: () => ({
    title: '',
    inputLabel: '',
    inputName: '',
    inputValue: '',
    taskTitleInputHint: '',
    taskContainerClass: 'pre',
    taskTypes: ['bash', 'js', 'mysql'],
    doc: {
      title: '',
      slug: '',
      description: '',
      variableTag: 'vv',
      steps: [{title: 'First step', tasks: [{title: '', type: ''}]}],
      inputs: [],
    }
    // step: 1,
  }),
};
</script>

<style scoped>

.pre {
  display: block;
  white-space: pre;
  font-family: "Roberto Mono", Monaco, courier, monospace;
  padding: 1.2em 1.4em;
  font-size: 0.85rem;
  position: relative;
}

.js::before {
  content: "JS";
}

.mysql::before {
  content: "MySQL";
}

.bash::before {
  content: "Shell";
}
.pre ::before {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  position: absolute;
  top: 0;
  right: 0;
  color: #ccc;
  text-align: right;
  font-size: 0.8em;
  padding: 5px 10px 0;
  line-height: 15px;
  height: 15px;
  font-weight: 600;
}

</style>
