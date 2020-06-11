<template>
  <div class="tasks-list">
    <h1>List</h1>
    <hr/>
    <table v-if="tasks && tasks.length" class="striped highlight">
      <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Date</th>
        <th>Description</th>
        <th>Status</th>
        <th>Open</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, idx) of tasks" :key="task.id">
        <td>{{idx + 1}}</td>
        <td>{{task.title}}</td>
        <td>{{new Date(task.date).toLocaleDateString()}}</td>
        <td style="max-width: 400px"><div class="tasks-list__task-description">{{task.description}}</div></td>
        <td>{{task.status}}</td>
        <td>
          <router-link tag="button" class="bnt btn-small" :to="`/task/${task.id}`">Open</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'List',
  data: () => ({
  }),
  computed: {
    tasks () {
      return this.$store.getters.getTasks
    }
  }
}
</script>

<style lang="scss">
  .tasks-list__task-description {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
