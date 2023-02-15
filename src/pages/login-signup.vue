<template>
  <form @submit.prevent="onSave" class="user-signup">
    <input type="text" v-model="user.name" />

    <button>Signup</button>
  </form>
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
        await this.$store.dispatch({
          type: "saveUser",
          user: this.user,
        });
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
