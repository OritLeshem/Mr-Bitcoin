<template>
  <div class="transfer-funds">
    <div class="your-balance">
      Your balance is :
      <h2>{{ user.balance }} bitcoins</h2>
    </div>

    <div class="your-transfer">
      how much Bitcoin would you like to transfer to
      {{ contact.name }} ?
    </div>
    <form @submit.prevent="onTransfer(transfer)">
      <input type="number" v-model="transfer" />
      <button class="prim-btn">Transfer</button>
    </form>
  </div>
</template>

<script>
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
      // return this.$store.state.userStore.user;
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    async onTransfer() {
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
    },
  },
};
</script>

<style>
</style>