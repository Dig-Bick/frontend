<template>
  <div class="statistics-container">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalUsers: 0,
      totalPosts: 0,
      activeUsers: 0,
      totalPageViews: 0,
      myChart: null,
    };
  },
  methods: {
    initChart() {
      if (!this.myChart) {
        // Use this.$echarts instead of echarts
        this.myChart = this.$echarts.init(document.getElementById('main'), 'light');
      }
      const option = {
        title: {
          text: '统计数据',
        },
        tooltip: {},
        legend: {
          data: ['Statistics'],
        },
        xAxis: {
          data: ['用户总数', '帖子总数', '活跃用户', '总浏览量'],
        },
        yAxis: {},
        series: [
          {
            name: '数据',
            type: 'bar',
            data: [this.totalUsers, this.totalPosts, this.activeUsers, this.totalPageViews],
          },
        ],
      };
      this.myChart.setOption(option);
    },
    updateChart() {
      if (this.myChart) {
        const option = this.myChart.getOption();
        option.series[0].data = [this.totalUsers, this.totalPosts, this.activeUsers, this.totalPageViews];
        this.myChart.setOption(option);
      }
    },
    async fetchStatistics() {
      try {
        const response = await this.$http.get('/api/statistics');
        this.totalUsers = response.data.totalUsers;
        this.totalPosts = response.data.totalPosts;
        this.activeUsers = response.data.activeUsers;
        this.totalPageViews = response.data.totalPageViews;
        this.updateChart();
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    },
  },
  async created() {
    await this.fetchStatistics();
    this.initChart();
  },
  beforeUnmount() {
    if (this.myChart) {
      // Dispose the instance before the component is unmounted to prevent memory leaks
      this.myChart.dispose();
      this.myChart = null;
    }
  },
};
</script>

<style scoped>
.statistics-container {
  margin: 20px;
}
</style>
