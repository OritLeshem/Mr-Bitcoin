<template>
  <div class="rate-info">
    <span class="fa-solid bitcoin-sign"></span> /
    <span class="fa-solid dollar-sign"></span> <span>{{ bitcoinRate }}</span>
  </div>
  <div v-if="user" class="user-detail">
    <div class="user-info">
      <p>{{ user.name }}</p>
      <p>{{ user.balance }}</p>
    </div>
    <!-- <img class="user-img" src="../../public/imgs/3.jpeg"  alt="" />
      <img class="user-img" src="https://robohash.org/aa"  alt="" /> -->
    <img
      class="user-img"
      v-bind:src="'https://robohash.org/' + user.name"
      alt=""
    />
  </div>
</template>

<script>
import { userService } from "@/services/user.service.js";
import { bitcoinService } from "@/services/bitcoin.service.js";

export default {
  data() {
    return {
      // user: null,
      bitcoinRate: null,
    };
  },
  async created() {
    // const contactId = this.$route.params._id;
    // this.user = await userService.getUser();
    this.bitcoinRate = await bitcoinService.getRate();
  },

  components: {},
  computed: {
    user() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>

<style lang="scss"></style>
