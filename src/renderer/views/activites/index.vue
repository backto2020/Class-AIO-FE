<template>
  <div>
    <el-card v-for="info in activity_list" :key="info.id" class="acti-card">
      <div slot="header" class="clearfix">
        <span>{{ info.title }}</span>
        <el-button
          v-if="info.login == 1 || info.login == 2"
          :disabled="info.begin > new Date() || new Date() > info.end || info.login == 2"
          style="float: right; padding: 3px 0"
          type="text"
        >
          {{
            info.login == 2
              ? '已签到'
              : info.begin <= new Date() && new Date() <= info.end
              ? '签到'
              : '未在活动时间段内'
          }}
        </el-button>
      </div>
      <div class="acti-time">{{ t2s(info.begin) }} - {{ t2s(info.end) }}</div>
      <div class="acti-content">{{ info.content }}</div>
    </el-card>
  </div>
</template>
<script>
import { getActiList } from '../../api/acti';
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
    getActiList().then(res => {
      this.activity_list = res.data.map(x => {
        return {
          ...x,
          begin: new Date(x.begin),
          end: new Date(x.end)
        };
      });
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
