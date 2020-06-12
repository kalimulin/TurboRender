<template>
  <form @submit.prevent="submitHandler" class="task-form">
    <div class="input-field">
      <input id="title" type="text" class="validate" required v-model="title">
      <label for="title">Title</label>
      <span class="helper-text" data-error="Title is required"></span>
    </div>
    <div class="chips" ref="chips"></div>
    <div class="input-field">
      <textarea id="description" class="materialize-textarea" v-model="description" style="min-height: 100px"></textarea>
      <label for="description">Description</label>
      <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
    </div>
    <div class="input-field">
      <input id="datepicker" type="text" ref="datepicker">
      <label for="datepicker">Date</label>
    </div>
    <button class="btn" type="submit">{{ task ? 'Update' : 'Create'}} task</button>
    <button v-if="task && task.status === 'active'"
            class="btn blue"
            type="button"
            style="margin-left: 10px"
            @click="completeTaskHandler(true)"
    >Complete task</button>
    <button v-if="task && task.status === 'completed'"
            class="btn red"
            type="button"
            style="margin-left: 10px"
            @click="completeTaskHandler(false)"
    >Uncomplete task</button>
  </form>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    task: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    description: '',
    title: '',
    chips: null,
    date: null
  }),
  mounted () {
    if (this.task) {
      this.description = this.task.description
      this.title = this.task.title
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    }
    this.chips = M.Chips.init(this.$refs.chips, {
      data: this.task ? this.task.tags : [],
      placeholder: 'Task tags'
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: this.task ? new Date(this.task.date) : new Date(),
      setDefaultDate: true
    })
  },
  methods: {
    submitHandler () {
      const task = {
        title: this.title,
        description: this.description,
        id: this.task ? this.task.id : Date.now(),
        status: this.task ? this.task.status : 'active',
        tags: this.chips.chipsData,
        date: this.date.date
      }
      this.$emit('submit', task)
    },
    completeTaskHandler (complete) {
      if (complete) {
        this.$emit('submit', { ...this.task, status: 'completed' })
      } else {
        this.$emit('submit', { ...this.task, status: 'active' })
      }
    }
  },
  destroyed () {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }
  }
}
</script>

<style scoped>

</style>
