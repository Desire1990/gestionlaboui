<template>
  <div class="center-chart">
    <apexchart width="600" type="pie" :options="chartOptions" :series="series">
    </apexchart>
  </div>
</template>

<script>
export default {
  name: "Apex charts",
  data: () => ({
    chartOptions: {
      chart: {
        id: "apexchart-example",
      },
      title: {
        text: "Commande distribution",
        align: "center",
        margin: 40,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
      colors: ['#2E93fA', '#46DA62', '#242E8A', '#E91E63', '#FF9800'],
      dataLabels: {
         enabled: true,
      },
      legend: {
        show: true,
        position: 'bottom',
      },
        labels: ["Apple", "Mango", "Orange", "Watermelon"],
    },
    series: [44, 55, 41, 17],
  }),
};
</script>
<style scoped>
.center-chart {
display: flex;
align-items: center;
justify-content: center;
}
</style>