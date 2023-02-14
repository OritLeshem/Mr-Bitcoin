<template>
<div ><Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  /></div>
  
</template>

<script>
import { bitcoinService } from "@/services/bitcoin.service.js";

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    bitcoinMarketPriceHistory: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartData: {
        labels: this.bitcoinMarketPriceHistory.map((row) => row.x),
        datasets: [
          { data: this.bitcoinMarketPriceHistory.map((row) => row.y) ,
           backgroundColor: '#4bc0c0'},
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },

}
</script>