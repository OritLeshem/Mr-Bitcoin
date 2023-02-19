<template >
  <div class="login-signup">
    <h1>Sign up</h1>
    <form @submit.prevent="onSave">
      <input type="text" placeholder="Enter your name" v-model="user.name" />

      <button class="prim-btn">Signup</button>
    </form>
  </div>
</template>

<script>
import { userService } from "@/services/user.service.js";
export default {
  data() {
    return {
      user: {},
    };
  },
  async created() {
    this.user = userService.getEmptyUser();
  },
  methods: {
    async onSave() {
      try {
        this.user = await this.$store.dispatch({
          type: "signup",
          user: this.user,
        });
        console.log("signup user", this.user);
        this.$router.push("/");
      } catch (error) {
        console.log("error", error);
      } finally {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss"></style>
