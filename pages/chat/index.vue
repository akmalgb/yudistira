<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Chat" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <TabCard>
            <template v-slot:cardTabs>
              <v-tabs
                v-model="userProfileTabs"
                :show-arrows="false"
                hide-slider
              >
                <v-tab to="#tabs-1" class="tabs" active-class="tab-active">
                  <b class="text-capitalize">Guru Pengajar</b>
                </v-tab>
                <v-tab to="#tabs-2" class="tabs" active-class="tab-active">
                  <b class="text-capitalize">Murid</b>
                </v-tab>
                <v-tab to="#tabs-3" class="tabs" active-class="tab-active">
                  <b class="text-capitalize">Wali Kelas & Admin</b>
                </v-tab>
              </v-tabs>
            </template>
            <template v-slot:cardContent> </template>
          </TabCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import TabCard from "~/components/dashboard/TabCard.vue";
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Chat",
    };
  },
  data() {
    return {
      userProfileTabs: null,
    };
  },
  components: {
    TabCard,
  },
  computed: {
    ...mapState(["school"]),
  },
};
</script>

<style>
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  color: black;
  font-size: 14px;
}
</style>
