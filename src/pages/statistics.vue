<template>
  <div class="statistics">
    <div v-if="bitcoinHistory">
      <h1>History</h1>
      <!-- <BarChart :bitcoinMarketPriceHistory="bitcoinHistory"/> -->
      <LineChart :dataLine="bitcoinHistory" />
    </div>
    <div v-if="bitcoinAvg">
      <h1>Avarage</h1>
      <!-- <BarChart :bitcoinMarketPriceHistory="bitcoinAvg"/> -->

      <LineChart :dataLine="bitcoinAvg" />
    </div>
  </div>
</template>

<script>
import { userService } from "@/services/user.service.js";
import { bitcoinService } from "@/services/bitcoin.service.js";
import BarChart from "@/cmps/bar-chart.vue";
import LineChart from "@/cmps/line-chart.vue";

export default {
  data() {
    return {
      user: null,
      bitcoinRate: null,
      bitcoinHistory: null,
      bitcoinAvg: null,
    };
  },
  async created() {
    // const contactId = this.$route.params._id;
    this.user = await userService.getUser();
    this.bitcoinRate = await bitcoinService.getRate();
    this.bitcoinHistory = await bitcoinService.getMarketPriceHistory();
    this.bitcoinAvg = await bitcoinService.getAvgBlockSize();
  },
  components: {
    BarChart,
    LineChart,
  },
};
</script>

<style lang="scss"></style>
