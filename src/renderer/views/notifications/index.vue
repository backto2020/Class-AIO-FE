<template>
  <div>
    <el-card v-for="info in notification_list" :key="info.id" class="noti-card">
      <div slot="header" class="clearfix">
        <el-tag v-if="info.type === '紧急'" type="danger">{{ info.type }}</el-tag>
        <el-tag v-else>{{ info.type }}</el-tag>
        <span>{{ info.title }}</span>
      </div>
      <div class="noti-time">{{ info.timeString }}</div>
      <div class="noti-content">{{ info.content }}</div>
    </el-card>
  </div>
</template>
<script>
import t2s from '../../utils/t2s';
import { getNotiList } from '../../api/noti';

export default {
  data() {
    return {
      notification_list: null
    };
  },
  created() {
    getNotiList().then(res => {
      this.notification_list = res.data
        .map(x => {
          return { ...x, timeString: t2s(new Date(x.time)) };
        })
        .sort((a, b) => {
          return new Date(b.time).valueOf() - new Date(a.time).valueOf();
        });
    });
  }
};
</script>
<style scoped>
.noti-card {
  margin: 30px;
}
.noti-time {
  margin-bottom: 10px;
  color: gray;
}
.clearfix::before,
.clearfix::after {
  display: table;
  content: '';
}
.clearfix::after {
  clear: both;
}
</style>
