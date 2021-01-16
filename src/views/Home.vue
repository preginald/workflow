<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Welcome to <span class="blue--text darken-2">doc</span><span class="red--text">Re</span><span class="blue--text">place</span></h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Why docReplace</v-card-title>
          <v-card-text>
            <p>I created docReplace because I wanted a strutured and dynamic way to document my devops processes.</p>
            <p>Dynamic because I can fill in some variable fields and the document will be updated accordingly.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>What it isn't</v-card-title>
          <v-card-text>
            <p>docReplace is not a "how to" wiki.</p>
          </v-card-text>
        </v-card>
        <h2></h2>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>What it is</v-card-title>
          <v-card-text>
            <p>docReplace is a repository of dynamic workflow documents.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Here's an example</v-card-title>
          <v-card-text>
            <p>Fill in the input fields below and you'll notice the content of <v-chip label x-small color="primary" class="text-uppercase">Input</v-chip> change.</p>
            <p>You can also click on the input text to copy the text to memory.</p>
            <v-row>
              <v-col v-for="input in activeDoc.inputs" :key="input.name" sm="3">
                <v-text-field
              :label="input.label"
              v-model="input.value"
              :hint="input.name"
            ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card>
                  <div v-for="(task, taskKey) in activeDoc.tasks" :key="taskKey" class="mb-3">
                    <v-card-text>
                      <v-row>
                        <v-col sm="12">
                          <div>
                            {{ task.intro.content }}
                            <v-row v-if="task.input.content" justify="space-between" class="mt-2">
                              <v-col><v-chip label x-small color="primary" class="text-uppercase">Input</v-chip></v-col>
                              <v-col class="text-right"><v-chip label x-small color="black" text-color="white" class="text-uppercase">{{task.type}}</v-chip></v-col>
                            </v-row>
                            <v-sheet v-if="task.input.content" v-clipboard:copy="taskInterpreter(task.input.content)" v-clipboard:success="onCopy" v-clipboard:error="onError" elevation="1" :class="taskContainerClass"><span :class="task.type">{{ taskInterpreter(task.input.content) }}</span></v-sheet>
                            <v-row v-if="task.output.content" justify="space-between" class="mt-2">
                              <v-col><v-chip label x-small color="success" class="text-uppercase">Output</v-chip></v-col>
                            </v-row>
                            <v-sheet v-if="task.output.content" elevation="1" :class="taskContainerClass"><span :class="task.type">{{ taskInterpreter(task.output.content) }}</span></v-sheet>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Who is it for?</v-card-title>
          <v-card-text>
            <p>docReplace is someone who works in IT and runs shell commands or needs to write config files.</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Here are more examples</v-card-title>
          <v-card-text>
            <p><router-link to="/preginald/how-to-start-and-end-an-ssh-session">How to start and end an ssh session</router-link></p>
            <p><router-link to="/preginald/install-wordpress-on-apache2-virtualhost">Install Wordpress on Apache2 VirtualHost</router-link></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar.status"
      :timeout="snackbar.timeout"
    >
      <span>{{ snackbar.text }}</span>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar.status = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { taskInterpreter } from "../mixins/interpreter.js"

export default {
  mixins: [taskInterpreter],
  name: "Home",
  components: {},
  computed: {
  },
  data: () => ({
    snackbar: {status: false, text: '', timeout: 2000},
    activeDoc: {
      variableTag: 'vv',
      inputs: [
        {label:"Username", value: "peter_reginald", name: "username"},
        {label:"IP Address", value: "192.168.38.25", name: "address"},
        {label:"Port", value: "22", name: "port"},
      ],
      tasks: [
        {
          intro: {content: "Type the following to SSH into the host and you should see the output below."},
          input: {content: "ssh -p <vv>port</vv> <vv>username</vv>@<vv>address</vv>"},
          output: {content: "<vv>username</vv>@<vv>address</vv>'s password:"},
          type: "bash",
        },
      ]
    },
  }),
  methods:{
    onCopy(task){ 
      const length = 30
      const text = task.text.length > length ? task.text.substring(0,length) + "..." : task.text
      this.snackbar.text = "Copied " + text 
      this.snackbar.status = true
      // console.log(e)
    },
    onError() {
      console.log('Error copy')
    },
  } 
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
  content: "$";
}

.pre ::before {
  position: relative;
  left: 0;
  padding: 10px;
}

</style>
