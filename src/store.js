import Vue from "vue";
import Vuex from "vuex";
import _ from "underscore";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    programs: [
      {
        title: "Javascript ",
        id: 1,
        code: `const foo = [1, 2];
        const bar = foo;
        
        bar[0] = 9;
        
        console.log(foo[0], bar[0]); // => 9, 9`
      },
      {
        title: "Object.assign",
        id: 2,
        code: `const original = { a: 1, b: 2 };
        const copy = Object.assign(original, { c: 3 }); // this mutates original ಠ_ಠ
        delete copy.a; // so does this
        
        // bad
        const original = { a: 1, b: 2 };
        const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }
        
        // good
        const original = { a: 1, b: 2 };
        const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }
        
        const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
        console.log(a,noA)
        `
      }
    ]
  },
  mutations: {
    add(state, data) {
      console.log("data", data);
      const length = state.programs.length;
      data.id = length + 1;
      state.programs.unshift(data);
    },
    remove(state, id) {
      let programs = state.programs;
      state.programs = _.without(
        programs,
        _.findWhere(programs, {
          id: id
        })
      );
    },
    update(state, id, data) {
      let programs = state.programs;
      var match = _.where(programs, { id: id });
      match = {...match, ...data };
    },
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem("store")) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    }
  },
  getters: {}
});
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
