<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Edutainment" />
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
                <v-tab to="#tabs-1" class="tabs" active-class="tab-active"
                  ><b class="text-capitalize">Semua</b></v-tab
                >
                <v-tab to="#tabs-2" class="tabs" active-class="tab-active"
                  ><b class="text-capitalize">School</b></v-tab
                >
                <v-tab to="#tabs-3" class="tabs" active-class="tab-active"
                  ><b class="text-capitalize">Sidigs</b></v-tab
                >
              </v-tabs>
            </template>
            <template v-slot:cardContent>
              <v-tabs-items v-model="userProfileTabs">
                <v-tab-item value="tabs-1">
                  <v-col
                    class="col-style mt-3"
                    v-for="item in edutainmentAll.data"
                    :key="item.id"
                    :id="item.id"
                  >
                    <v-col class="d-flex justify-center">
                      <h1 class="profile-style">{{ item.title }}</h1>
                    </v-col>

                    <v-container class="d-flex justify-center">
                      <v-img
                        :lazy-src="`${item.thumbnail}`"
                        max-width="500"
                        :src="`${item.thumbnail}`"
                      ></v-img>
                    </v-container>

                    <v-row class="d-flex mb-6 ml-3 mr-3 mt-3">
                      <span v-if="item.user.name != '-'" class="pa-2 mr-auto">
                        Penulis : {{ item.user.name }}</span
                      >
                      <span v-else class="pa-2 mr-auto"> Penulis : Sidigs</span>
                      <v-btn
                        v-if="item.likes != null && item.likes.is_likes == 1"
                        icon
                        color="red"
                        class="pa-2"
                        style="height: 50px; width: 50px"
                        @click="likeSchool(item.id)"
                      >
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn
                        v-else
                        icon
                        class="pa-2"
                        style="height: 50px; width: 50px"
                        @click="likeAll(item.id)"
                      >
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <span class="pt-3">
                        {{ item.likes_count_count }} like</span
                      >
                    </v-row>
                    <p class="mx-5 content-font mb-5">
                      Link : <a :href="`${item.link}`">{{ item.link }}</a>
                    </p>
                    <v-col cols="12" class="mt-2 justify-center">
                      <article
                        class="ml-2 content-font mb-5"
                        v-html="item.description"
                      ></article>
                      <input class="expand" type="checkbox" />
                      <hr />
                    </v-col>
                  </v-col>
                  <!-- Pagination Button -->
                  <v-row class="d-flex mb-6 ml-5 mr-5 mt-3 mb-5">
                    <v-btn
                      v-if="edutainmentAll.prev_page_url != null"
                      :class="`${$config.mainColor}`"
                      class="ma-2 white--text pa-2 mr-auto"
                      @click="prevPageAll()"
                    >
                      <v-icon left dark> mdi-arrow-left </v-icon>
                      Prev
                    </v-btn>

                    <v-btn
                      v-if="edutainmentAll.next_page_url != null"
                      :class="`${$config.mainColor}`"
                      class="ma-2 white--text pa-2 ml-auto"
                      @click="nextPageAll()"
                    >
                      next
                      <v-icon right dark> mdi-arrow-right </v-icon>
                    </v-btn>
                  </v-row>
                </v-tab-item>

                <v-tab-item value="tabs-2">
                  <v-col
                    class="col-style mt-3"
                    v-for="item in edutainmentSchool.data"
                    :key="item.id"
                    :id="item.id"
                  >
                    <v-col class="d-flex justify-center">
                      <h1 class="profile-style">{{ item.title }}</h1>
                    </v-col>

                    <v-container class="d-flex justify-center">
                      <v-img
                        :lazy-src="`${item.thumbnail}`"
                        max-width="500"
                        :src="`${item.thumbnail}`"
                      ></v-img>
                    </v-container>

                    <v-row class="d-flex mb-6 ml-3 mr-3 mt-3">
                      <span v-if="item.user.name != '-'" class="pa-2 mr-auto">
                        Penulis : {{ item.user.name }}</span
                      >
                      <span v-else class="pa-2 mr-auto"> Penulis : Sidigs</span>
                      <v-btn
                        v-if="item.likes != null && item.likes.is_likes == 1"
                        icon
                        color="red"
                        class="pa-2"
                        style="height: 50px; width: 50px"
                        @click="likeSchool(item.id)"
                      >
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn
                        v-else
                        icon
                        class="pa-2"
                        style="height: 50px; width: 50px"
                        @click="likeSchool(item.id)"
                      >
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <span class="pt-3">
                        {{ item.likes_count_count }} like</span
                      >
                    </v-row>
                    <p class="mx-5 content-font mb-5">
                      Link : <a :href="`${item.link}`">{{ item.link }}</a>
                    </p>
                    <v-col cols="12" class="mt-2 justify-center">
                      <article
                        class="ml-2 content-font mb-5"
                        v-html="item.description"
                      ></article>
                      <input class="expand" type="checkbox" />
                      <hr />
                    </v-col>
                  </v-col>
                  <!-- Pagination Button -->
                  <v-row class="d-flex mb-6 ml-5 mr-5 mt-3 mb-5">
                    <v-btn
                      v-if="edutainmentSchool.prev_page_url != null"
                      :class="`${$config.mainColor}`"
                      class="ma-2 white--text pa-2 mr-auto"
                      @click="prevPageSchool()"
                    >
                      <v-icon left dark> mdi-arrow-left </v-icon>
                      Prev
                    </v-btn>

                    <v-btn
                      v-if="edutainmentSchool.next_page_url != null"
                      :class="`${$config.mainColor}`"
                      class="ma-2 white--text pa-2 ml-auto"
                      @click="nextPageSchool()"
                    >
                      next
                      <v-icon right dark> mdi-arrow-right </v-icon>
                    </v-btn>
                  </v-row>
                </v-tab-item>

                <v-tab-item value="tabs-3">
                  <v-col
                    class="col-style mt-3"
                    v-for="item in edutainmentSidigs.data"
                    :key="item.id"
                    :id="item.id"
                  >
                    <v-col class="d-flex justify-center">
                      <h1 class="profile-style">{{ item.title }}</h1>
                    </v-col>

                    <v-container class="d-flex justify-center">
                      <v-img
                        :lazy-src="`${item.thumbnail}`"
                        max-width="500"
                        :src="`${item.thumbnail}`"
                      ></v-img>
                    </v-container>

                    <v-row class="d-flex mb-6 ml-3 mr-3 mt-3">
                      <span v-if="item.user.name != '-'" class="pa-2 mr-auto">
                        Penulis : {{ item.user.name }}</span
                      >
                      <span v-else class="pa-2 mr-auto"> Penulis : Sidigs</span>
                      <v-btn
                        v-if="item.likes != null && item.likes.is_likes == 1"
                        icon
                        color="red"
                        class="pa-2"
                        style="height: 50px; width: 50px"
                        @click="likeSchool(item.id)"
                      >
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn
                        v-else
                        icon
                        class="pa-2"
                        style="height: 50px; width: 50px"
                        @click="likeSidigs(item.id)"
                      >
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <span class="pt-3">
                        {{ item.likes_count_count }} like</span
                      >
                    </v-row>
                    <p class="mx-5 content-font mb-5">
                      Link : <a :href="`${item.link}`">{{ item.link }}</a>
                    </p>
                    <v-col cols="12" class="mt-2 justify-center">
                      <article
                        class="ml-2 content-font mb-5"
                        v-html="item.description"
                      ></article>
                      <input class="expand" type="checkbox" />
                      <hr />
                    </v-col>
                  </v-col>
                  <!-- Pagination Button -->
                  <v-row class="d-flex mb-6 ml-5 mr-5 mt-3 mb-5">
                    <v-btn
                      v-if="edutainmentSidigs.prev_page_url != null"
                      :class="`${$config.mainColor}`"
                      class="ma-2 white--text pa-2 mr-auto"
                      @click="prevPageSidigs()"
                    >
                      <v-icon left dark> mdi-arrow-left </v-icon>
                      Prev
                    </v-btn>

                    <v-btn
                      v-if="edutainmentSidigs.next_page_url != null"
                      :class="`${$config.mainColor}`"
                      class="ma-2 white--text pa-2 ml-auto"
                      @click="nextPageSidigs()"
                    >
                      next
                      <v-icon right dark> mdi-arrow-right </v-icon>
                    </v-btn>
                  </v-row>
                </v-tab-item>
              </v-tabs-items>
            </template>
          </TabCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import TabCard from "~/components/dashboard/TabCard.vue";
