<template>
  <div style="margin: 20px;">
    <el-table :data="notiList" border style="width: 100%">
      <el-table-column
        fixed
        sortable
        prop="timeString"
        label="发布时间"
        width="200"
      ></el-table-column>
      <el-table-column prop="title" label="标题" width="200"></el-table-column>
      <el-table-column prop="content" label="正文" width="600"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="公告详情" :visible.sync="dialogFormVisible">
      <el-form :model="selectedNoti">
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker v-model="selectedNoti.time" type="datetime" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="selectedNoti.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="selectedNoti.content" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCommitBtn">确 定</el-button>
      </div>
    </el-dialog>
    <el-button
      v-if="!dialogFormVisible"
      type="primary"
      icon="el-icon-edit"
      circle
      style="position: fixed; right: 100px; bottom: 100px; z-index: 10000;"
      @click="handleNewBtn"
    />
  </div>
</template>

<script>
import t2s from '../../utils/t2s';
export default {
  methods: {
    handleClick(row) {
      console.log(row);
      this.selectedNoti = row;
      this.dialogFormVisible = true;
    },
    handleNewBtn() {
      this.selectedNoti = {
        id: 0,
        time: new Date(),
        title: '',
        content: ''
      };
      this.dialogFormVisible = true;
    },
    commit() {
      // dialogFormVisible = false;
      // TODO: post to edit
      return new Promise((res, rej) => {
        setTimeout(() => {
          res({
            code: 20000,
            message: '提交成功'
          });
        }, 1000);
      });
    },
    // TODO: query
    getNotiList() {
      setTimeout(() => {
        this.notiList = Array(20)
          .fill(0)
          .map((_, i) => {
            return {
              id: i,
              time: new Date() - i * 100000,
              title: '这里是公告标题',
              content: '这里是公告内容，ABCD，12345678，一二三四。'
            };
          })
          .map(x => {
            return {
              ...x,
              timeString: t2s(x.time)
            };
          });
      }, 1000);
    },
    handleCommitBtn() {
      this.commit()
        .then(res => {
          this.$alert(res.message, '', {
            confirmButtonText: '确定',
            type: 'success'
          });
          this.dialogFormVisible = false;
        })
        .catch(err => {
          this.$alert(err.message, '', {
            confirmButtonText: '确定',
            type: 'error'
          });
        });
    }
  },

  data() {
    return {
      notiList: [],
      selectedNoti: {
        id: 0,
        time: new Date(),
        title: '',
        content: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px'
    };
  },
  created() {
    this.getNotiList();
  }
};
</script>
