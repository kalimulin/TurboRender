<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create task</h1>
      <TaskForm @submit="submitHandler"></TaskForm>
    </div>
  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm'

export default {
  name: 'Create',
  components: {
    TaskForm
  },
  methods: {
    submitHandler (task) {
      this.$store.dispatch('createTask', task)
      this.$router.push('/list')
    }
  }
}
</script>
