<template>
 <div>
 
  <!-- bidirectional data binding（双向数据绑定） -->
  <el-row>
    <el-col :span="10"><h1>Compile JS Online</h1></el-col>
    <el-col :span="4"> By <a href="https://github.com/sunilmore690">Sunil More</a></el-col>
    <el-col :span="4"></el-col>
  </el-row>
  <el-button type="success" v-on:click='add' size="medium">ADD</el-button>
  <div v-for='(program,index) in programs' :key='program.id'>
     
      <code-unit :program='program' :index='index+1'></code-unit>
  </div>

</div>
  
</template>

<script>
// language js
// more codemirror resources
// import 'codemirror/some-resource...'
import CodeUnit from './CodeUnit'
export default {
  data() {
    return {      
    };
  },
  methods: {
    add(){
      this.$store.commit('add',{
        title:'New Program',
        code:'const b=10'
      })
    },
   
  },
  computed: {
   programs () {
      return this.$store.state.programs
    }
  },
  mounted() {
    console.log("this is current codemirror object", this.codemirror);
    // you can use this.codemirror to do something...
  },
  components:{
    CodeUnit
  }
};
</script>

