<template>
  <form @submit.prevent="onSave(contact)" v-if="contact" class="contact-edit">
    <input type="text" placeholder="Enter name" v-model="contact.name" />
    <input type="email" placeholder="Enter email" v-model="contact.email" />
    <button class="light-btn cheap-btn">Save</button>
  </form>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    if (contactId) {
      this.contact = await contactService.getById(contactId);
    } else {
      this.contact = contactService.getEmptyContact();
    }
  },
  methods: {
    // async onSave(contact) {
    //     //  await contactService.saveContact(this.contact)
    //     const contactToSave={...contact}
    //     this.$store.dispatch({type: 'saveContact', contact: contactToSave})

    //     this.$router.push('/contact')
    // }
    async onSave() {
      try {
        await this.$store.dispatch({
          type: "saveContact",
          contact: this.contact,
        });
      } catch (error) {
        console.log("error", error);
      } finally {
        this.$router.push("/contact");
      }
    },
  },
};
</script>

<style lang="scss"></style>
