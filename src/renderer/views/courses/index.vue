<template>
  <div style="margin: 20px;">
    <el-table ref="multipleTable" :data="courseList" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="课程">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="teacher" label="教师" width="120"></el-table-column>
      <el-table-column prop="room" label="上课地点" show-overflow-tooltip></el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="cancelSelection">
        放弃
      </el-button>
      <el-button @click="commitSelection">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getAllCourseList, getSelectedCourseList, selectCourses } from '@/api/course';

export default {
  name: 'CourseSelector',
  created() {
    this.initCourseList();
  },
  updated() {
    this.toggleSelectedCourses();
  },
  data() {
    return {
      selectedCids: [],
      courseList: []
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    cancelSelection() {
      this.$alert('放弃编辑？', '', {
        confirmButtonText: '确定'
      }).then(
        () => {
          this.$router.push('/dashboard');
        },
        () => {
          this.$router.push('/dashboard');
        }
      );
    },
    commitSelection() {
      const selectedCids = this.$refs.multipleTable.selection.map(item => item.id);
      selectCourses({ select: selectedCids }).then(res => {
        this.$alert(res.message, '', {
          confirmButtonText: '确定',
          type: 'success'
        }).then(
          () => {
            this.$router.push('/dashboard');
          },
          () => {
            this.$router.push('/dashboard');
          }
        );
      });
    },
    initCourseList() {
      getAllCourseList().then(res => {
        this.courseList = res.data;
      });
    },
    toggleSelectedCourses() {
      getSelectedCourseList().then(res => {
        this.selectedCids = res.data.map(item => item.id);
        this.$refs.multipleTable.tableData.forEach(item => {
          if (
            this.selectedCids.includes(item.id) &&
            !this.$refs.multipleTable.selection.includes(item)
          ) {
            this.$refs.multipleTable.toggleRowSelection(item);
          }
        });
      });
    }
  }
};
</script>
