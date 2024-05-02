<template>
  <v-card class="rounded-lg">
    <v-app-bar class="rounded-t-lg" :style="`${$config.cardColor}`"  flat tile>
      <slot name="cardIcon">
        <!-- <img src="/mainCardIcon/info.svg" alt="Icon"> -->
      </slot>
      <v-toolbar-title style="color: #526789;" class="text-h6 font-weight-medium ml-5">
        <slot name="cardTitle">
          <!-- Title -->
        </slot>
      </v-toolbar-title>
    </v-app-bar>
    <!-- <v-container class="d-flex justify-center"> -->
      <slot name="cardContent">
        Konten
      </slot>
    <!-- </v-container> -->
  </v-card>
</template>

<script>
export default {
  computed: {
    message() {
      return process.env.SIDIGS_PARENT_CARD_COLOR;
    }
  }
}
</script>

<style>

</style>
