<template>
  <v-card class="rounded-xl">
    <div class="logo py-4 d-flex justify-center">
      <!-- /login/sidigs_walimurid.svg -->
      <!-- /assa/logo-assa-login.svg -->
      <!-- <img src="/assa/logo-assa-login.svg" style="max-width: 80%; height: auto;" alt="" /> -->
      <img :src="`${$config.logo}`" style="max-width: 80%; height: auto;" alt="" />
    </div>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <slot></slot>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
