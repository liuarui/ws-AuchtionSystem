<template>
  <div>欢迎回来，{{username}}</div>
</template>

<script>
let username = localStorage.getItem('uname')

export default {
  name: 'dashboard',
  data() {
    return {
      username: username,
    }
  },
}
</script>