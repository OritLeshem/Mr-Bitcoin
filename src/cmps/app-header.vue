<template>
  <header class="app-header main-layout full">
    <main>
      <h1 class="logo fa-solid bitcoin-sign"></h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contact">Contacts</RouterLink>
        <RouterLink to="/stat">Stat</RouterLink>
        <RouterLink to="/loginSignup" v-if="!user">Login/Signup</RouterLink>
        <button v-if="user" @click="onLogout">Logout</button>
      </nav>
      <UserDetail v-if="user" />
    </main>
  </header>
</template>

<script>
import UserDetail from "./user-detail.vue";

export default {
  data() {
    return {
      // contacts: null,
      showModal: false,
      dynmicClass: null,
    };
  },
  methods: {
    onToggle() {
      this.isBar = !this.isBar;
      this.dynmicClass = `${this.isBar}?'mobile-menu':''`;
    },
    async onLogout() {
      console.log("appheader logout");
      try {
        await this.$store.dispatch({
          type: "logoutUser",
          user: null,
        });
      } catch (error) {
        console.log("error", error);
      } finally {
        this.$router.push("/");
      }
    },
  },

  computed: {
    user() {
      return this.$store.state.userStore.user;
    },
  },
  components: { UserDetail },
};
</script>
