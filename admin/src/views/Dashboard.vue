<template>
  <div>欢迎回来，{{username}}</div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      username: '刘文锐',
    }
  },
}
</script>