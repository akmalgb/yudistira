<template>
  <v-card tile >
      <v-card-title style="color: #526789" class="pa-3 pl-10 font-weight-regular" >
        {{ pageTitle }}
      </v-card-title>
    </v-card>
</template>

<script>
export default {
  props: ['pageTitle']
}
</script>

<style>

</style>
