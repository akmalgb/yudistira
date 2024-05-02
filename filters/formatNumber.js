import Vue from 'vue'

Vue.filter('formatNumber', function (value) {
  if (!value) return '0'
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
})
