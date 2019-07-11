<template>
  <section class="wrap">
    <img
      src="../assets/img/logo.png"
      alt="Nuxt.js Logo"
      class="logo"
    >
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
  </section>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
.wrap {
  text-align: center;
}

.logo {
  max-width: 100%;
}

.title {
  margin-top: 15px;
  font-size: 5em;
}

.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
</style>
