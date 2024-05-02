<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="10" sm="8" md="6">
        <LoginCard>
          <v-form ref="form" @submit.prevent="_handleLoginClick()" class="mb-5">
            <v-text-field
              prepend-inner-icon="mdi-account"
              color="light-green darken-1"
              v-model="username"
              label="Username"
              type="text"
              required
            ></v-text-field>

            <v-text-field
              prepend-inner-icon="mdi-key"
              color="light-green darken-1"
              class="mb-10"
              v-model="password"
              label="Password"
              :type="show3 ? 'text' : 'password'"
              required
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show3 = !show3"
            ></v-text-field>

            <v-flex text-center align-center>
              <v-btn
                width="80%"
                :class="`${$config.mainColor}`"
                class="white--text"
                type="submit"
              >
                LOGIN
              </v-btn>
            </v-flex>
          </v-form>
        </LoginCard>
      </v-col>
    </v-row>

    <!-- <v-dialog v-model="messageDialog" max-width="450px">
      <v-card>
        <v-container>
          <v-card-text class="text-center">
            {{ message ? message : '' }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red lighten-1" text @click="messageDialog = false">
              Tutup
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog> -->

    <v-snackbar v-model="messageDialog" timeout="2000">
      {{ message ? message : "" }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="messageDialog = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import LoginCard from "~/components/LoginCard.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Login",
    };
  },
  data() {
    return {
      messageDialog: false,
      show3: false,
    };
  },
  middleware: "guest",
  layout: "login",
  components: { LoginCard },
  methods: {
    ...mapActions("auth", ["login"]),
    ...mapMutations("auth", [
      "set_credentials",
      "set_username",
      "set_password",
    ]),

    _handleLoginClick() {
      this.set_credentials(this.credentials);
      this.login(({ isSuccess, response }) => {
        if (isSuccess) {
          this.$store.commit("auth/reset_credentials");
          this.$router.push("/");
        } else {
          this.messageDialog = true;
        }
      });
    },
  },
  computed: {
    ...mapState("auth", ["credentials", "message"]),
    ...mapState(["school"]),

    username: {
      get() {
        return this.credentials.username;
      },
      set(value) {
        this.set_username(value);
      },
    },
    password: {
      get() {
        return this.credentials.password;
      },
      set(value) {
        this.set_password(value);
      },
    },
  },
};
</script>

<style>
label {
  color: #526789;
  font-weight: 500;
}
</style>
