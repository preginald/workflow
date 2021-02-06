<template>
  <v-container>
    <h1>{{ activeDoc.name }}</h1>
    <h2>Syntax</h2>
    <v-card v-if="activeDoc.inputs.length" class="mb-3">
      <v-card-text>
        <v-row>
          <v-col v-for="input in activeDoc.inputs" 
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
    <v-card v-if="activeDoc.options.length" class="mb-3">
      <v-card-text>
        <v-row>
          <v-col v-for="option in activeDoc.options" 
            :key="option.name" 
            cols="6" sm="4" md="4" lg="4" xl="3">
            <div v-if="option.type == 'boolean'">
              <v-checkbox @change="optionChecker(option.state)" v-model="option.state" :label="option.label"></v-checkbox>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-sheet  elevation="1" class="pre"><span>{{ taskInterpreter(activeDoc.input.content) }}</span></v-sheet>
    
    <v-card v-if="userProfile.uid == 'mujiP5vK54hMq9n0ObiswWecO4k2'" class="mb-3">
      <v-card-text>
        <v-row>
          <v-col md="12" >
            <v-text-field label="Name" v-model="activeDoc.name"></v-text-field>
            <v-text-field label="Syntax" v-model="activeDoc.syntax"></v-text-field>
            <v-card v-if="activeDoc.inputs.length" class="mb-3">
              <v-card-text>
                <v-row>
                  <v-col v-for="input in activeDoc.inputs" 
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
            <v-card v-if="activeDoc.options.length" class="mb-3">
              <v-card-text>
                <v-row>
                  <v-col v-for="option in activeDoc.options" 
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
            <v-textarea label="Form" v-model="activeDocString"></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="addCommand()">Add command</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import { taskInterpreter } from "../mixins/interpreter.js"

export default {
  mixins: [taskInterpreter],
  components: { 
  },
  computed: {
    ...mapState(["userProfile"]),
    activeDocString(){
      return JSON.stringify(this.activeDoc)
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
    addCommand(){
      console.log(this.activeDoc)
    }
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
