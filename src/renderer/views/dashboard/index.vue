<template>
  <el-card class="dashboard-container">
    <div class="dashboard-text">姓名：{{ name }}</div>
    <div class="dashboard-text">学号：{{ sid }}</div>
    <div class="dashboard-text">用户名：{{ username }}</div>
    <course-table :usualCourses="courseList" :width="800" :height="600" />
    <el-button @click="handleSelectCourseBtn">编辑选课</el-button>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex';
import CourseTable from './components/CourseTable.vue';

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
    this.courseList = [
      {
        day: 3,
        teacher: '张三',
        period: 7,
        length: 2,
        name: '数据结构',
        room: '4-201'
      },
      {
        day: 1,
        period: 1,
        length: 2,
        name: '大学物理',
        room: '4-201'
      },
      {
        day: 2,
        period: 7,
        length: 2,
        name: '程序设计',
        room: '4-201'
      },
      {
        day: 4,
        period: 5,
        length: 4,
        name: '交通实验',
        room: '理西201'
      }
    ];
  },
  methods: {
    handleSelectCourseBtn() {
      this.$router.push('/courses');
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
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
