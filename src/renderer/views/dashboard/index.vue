<template>
  <el-card class="dashboard-container">
    <div class="dashboard-text">姓名：{{ name }}</div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters(['name', 'uid', 'username'])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 40px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
