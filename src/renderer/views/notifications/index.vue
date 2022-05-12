<template>
  <div>
    <el-card v-for="info in notification_list" :key="info.id" class="noti-card">
      <div slot="header" class="clearfix">
        <span>{{ info.title }}</span>
      </div>
      <div class="noti-time">{{ info.timeString }}</div>
      <div class="noti-content">{{ info.content }}</div>
    </el-card>
  </div>
</template>
<script>
import t2s from '../../utils/t2s';

export default {
  data() {
    return {
      notification_list: null
    };
  },
  created() {
    // TODO: query
    this.notification_list = Array(10)
      .fill(null)
      .map((x, i) => {
        return {
          id: i - 10,
          title: 'This is a title.',
          time: new Date().valueOf(),
          content: 'some content'
        };
      });
    this.notification_list = this.notification_list.map(x => {
      return {
        ...x,
        timeString: t2s(new Date(x.time))
      };
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
