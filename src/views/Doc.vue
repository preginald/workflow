<template>
  <v-container>
    <Heading />
    <v-divider class="my-3"></v-divider>
    <v-row v-if="Object.keys(activeDoc).length">

      <v-col sm="12" md="9" lg="7">
        <v-row v-if="activeDoc.create">
          <h1 class="text-h5">Create a new document</h1>
          <p> A document consists of steps and tasks </p>
        </v-row>
        <v-toolbar dense v-if="isOwner || activeDoc.create" class="mb-3">

          <v-spacer></v-spacer>
          <template v-if="activeDoc.edit">
        <v-btn icon v-if="activeDoc.status=='delete'" @click="deleteDoc(activeDoc)" class="mx-1"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
        <v-btn icon v-else @click="softDeleteDoc(activeDoc)" class="mx-1"><v-icon>mdi-recycle</v-icon></v-btn>
        <v-btn text :disabled="disabled" @click="updateDoc(activeDoc)" class="mx-1">Update</v-btn>
        <v-btn v-if="activeDoc.status=='draft'" :disabled="disabled" @click="publish(activeDoc)" color="green" class="mx-1">Publish</v-btn>
        <v-btn icon @click="toggleEditDoc()"><v-icon>mdi-pencil-remove</v-icon></v-btn>
      </template>
      <template v-if="activeDoc.create">
        <v-btn :disabled="disabled" @click="saveDraft(activeDoc)" class="mx-1">Save draft</v-btn>
        <v-btn :disabled="disabled" @click="publish(activeDoc)" color="green" class="mx-1">Publish</v-btn>
        <v-btn icon @click="toggleCreateDoc()"><v-icon>mdi-close</v-icon></v-btn>
      </template>
      <template v-if="!activeDoc.edit">
        <v-btn icon @click="toggleEditDoc()" v-if="isOwner && this.$route.name == 'ReadDoc'" class="mx-1"><v-icon>mdi-pencil-outline</v-icon></v-btn>
      </template>
    </v-toolbar>
    <v-card v-if="activeDoc.edit || activeDoc.create" class="mb-3">
      <v-card-text>
        <v-row>
          <v-col md="12" >
            <v-text-field label="Title" :rules="rules.title" v-on:keyup="titleToSlug" v-model="activeDoc.title"></v-text-field>
            <v-text-field label="Slug" :rules="rules.slug" :error-messages="slugHint" persistent-hint v-on:keyup="slugCheck(activeDoc.slug)" v-model="activeDoc.slug"></v-text-field>
            <v-textarea label="Description" v-model="activeDoc.description"></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
        <v-card v-for="(step, i) in activeDoc.steps" v-bind:key="i" class="mb-3">
          <v-card-title v-if="!activeDoc.edit && !activeDoc.create" class="mb-3">{{stepNumber(i)}}: {{ step.title}}</v-card-title>
          <v-app-bar flat v-if="activeDoc.edit || activeDoc.create">
            <v-toolbar-title>{{stepNumber(i)}}: {{ step.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon v-if="i > 0" @click="deleteStep(i)"><v-icon>mdi-delete</v-icon></v-btn>
          </v-app-bar>
          <v-card-text>
            <v-row>
              <v-col sm="12" :md="md()" lg="6" v-if="activeDoc.edit || activeDoc.create">
                <v-text-field label="Title" v-model="step.title"></v-text-field>
                <v-card-title class="text-h9">{{ step.tasks.length }} Tasks</v-card-title>
              </v-col>
            </v-row>
            <v-card v-for="(task, taskKey) in step.tasks" :key="taskKey" class="mb-3">
              <v-card-text>
                <v-hover v-slot="{ hover }">
                 <v-row>
                   <v-col v-if="activeDoc.edit || activeDoc.create">
                     <v-toolbar v-if="hover" dense>
                       <v-btn-toggle v-model="task.typeKey" dense>
                       <v-btn @click="setTaskType(task,type)" v-for="type in taskTypes" :key="type">{{ type }}</v-btn>
                     </v-btn-toggle>
                     <v-divider></v-divider>
                     <v-btn-toggle v-model="task.form" multiple dense>
                       <v-btn @click="toggleTaskIntroForm(task.intro)">Int</v-btn>
                       <v-btn @click="toggleTaskOutputForm(task.output)">Out</v-btn>
                     </v-btn-toggle>
                   </v-toolbar>
                   <v-textarea v-if="task.intro.form" v-model="task.intro.content" hint="Introduction" rows="2"></v-textarea>
                   <v-textarea v-model="task.input.content" :hint="taskInputHint" :rows="rows(task.input.content)"></v-textarea>
                   <v-textarea v-if="task.output.form" v-model="task.output.content" hint="Output" rows="2"></v-textarea>
                 </v-col>
                 <v-col sm=12 :md="md()" lg="12">
                   <div>{{ task.intro.content }}</div>
                   <v-sheet v-clipboard:copy="taskInterpreter(task.input.content)" v-clipboard:success="onCopy" v-clipboard:error="onError" elevation="1" :class="taskContainerClass"><span :class="task.type">{{ taskInterpreter(task.input.content) }}</span></v-sheet>
                   <v-sheet v-if="task.output.content" elevation="1" :class="taskContainerClass"><span :class="task.type">{{ taskInterpreter(task.output.content) }}</span></v-sheet>
                 </v-col>
                </v-row>
              </v-hover>
              </v-card-text>
              <v-card-actions v-if="activeDoc.edit || activeDoc.create"> 
                <v-row>
                  <v-col md="2">
                    <v-btn v-if="taskKey == (step.tasks.length - 1)" @click="addTask(i)">Add task</v-btn>
                    <v-btn v-else @click="insertTask(step.tasks,taskKey)">Insert task</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
            <v-card-actions v-if="activeDoc.edit || activeDoc.create">
              <v-btn v-if="i == (activeDoc.steps.length - 1)" @click="addStep()">Add step</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>

      </v-col>
      <v-col sm="12" md="3" lg="2">
        <v-card v-if="activeDoc.edit || activeDoc.create" class="mb-1">
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
    </v-row>

  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Heading from "../components/documents/Heading";

export default {
  computed: {
    ...mapState(["activeDoc", "userLink","userProfile", "isOwner", "docValidation","taskTypes","taskInputHint"]),
  },
  name: "Home",
  components: { 
    Heading, 
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapMutations(['setActiveDoc']),
    ...mapActions(['loadUserDoc','createDoc','updateDoc','deleteDoc', 'softDeleteDoc','slugCheck','toggleCreateDoc','toggleEditDoc']),
    init(){
      console.log(this.$route.name)
      if(this.$route.name === "ReadDoc"){
        this.loadUserDoc(this.$route.params)
      }

      if(this.$route.name === "CreateDoc"){
      let newDoc = {
        title: '',
        slug: '',
        description: '',
        variableTag: 'vv',
        steps: [{title: 'First step', tasks: [{intro: {content: '', form: true}, input: {content: '', form: true}, output: {content: '', form: true},type: '',form: []}]}],
        inputs: [],
        create: true,
      }
        this.setActiveDoc(newDoc)
      }
    },
    toggleTaskIntroForm(intro){
      intro.form = !intro.form
    },
    toggleTaskOutputForm(output){
      output.form = !output.form
    },
    publish(){
      this.activeDoc.status = 'publish'
      this.activeDoc.create= false
      this.updateDoc(this.activeDoc)
    },
    saveDraft(){
      this.activeDoc.status = 'draft'
      this.activeDoc.edit = true
      this.activeDoc.create= false
      this.createDoc(this.activeDoc)
    },
    onCopy() {
      console.log('You just copied')
    },
    onError() {
      console.log('Error copy')
    },
    validateSubmit(){
      let error = true 
      if(this.activeDoc.title.length < 50 && this.activeDoc.title.length > 15){
        error = false
      } else {
        error = true
        console.log('Title is not valid')
      }

      if(this.activeDoc.slug.length < 50 && this.activeDoc.slug.length > 15){
        error = false
      } else {
        error = true
      } 

      if(this.docValidation.slug){
        error = true
        this.slugHint = "Slug already exists"
      } else {
        error = false
        this.slugHint = null
      }

      if(error){
        this.disabled = 'disabled'
        // this.slugHint = null
      } else {
        this.disabled = null
      } 
    },
    md(){
      if(this.activeDoc.edit || this.activeDoc.create) {
        return 6
      } else {
        return 12
      }
    },
    rows(task){
      return task.split(/\r\n|\r|\n/).length
    },
    titleToSlug(){
      this.activeDoc.slug = this.activeDoc.title.replace(/\s+/g, '-').toLowerCase();
      this.slugCheck(this.activeDoc.slug)
      this.validateSubmit()
    },
    inputLabelToName(){
      this.inputName = this.inputLabel.replace(/\s+/g, '-').toLowerCase();
    },
    stepNumber(i){
      return 'Step '  + parseInt(i + 1)  
    },
    addInput(){
      this.activeDoc.inputs.push({label: this.inputLabel, name: this.inputName, value: this.inputValue})
      // this.getTaskTitleInputHints()
      this.inputLabel = ''
      this.inputName = ''
      this.inputValue = ''
    },
    addStep(){
      this.activeDoc.steps.push({title: '', tasks: [{intro: {content: '', form: true}, input: {content: '', form: true}, output: {content: '', form: true},type: '',form: []}]})
    },
    deleteStep(i){
      this.activeDoc.steps.splice(i,1)
    },
    addTask(i){
      this.activeDoc.steps[i].tasks.push(this.newTask)
    },
    insertTask(tasks,taskKey){
      tasks.splice(taskKey+1, 0, this.newTask)
    },
    setTaskType(task,type){
      task.type = type
    },
    taskInterpreter(task) {
      if(task){
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

      } else {
        return task
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
    inputLabel(){
      this.inputLabelToName()
    },
  },
  data: () => ({
    title: '',
    inputLabel: '',
    inputName: '',
    inputValue: '',
    taskContainerClass: 'pre',
    selectedTaskType: [],
    slugHint: '',
    taskForm: [{intro: false, input: false, output: false}],
    newTask: {intro: {content: '', form: false }, input: {content: '', form: false }, output: {content: '', form: false }},
    rules: {
      title:[
        (value) => !!value || "Required",
        (value) => value.length > 15 || "Min 15 characters",
        (value) => value.length < 50 || "Max 50 characters",
      ],
      slug:[
        (value) => !!value || "Required",
        (value) => value.length < 50 || "Max 50 characters",
      ],
    },
    disabled: null,
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
  overflow-y: hidden;
}

.bash::before {
  content: "Shell";
}

.html::before {
  content: "HTML";
}

.js::before {
  content: "JS";
}

.mysql::before {
  content: "MySQL";
}

.php::before {
  content: "PHP";
}

.yml::before {
  content: "YML";
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
