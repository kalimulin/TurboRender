<template>
    <div v-if="task">
      <h1>{{task.title}}</h1>
      <TaskForm :task="task" @submit="submitHandler"></TaskForm>
    </div>
    <div v-else>
      <h2 class="center">Task not found</h2>
    </div>
</template>

<script>
import TaskForm from '@/components/TaskForm'
export default {
  name: 'Task',
  components: {
    TaskForm
  },
  computed: {
    task () {
      return this.$store.getters.getTask(+this.$route.params.id)
    }
  },
  methods: {
    submitHandler (task) {
      this.$store.dispatch('updateTask', task)
      M.toast({ html: 'Task updated!' })
    }
  }
}
</script>

<style scoped>

</style>
