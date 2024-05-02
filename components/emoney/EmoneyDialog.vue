<template>

</template>

<script>
export default {
  props: ['visible'],
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
}
</script>

<style>

</style>
