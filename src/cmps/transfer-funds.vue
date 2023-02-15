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
  computed: {
    user() {
      let user = this.$store.state.userStore.user;
      // let user = userService.getLoggedinUser();
      console.log(" user from trasfer", user);
      return user;
    },
  },
  methods: {
    async onTransfer(transfer) {
      // await userService.transferFunds(transfer);
      try {
        await this.$store.dispatch({
          type: "saveTransfer",
          user: this.user,
          transfer: this.transfer,
        });
        this.transfer = "";
      } catch (error) {
        console.log("error", error);
      }
      //  finally {
      //   this.$router.push("/contact");
      // }
    },
  },
};
</script>

<style>
</style>