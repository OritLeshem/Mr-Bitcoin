<template>
  <div class="main-container-contact">
    <UserMsg />
    <ContactFilter @filter="onSetFilterBy" />
    <RouterLink to="/contact/edit"
      ><button class="add-contact prim-btn">Add a Contact</button></RouterLink
    >
    <ContactList
      @remove="removeContact"
      v-if="contacts"
      :contacts="filteredContacts"
    />
  </div>
</template>

<script>
import { eventBus } from "@/services/eventBus.service.js";
import ContactList from "@/cmps/contact-list.vue";
import ContactFilter from "@/cmps/contact-filter.vue";
import UserMsg from "@/cmps/user-msg.vue";

export default {
  data() {
    return {
      // contacts: null,
      filterBy: {},
    };
  },
  async created() {
    this.$store.dispatch({ type: "loadContacts" });
  },
  methods: {
    async removeContact(contactId) {
      const msg = {
        txt: `Contact ${contactId} deleted.`,
        type: "success",
        timeout: 2500,
      };
      this.$store.dispatch({ type: "removeContact", contactId });

      // await contactService.deleteContact(contactId)
      // this.contacts = this.contacts.filter(contact => contact._id !== contactId)
      eventBus.emit("user-msg", msg);
    },
    onSetFilterBy(filterBy) {
      // this.filterBy = filterBy
      this.$store.dispatch({ type: "loadContacts", filterBy });
    },
  },
  computed: {
    //   contacts() { return this.$store.state.contactStore.contacts },

    contacts() {
      return this.$store.getters.contacts;
    },

    filteredContacts() {
      const regex = new RegExp(this.filterBy.txt, "i");
      return this.contacts.filter((contact) => regex.test(contact.name));
    },
  },
  components: {
    ContactList,
    ContactFilter,
    UserMsg,
  },
};
</script>


