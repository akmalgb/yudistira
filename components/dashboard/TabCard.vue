<template>
  <v-card class="rounded-lg">
      <slot name="cardTabs">
        <v-tabs>
          <v-tab>Item One</v-tab>
        </v-tabs>
      </slot>
      <slot name="cardContent">
      </slot>
    <!-- </v-container> -->
  </v-card>
</template>

<script>
export default {
}
</script>

<style>

</style>
