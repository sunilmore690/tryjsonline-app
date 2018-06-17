import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import store from './store'

Vue.use(ElementUI);
Vue.use(VueCodemirror)

new Vue({
  el: '#app',
  render: h => h(App),
  store,
	beforeCreate() {
		this.$store.commit('initialiseStore');
	}
})
