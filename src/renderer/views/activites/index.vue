<template>
  <div>
    <el-card v-for="info in activity_list" :key="info.id" class="acti-card">
      <div slot="header" class="clearfix">
        <span>{{ info.title }}</span>
        <el-button
          v-if="info.signin"
          :disabled="info.beginTime > new Date() || new Date() > info.endTime"
          style="float: right; padding: 3px 0"
          type="text"
        >
          {{
            info.beginTime <= new Date() && new Date() <= info.endTime ? '签到' : '未在活动时间段内'
          }}
        </el-button>
      </div>
      <div class="acti-time">{{ t2s(info.beginTime) }} - {{ t2s(info.endTime) }}</div>
      <div class="acti-content">{{ info.content }}</div>
    </el-card>
  </div>
</template>
<script>
import t2s from '../../utils/t2s';
export default {
  data() {
    return {
      activity_list: null
    };
  },
  methods: {
    t2s
  },
  created() {
    console.log('hello');
    // TODO: query
    this.activity_list = Array(10)
      .fill(null)
      .map((x, i) => {
        return {
          id: i - 10,
          title: 'Activity Name',
          signin: i % 2 === 0,
          beginTime:
            i % 4
              ? new Date().valueOf() - 1000 * 60 * 60 * 1
              : new Date().valueOf() + 1000 * 60 * 60 * 1,
          endTime:
            i % 4
              ? new Date().valueOf() + 1000 * 60 * 60 * 1
              : new Date().valueOf() + 1000 * 60 * 60 * 2,
          content: 'som content'
        };
      });
  }
};
</script>
<style scoped>
.acti-card {
  margin: 30px;
}
.acti-time {
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
