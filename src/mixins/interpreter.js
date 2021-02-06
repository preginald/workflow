export const taskInterpreter = {
  data: () => ({
    taskContainerClass: "pre",
    optionHyphen: false,
  }),
  methods: {
    taskInterpreter(task) {
      let newTask = this.processVariables(task);
      newTask = this.processOptions(newTask);
      newTask = this.processHyphen(newTask);
      return newTask;
    },
    processHyphen(task) {
      if (this.optionHyphen == false) {
        task = task.replace("<hyphen>", "");
      } else {
        task = task.replace("<hyphen>", " -");
      }
      return task;
    },
    optionChecker() {
      let result = this.activeDoc.options.every((e) => e.state == false);
      if (result) {
        this.optionHyphen = false;
      }
    },
    processVariables(task) {
      if (task) {
        const openTag = "<" + this.activeDoc.variableTag + ">";
        const closeTag = "</" + this.activeDoc.variableTag + ">";

        let n = task.search(openTag);
        if (n == -1) {
          return task;
        } else {
          let open = task.split(openTag);
          let n = task.split(closeTag);
          let newTask = "";
          if (open.length == n.length) {
            n.forEach((e) => {
              let x = e.search(openTag);
              if (x == -1) {
                newTask += e;
              } else {
                let variable = this.getVariable(e);
                let value = this.getVariableValue(variable);
                newTask += e.replace(openTag + variable, value);
              }
            });
            return newTask;
          }
        }
      } else {
        return task;
      }
    },
    processOptions(task) {
      if (task) {
        const openTag = "<" + this.activeDoc.optionTag + ">";
        const closeTag = "</" + this.activeDoc.optionTag + ">";

        let n = task.search(openTag);
        if (n == -1) {
          return task;
        } else {
          let open = task.split(openTag);
          let n = task.split(closeTag);
          let newTask = "";
          if (open.length == n.length) {
            n.forEach((e) => {
              let x = e.search(openTag);
              if (x == -1) {
                newTask += e;
              } else {
                let option = this.getOption(e);
                let value = this.getOptionValue(option);
                newTask += e.replace(openTag + option, value);
              }
            });
            return newTask;
          }
        }
      } else {
        return task;
      }
    },
    getVariable(task) {
      const openTag = "<" + this.activeDoc.variableTag + ">";
      let n = task.search(openTag);

      if (n > -1) {
        let variable = task.substring(n + openTag.length, task.length);
        return variable;
      }
    },
    getOption(task) {
      const openTag = "<" + this.activeDoc.optionTag + ">";
      let n = task.search(openTag);

      if (n > -1) {
        let variable = task.substring(n + openTag.length, task.length);
        return variable;
      }
    },
    getVariableValue(name) {
      let n = this.activeDoc.inputs.find((e) => e.name == name);
      return n.value;
    },
    getOptionValue(name) {
      let n = this.activeDoc.options.find((e) => e.name == name);
      let value = n.state ? n.value : "";
      if (value && this.optionHyphen == false) {
        this.optionHyphen = true;
      }
      return value;
    },
  },
};
