<template>
  <div>
    Your balance is :
    <h2>{{ user.balance }}</h2>
  </div>
  <div>
    how much Bitcoin would you like to transfer to
    {{ contact.name }} ?
  </div>
  <form @submit.prevent="onTransfer(transfer)">
    <input type="number" v-model="transfer" />
  </form>
</template>

<script>
import { userService } from "@/services/user.service.js";

export default {
  props: {
    contact: {
      type: Object,
    },
  },
  data() {
    return {
      transfer: 0,
    };
  },
  methods: {
    async onTransfer(transfer) {
      // await userService.transferFunds(transfer);
      try {
        await this.$store.dispatch({
          type: "saveUser",
          user: this.user,
        });
      } catch (error) {
        console.log("error", error);
      }
      //  finally {
      //   this.$router.push("/");
      // }
    },
  },

  computed: {
    user() {
      return this.$store.state.userStore.user;
    },
  },
};
</script>

<style>
</style>