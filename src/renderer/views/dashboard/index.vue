<template>
  <el-card class="dashboard-container">
    <div style="margin-bottom: 20px;">
      <div class="dashboard-text">姓名：{{ name }}</div>
      <div class="dashboard-text">学号：{{ sid }}</div>
      <div class="dashboard-text">用户名：{{ username }}</div>
    </div>
    <course-table :usualCourses="courseList" :width="800" :height="600" />
    <el-button @click="handleSelectCourseBtn" style="margin-top: 20px;">编辑选课</el-button>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex';
import CourseTable from './components/CourseTable.vue';
import { getSelectedCourseList } from '@/api/course';

export default {
  name: 'dashboard',
  components: { CourseTable },
  computed: {
    ...mapGetters(['name', 'sid', 'username'])
  },
  data() {
    return {
      courseList: []
    };
  },
  created() {
    this.initCourseList();
  },
  methods: {
    handleSelectCourseBtn() {
      this.$router.push('/courses');
    },
    initCourseList() {
      getSelectedCourseList().then(res => {
        this.courseList = res.data;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 40px;
  }
  &-text {
    font-size: 22px;
    line-height: 30px;
  }
}
</style>
