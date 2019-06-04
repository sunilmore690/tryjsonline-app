<template>
    <div>
        <el-row>
  <el-col :span="12">
      <div v-if='isEdit'><el-input placeholder="Please input" v-model="program.title" >
  
    <el-button type="" v-on:click='update' slot='append'>Save</el-button> 
  </el-input></div>
      <div v-else>
          <el-row>
            <el-col :span="18"><h3 >#{{index}} {{program.title}}</h3></el-col>
            <el-col :span="6"><el-button type="primary" icon="el-icon-edit" circle v-on:click='isEdit=true'></el-button> <el-button type="danger" icon="el-icon-delete" circle v-on:click="remove" ></el-button></el-col>
         </el-row>
    </div>
    
    
    <div style="padding-top:15px;">
      <codemirror  v-model="program.code" :options="cmOptions" @ready="onCmReady"
              @focus="onCmFocus"
              @input="onCmCodeChange">></codemirror>
    </div>
    <div><br><el-button v-on:click="runProgram" type="primary">Run</el-button></div>
  </el-col>
  <el-col :span="12" style="padding-left:30px;padding-top:15px" > <div >
      <h4>Output</h4>   
    </div>
       <div v-for="log in output" :key='log'>{{log}}</div>
       <div v-if='error'>{{error.message}}</div>
       </el-col> 
</el-row>
        
   
    </div>
    
</template>

<script>
import "codemirror/mode/javascript/javascript.js";
// theme css
import "codemirror/theme/monokai.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
export default {
  props: ["program", "index"],
  data() {
    return {
      error: {},
      isEdit: false,
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        theme: "monokai",
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      output: []
    };
  },
  methods: {
    update() {
      this.$store.commit("update", this.program.id, {
        title: this.program.title
      });
      this.isEdit = false;
    },
    remove() {
      var txt;
      var r = confirm(
        "Are you sure want to delete '" + this.program.title + "'"
      );
      if (r == true) {
        this.$store.commit("remove", this.program.id);
      }
    },
    runProgram() {
      console.log("runProgram");
      var that = this;
      var old = console.log;
      this.output = [];
      console.log = function() {
        var output = "";
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == "object") {
            output +=
              JSON && JSON.stringify
                ? JSON.stringify(arguments[i], undefined, 2)
                : arguments[i];
          } else {
            output += arguments[i] + "   ";
          }
        }
        that.output.push(output);
      };

      try {
        eval(this.code);
        // console.log = old;
        this.error = {};
      } catch (e) {
        this.error = e;
        console.log = old;
      }
    },
    onCmReady(cm) {
      cm.on("keypress", () => {
        console.log("hi");
        cm.showHint();
      });
      // this.runProgram()
      console.log("the editor is readied!", cm);
    },
    onCmFocus(cm) {
      //   cm.showHint();
      console.log("the editor is focus!", cm);
    },
    onCmCodeChange(newCode) {
      console.log("this is new code", newCode);
      this.code = newCode;
      this.$store.commit("update", this.program.id, { code: this.code });
    }
  },
  created() {
    this.code = this.program.code;
    // this.runProgram();
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror;
    }
  }
};
</script>
