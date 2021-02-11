<template>
  <v-container>
    <h2 class="text-h6">
      <a href="/commands/">Commands</a> / {{ activeCommand.name }}
    </h2>
    <v-row v-if="Object.keys(activeCommand).length">
      <v-col sm="12" md="11" lg="10" xl="7">
        <v-row v-if="userProfile.uid == 'mujiP5vK54hMq9n0ObiswWecO4k2' && activeCommand.create">
          <v-col>
            <h1 class="text-h5">Create a new command</h1>
            <p> A command consists of options and inputs</p>
          </v-col>
        </v-row>
        <v-card class="mb-3">
          <v-card-title class="text-h7">Syntax</v-card-title>
          <v-card-text>
            <v-sheet elevation="1" class="pre"><span>{{ activeCommand.syntax }}</span></v-sheet>
          </v-card-text>
        </v-card>
        <v-card v-if="userProfile.uid == 'mujiP5vK54hMq9n0ObiswWecO4k2' && activeCommand.create" class="mb-3">
          <v-card-text>
            <v-row>
              <v-col md="12" >
                <v-text-field label="Name" v-on:keyup="nameToSlug" v-model="activeCommand.name"></v-text-field>
                <v-text-field label="Command" v-model="activeCommand.command"></v-text-field>
                <v-text-field label="Syntax" v-model="activeCommand.syntax"></v-text-field>
                <v-text-field label="Slug" v-model="activeCommand.slug"></v-text-field>
                <v-textarea label="Description" v-model="activeCommand.description"></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card v-if="userProfile.uid == 'mujiP5vK54hMq9n0ObiswWecO4k2' && activeCommand.create" class="mb-1">
          <v-row>
            <v-col md="6">
              <v-card-title class="text-h7">Variables</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col sm="12">
                    <v-text-field label="label" v-model="optionLabel"></v-text-field>
                  </v-col>
                  <v-col sm="12">
                    <v-text-field label="name" v-model="optionName"></v-text-field>
                  </v-col>
                  <v-col sm="12">
                    <v-text-field label="value" v-model="optionValue"></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="addOption()">Add option</v-btn>
              </v-card-actions>
            </v-col>
            <v-col md="6">
              <v-card-title class="text-h7">Inputs</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col sm="12">
                    <v-text-field label="label" v-on:keyup="labelToNameAndValue" v-model="inputLabel"></v-text-field>
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
            </v-col>
          </v-row>
        </v-card>
        <v-card v-if="activeCommand.options.length" class="mb-3">
          <v-card-title class="text-h7">Options</v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="option in activeCommand.options" 
                :key="option.name" 
                cols="6" sm="4" md="4" lg="4" xl="3">
                <div v-if="option.type == 'boolean'">
                  <v-checkbox @change="optionChecker(option.state)" v-model="option.state" :label="option.label"></v-checkbox>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card v-if="activeCommand.inputs.length" class="mb-3">
          <v-card-title class="text-h7">Inputs</v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="input in activeCommand.inputs" 
                :key="input.name" 
                cols="6" sm="4" md="4" lg="4" xl="3">
                <v-text-field
              :label="input.label"
              v-model="input.value"
              :hint="input.name"
            ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mb-3">
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field v-if="activeCommand.create" label="command" v-model="activeCommand.input.content"></v-text-field>
                <v-sheet elevation="1" class="pre"><span>{{ commandInterpreter(activeCommand.input.content) }}</span></v-sheet>
              </v-col>
            </v-row>
          </v-card-text> 
        </v-card>
        <v-card v-if="userProfile.uid == 'mujiP5vK54hMq9n0ObiswWecO4k2' && activeCommand.create" class="mb-3">
          <v-card-text>
            <v-row>
              <v-col md="12" >
                <v-textarea label="Form" v-model="activeCommandString"></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="addCommand()">Add command</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { taskInterpreter } from "../mixins/interpreter.js"

export default {
  mixins: [taskInterpreter],
  components: { 
  },
  computed: {
    ...mapState(["activeCommand","userProfile"]),
    activeCommandString(){
      return JSON.stringify(this.activeCommand)
    },
  },
  data: () => ({
    inputLabel: '',
    inputName: '',
    inputValue: '',
    optionLabel: '',
    optionName: '',
    optionValue: '',
    activeDoc: {
      name: "rsync",
      syntax: "rsync options source destination",
      variableTag: "vv",
      optionTag: "oo",
      input: {content: "rsync<hyphen><oo>archive</oo><oo>compress</oo><oo>verbose</oo><oo>human</oo> <vv>source</vv> <vv>destination</vv>"},
      inputs: [
        {label: "source", name: "source", value: "source"},
        {label: "destination", name: "destination", value: "destination"},
      ],
      options: [
        {type: "boolean", state: false, label: "archive", name: "archive", value: "a"},
        {type: "boolean", state: false, label: "verbose", name: "verbose", value: "v"},
        {type: "boolean", state: false, label: "compress file data", name: "compress", value: "z"},
        {type: "boolean", state: false, label: "human readable", name: "human", value: "h"},
      ],
    }
  }),
  methods: {
    ...mapMutations(['setActiveDoc','setActiveCommand']),
    ...mapActions(['createCommand','fetchCommand']),
    addCommand(){
      this.createCommand(this.activeCommand)
    },
    init(){
      if(this.$route.name === "ReadCommand"){
        this.fetchCommand(this.$route.params)
      }

      if(this.$route.name === "CreateCommand"){
        let newCommand = {
          name: "",
          syntax: "",
          slug: "",
          command: "",
          username: "",
          uid: "",
          create: true,
          variableTag: "vv",
          optionTag: "oo",
          input: {content: ""},
          inputs: [],
          options: [],
        }
        this.setActiveCommand(newCommand)
      }
    },
    addInput(){
      this.activeCommand.inputs.push({label: this.inputLabel, name: this.inputName, value: this.inputValue})
      this.inputLabel = ''
      this.inputName = ''
      this.inputValue = ''
    },
    addOption(){
      this.activeCommand.options.push({type: "boolean", state: false, label: this.optionLabel, name: this.optionName, value: this.optionValue})
      this.optionLabel = ''
      this.optionName = ''
      this.optionValue = ''
    },
    nameToSlug(){
      if(this.activeCommand.name){
        this.activeCommand.slug = this.activeCommand.name.replace(/\s+/g, '-').toLowerCase();
      } else {
        this.activeCommand.slug = ''
      }
    },
    labelToNameAndValue(){
      if(this.inputLabel){
        this.inputName = this.inputLabel.toLowerCase();
        this.inputValue = this.inputLabel.toLowerCase();
      } else {
        this.inputName = "";
        this.inputValue = "";
      }
    },
  },
  mounted() {
    this.init()
  },
}
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
</style>
