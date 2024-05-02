<template>
  <v-container class="px-0 pt-0" fluid>
    <TitleCard page-title="Pengumuman" />

    <v-container>
      <v-card class="ma-3 rounded-lg">
        <v-container style="width: 720px">
          <v-container class="d-flex justify-center">
            <v-img :src="announcement.photo" width="720px"></v-img>
          </v-container>
          <v-container class="text-secondary">
            <h3>{{ announcement.title }}</h3>
            <span>Diposting Oleh: Admin {{ announcement.created_at }}</span>
            <p class="mt-5">{{ announcement.description }}</p>
          </v-container>
        </v-container>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import TitleCard from "~/components/TitleCard.vue";
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Pengumuman",
    };
  },
  data() {
    return {
      announcement: {},
    };
  },
  async created() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.$store.state.auth.token}`,
      },
      params: {
        announcement_id: this.$route.params.id,
      },
    };
    await this.$axios
      .$get(`announcement/get-detail`, config)
      .then((res) => {
        this.announcement = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  components: { TitleCard },
  computed: {
    ...mapState(["school"]),
  },
};
</script>
