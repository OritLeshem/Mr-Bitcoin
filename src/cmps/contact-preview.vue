<template>
  <article>
    <img
      class="user-img"
      v-bind:src="'https://robohash.org/' + contact.name + '?set=set5'"
      alt=""
    />
    <!-- <img class="user-img" v-bind:src="'https://randomuser.me/api/portraits/men/93.jpg'"  alt="" />
                <img class="user-img" v-bind:src="contact.picture"  alt="" /> -->

    <h3>{{ contact.name }}</h3>
    <h5>{{ contact.email }}</h5>
    <h4>{{ contact.phone }}</h4>
  </article>
</template>

<script>
import { contactService } from "@/services/contact.service.js";

export default {
  props: {
    contact: {
      type: Object,
      required: true,
      // picture:contactService.getUserPic()
    },
  },
};
</script>

<style lang="scss"></style>
