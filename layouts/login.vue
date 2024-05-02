<template>
  <v-app>
    <v-main :class="`${$config.mainColor}`">
      <v-container fluid fill-height class="pattern">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
.pattern {
  background-image: url("/login/pattern.svg");
  background-repeat: repeat;
}
</style>
