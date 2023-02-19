<template>
  <div
    class="main-screen"
    v-if="isShowModal"
    @click="isShowModal = !isShowModal"
  ></div>
  <Transition>
    <header class="mobile-menu" v-if="isShowModal">
      <main class="main-header">
        <h1 class="logo-mobile fa-solid bitcoin-sign"></h1>
        <nav>
          <RouterLink
            @click="isShowModal = !isShowModal"
            class="mobile-header-link"
            to="/"
            >Home</RouterLink
          >
          <RouterLink
            @click="isShowModal = !isShowModal"
            class="mobile-header-link"
            to="/contact"
            >Contacts</RouterLink
          >
          <RouterLink
            @click="isShowModal = !isShowModal"
            class="mobile-header-link"
            to="/stat"
            >Stat</RouterLink
          >
          <RouterLink
            @click="isShowModal = !isShowModal"
            class="mobile-header-link"
            to="/loginSignup"
            v-if="!user"
            >Login/Signup</RouterLink
          >
          <RouterLink
            class="mobile-header-link"
            to="/loginSignup"
            v-if="user"
            @click="onLogout"
            >Logout</RouterLink
          >
        </nav>
        <UserDetail v-if="user" />
      </main>
    </header>
  </Transition>
  <header class="app-header main-layout full" v-if="!isShowModal">
    <main class="main-header">
      <h1 class="logo fa-solid bitcoin-sign"></h1>
      <button
        class="menu-toggle-btn fa-solid bars"
        @click="isShowModal = !isShowModal"
      ></button>
      <nav class="wide-menu">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contact">Contacts</RouterLink>
        <RouterLink to="/stat">Rates</RouterLink>
        <RouterLink to="/loginSignup" v-if="!user">Login/Signup</RouterLink>
        <button v-if="user" @click="onLogout">Logout</button>
      </nav>
      <!-- <div class="wide-menu" v-if="user">
        <div class="rate-info wide-menu">
          <span class="fa-solid bitcoin-sign"></span> /
          <span class="fa-solid dollar-sign"></span>
          <span>{{ bitcoinRate }}</span>
        </div>
        <div v-if="user" class="user-detail wide-menu">
          <div class="user-info wide-menu">
            <p>{{ user.name }}</p>
            <p>{{ user.balance }}</p>
          </div>
          <img
            class="user-img wide-menu"
            v-bind:src="'https://robohash.org/' + user.name"
            alt=""
          />
        </div>
      </div> -->
      <UserDetail class="wide-menu" v-if="user" />
    </main>
  </header>
</template>

<script>
import UserDetail from "./user-detail.vue";

export default {
  data() {
    return {
      isShowModal: false,
    };
  },
  methods: {
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
  // async created() {
  //   this.user = await this.$store.getters.loggedInUser;
  //   console.log("appheader user", this.user);
  // },
  computed: {
    user() {
      return this.$store.getters.loggedInUser;
    },
  },
  components: { UserDetail },
};
</script>
// <style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  translate: 150%;
}
</style>
