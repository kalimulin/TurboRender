import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  },
  getters: {
    getTasks: state => state.tasks,
    getTask: state => id => state.tasks.find(task => task.id === id)
  },
  mutations: {
    createTask: (state, task) => {
      state.tasks.push(task)
    },
    updateTask: (state, task) => {
      const tasks = [...state.tasks]
      const idx = tasks.findIndex(t => t.id === task.id)
      tasks[idx] = task
      state.tasks = tasks
    }
  },
  actions: {
    createTask: ({ commit, state }, task) => {
      commit('createTask', task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask: ({ commit, state }, task) => {
      commit('updateTask', task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  modules: {
  }
})
