import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  },
  getters: {
    getTasks (state) {
      return state.tasks
    }
  },
  mutations: {
    createTask (state, task) {
      state.tasks.push(task)
    }
  },
  actions: {
    createTask ({ commit, state }, task) {
      commit('createTask', task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  modules: {
  }
})
