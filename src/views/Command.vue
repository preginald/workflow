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
    <v-sheet  elevation="1" class="pre"><span>{{ taskInterpreter(activeDoc.input.content) }}</span></v-sheet>
  </v-container>
</template>
<script>
import { taskInterpreter } from "../mixins/interpreter.js"

export default {
  mixins: [taskInterpreter],
  components: { 
  },
  data: () => ({
    activeDoc: {
      name: "rsync",
      syntax: "rsync source destination",
      variableTag: "vv",
      input: {content: "rsync <vv>source</vv> <vv>destination</vv>"},
      inputs: [
        {label: "source", name: "source", value: "source"},
        {label: "destination", name: "destination", value: "destination"},
        {type: "boolean", label: "verbose", name: "verbose", value: "v"},
      ],
    }
  })
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
