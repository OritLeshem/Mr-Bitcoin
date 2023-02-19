<template>
  <div>
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
    <div class="rate-info wide-menu">
      <span class="fa-solid bitcoin-sign"></span> /
      <span class="fa-solid dollar-sign"></span> <span>{{ bitcoinRate }}</span>
    </div>
  </div>
</template>

<script>
import { bitcoinService } from "@/services/bitcoin.service.js";
import { userService } from "@/services/user.service.js";

export default {
  data() {
    return {
      user: null,
      bitcoinRate: null,
    };
  },
  async created() {
    this.bitcoinRate = await bitcoinService.getRate();
    this.user = await userService.getLoggedinUser();
    // this.user = await this.$store.getters.loggedInUser;
  },
};
</script>

<style lang="scss"></style>
