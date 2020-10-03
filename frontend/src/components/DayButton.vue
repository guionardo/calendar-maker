<template>
  <div @click="clickDay">{{dayNumber}}</div>
</template>

<script>
export default {
  props: ['day', 'data'],
  data: function () {
    return {}
  },
  computed: {
    dayNumber () {
      return this.day.getDate()
    }
  },
  methods: {
    clickDay () {
      alert(this.data)
    }
  }
}
</script>

<style scoped>
div {
    text-align: center;
}
</style>
