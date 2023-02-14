<template>
  <div v-if="contact" class="contact-details">
    <h2>{{ contact.name }}</h2>
    <h3>{{ contact.email }}</h3>
    <h3>{{ contact.phone }}</h3>
    <h3>{{ contact.balance }}</h3>
    <RouterLink to="/contact">
      <button class="prim-btn">Back</button>
    </RouterLink>
    <TranferFunds :contact="contact" />
  </div>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import TranferFunds from "./../cmps/transfer-funds.vue";
export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    this.contact = await contactService.getById(contactId);
  },
  components: { TranferFunds },
};
</script>

<style lang="scss"></style>
