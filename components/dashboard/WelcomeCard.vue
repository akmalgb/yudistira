<template>
  <v-card :class="`${$config.mainColor}`" class="rounded-xl" dark flat>
    <v-container class="pa-0">
      <v-row dense no-gutters>
        <v-col cols="12" md="6">
          <v-card-title>
            <h3 class="font-weight-medium">
              Selamat Datang <br />
              <div style="white-space: nowrap" class="overflow-x-auto">
                Walimurid {{ child_detail ? child_detail.name : "" }}
              </div>
            </h3>
          </v-card-title>
          <v-card-text>
            {{ school.name }}
            <br />
            {{ child_class ? child_class.name : "" }} -
            {{ child_class ? child_class.grade : "" }}
          </v-card-text>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-end">
          <div class="d-none d-md-block">
            <!-- <nuxt-img src="/penguin.svg"  /> -->
            <v-img
              src="/penguin.svg"
              position="absolute"
              max-height="190"
              style="margin: -20px 0px 0px 0px"
            ></v-img>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  computed: {
    child() {
      return this.$store.state.child;
    },
    child_detail() {
      return this.$store.state.child_detail;
    },
    child_class() {
      return this.$store.state.child_class;
    },
    school() {
      return this.$store.state.school;
    },
  },
};
</script>

<style scoped>
.delius {
  font-family: "Delius", cursive;
}
</style>
