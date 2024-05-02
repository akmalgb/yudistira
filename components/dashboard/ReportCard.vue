<template>
  <v-card class="rounded-xl my-3">
    <v-app-bar class="rounded-t-xl" color="#041735" flat tile>
      <slot name="cardIcon">
        <!-- <img src="/mainCardIcon/info.svg" alt="Icon"> -->
      </slot>
      <v-toolbar-title style="color: #FFFFFF;" class="text-h6 font-weight-medium ml-5">
        <slot name="cardTitle">
          <!-- Tahun Ajaran 2021/2022-Semester 1.pdf -->
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
}
</script>

<style>

</style>
