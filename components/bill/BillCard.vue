<template>
  <v-card class="d-flex white--text pa-4 rounded-lg" max-height="150" flat>
    <v-row justify="center" align="center" dense>
      <v-col class="d-flex justify-center" cols="12" lg="3">
        <v-card class="rounded-circle d-flex justify-center align-center" width="34px" height="34px">
          <slot name="billIcon">
            <v-icon :class="`${$config.textColor}`">
              mdi-note-text
            </v-icon>
          </slot>
        </v-card>
      </v-col>
      <v-col class="text-sm-center text-md-left" cols="12" lg="9">
        <p class="text-subtitle-1 mb-0">
          <slot name="billType">
            Total Tagihan
          </slot>
        </p>
        <h3 class="font-weight-medium">
          <slot name="billNominal">
            Rp 4.500.000
          </slot>
        </h3>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {

}
</script>

<style scoped>
/* .green-gradient {
  background: linear-gradient(180deg, #9DBE16 0%, #539401 100%);
}
.text-gradient {
  background: -webkit-linear-gradient(#9DBE16,#539401 );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
} */
.peach {
  background: #FF7171;
}
</style>
