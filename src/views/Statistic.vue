
<template>
  <div id="chart">
    <apexchart
      type="line"
      height="300"
      width="1000"
      :options="chartOptions"
      :series="series"
    />
    <apexchart
      type="bar"
      height="300"
      width="1000"
      :options="chartOptions"
      :series="series"
    />
    <pie/>
  </div>
</template>

<script>
import Pie from "@/components/Pie"
export default {
  name: "DailyAnalysis",
  components:{
  	Pie
  },
  data: function () {
    return {
      series: [
        {
          name: "value",
          data: this.generateDayWiseTimeSeries(
            new Date("10 Jan 2022").getTime(),
            185,
            {
              min: 10,
              max: 90,
            }
          ),
        },
      ],
      chartOptions: {
        chart: {
          id: "chart",
          toolbar: {
            autoSelected: "pan",
            show: false,
          },
          responsive: true,
        },
        colors: ["#00bbf4"],
        stroke: {
          width: 4,
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          x: {
            show: true,
            format: "dd MMM yyyy",
            formatter: undefined,
          },
        },
        fill: {
          opacity: 1,
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
        },
      },
    };
  },

  methods: {
    generateDayWiseTimeSeries: function (baseval, count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = baseval;
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;
        
        series.push([x, y]);
        baseval += 86400000;
        i++;
      }
      return series;
    },
  },
};
</script>
