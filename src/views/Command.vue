<template>
  <v-container>
    <h1>{{ activeCommand.name }}</h1>
    <h2>Syntax</h2>
    <v-row v-if="Object.keys(activeCommand).length">
      <v-col sm="12" md="11" lg="10" xl="7">
        <v-card v-if="activeCommand.inputs.length" class="mb-3">
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
        <v-card v-if="activeCommand.options.length" class="mb-3">
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
        <v-card class="mb-3">
          <v-card-text>
            <v-row>
              <v-col>
                <v-sheet  elevation="1" class="pre"><span>{{ commandInterpreter(activeCommand.input.content) }}</span></v-sheet>
              </v-col>
            </v-row>
          </v-card-text> 
        </v-card>
        <v-card v-if="userProfile.uid == 'mujiP5vK54hMq9n0ObiswWecO4k2'" class="mb-3">
          <v-card-text>
            <v-row>
              <v-col md="12" >
                <v-text-field label="Name" v-model="activeCommand.name"></v-text-field>
                <v-text-field label="Syntax" v-model="activeCommand.syntax"></v-text-field>
                <v-card v-if="activeCommand.inputs.length" class="mb-3">
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
                <v-card v-if="activeCommand.options.length" class="mb-3">
                  <v-card-text>
                    <v-row>
                      <v-col v-for="option in activeCommand.options" 
                        :key="option.name" 
                        cols="6" sm="4" md="4" lg="4" xl="3">
                        <v-text-field
                      :label="option.label"
                      v-model="option.value"
                      :hint="option.name"
                    ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
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
import { mapState, mapActions } from "vuex";
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
    ...mapActions(['createCommand','fetchCommand']),
    addCommand(){
      this.createCommand(this.activeDoc)
    },
    init(){
      if(this.$route.name === "ReadCommand"){
        this.fetchCommand(this.$route.params)
      }

      if(this.$route.name === "CreateCommand"){
        let newDoc = {
          title: '',
          slug: '',
          description: '',
          status: 'edit',
          variableTag: 'vv',
          steps: [{title: 'First step', tasks: [{intro: {content: '', form: true}, input: {content: '', form: true}, output: {content: '', form: true},type: '',form: []}]}],
          inputs: [],
          create: true,
        }
        this.setActiveDoc(newDoc)
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