import WelcomeCard from "~/components/dashboard/WelcomeCard.vue";
import TitleCard from "~/components/TitleCard.vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Edutainment",
    };
  },
  data() {
    return {
      userProfileTabs: null,
    };
  },
  components: {
    TabCard,
    TitleCard,
    WelcomeCard,
  },
  created() {
    this.getListEduAll();
    this.getListEduSchool();
    this.getListEduSidigs();
  },
  methods: {
    ...mapActions("edutainment", [
      "getListEduAll",
      "getListEduSchool",
      "getListEduSidigs",
    ]),
    ...mapMutations("edutainment", [
      "set_page_all",
      "set_page_school",
      "set_page_sidigs",
    ]),

    nextPageAll() {
      let page = this.pageAll;
      page++;
      this.set_page_all(page);
      this.getListEduAll();
    },
    prevPageAll() {
      let page = this.pageAll;
      page--;
      this.set_page_all(page);
      this.getListEduAll();
    },

    nextPageSchool() {
      let page = this.pageSchool;
      page++;
      this.set_page_all(page);
      this.getListEduAll();
    },
    prevPageSchool() {
      let page = this.pageSchool;
      page--;
      this.set_page_all(page);
      this.getListEduAll();
    },

    nextPageAll() {
      let page = this.pageSidigs;
      page++;
      this.set_page_all(page);
      this.getListEduAll();
    },
    prevPageAll() {
      let page = this.pageSidigs;
      page--;
      this.set_page_all(page);
      this.getListEduAll();
    },

    likeSchool(id) {
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      this.$axios
        .$get(`magazines/likes/${id}`, config)
        .then((res) => {
          this.getListEduSchool();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    likeAll(id) {
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      this.$axios
        .$get(`magazines/likes/${id}`, config)
        .then((res) => {
          this.getListEduAll();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    likeSidigs(id) {
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      this.$axios
        .$get(`magazines/likes/${id}`, config)
        .then((res) => {
          this.getListEduSidigs();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState("edutainment", [
      "edutainmentAll",
      "edutainmentSchool",
      "edutainmentSidigs",
      "pageAll",
      "pageSchool",
      "pageSidigs",
    ]),
    ...mapState("auth", ["token"]),
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

article {
  --max-lines: 3;
  --line-height: 1.4;
  max-height: calc(var(--max-lines) * 1em * var(--line-height));
  line-height: var(--line-height);
  overflow: hidden;
  position: relative;
  white-space: pre-wrap;
}

.expand {
  appearance: none;
  /* border: 1px solid black; */
  padding: 0.4em;
  border-radius: 0.25em;
  cursor: pointer;
  margin-bottom: 1rem;
  /* background-color: rgb(51, 51, 51); */
  background-color: #8fb314;
  color: white;
  font-weight: 500;
}

.expand:hover {
  background-color: #649c0a;
  transition: 0.3s;
}

.expand::before {
  content: "Baca Selengkapnya";
}

.expand:checked::before {
  content: "Urungkan";
}

article:has(+ .expand:checked) {
  max-height: none;
}
</style>
