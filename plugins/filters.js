import Vue from 'vue'

export function format (timestamp) {
  let date = new Date(timestamp)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10
    ? '0' + (date.getMonth() + 1)
    : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10
    ? '0' + (date.getDate())
    : date.getDate())

  return Y + M + D
}

const filters = {
  format
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export default filters
