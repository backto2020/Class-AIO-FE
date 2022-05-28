<template>
  <div style="margin: 20px;">
    <el-table :data="notiList" border style="width: 100%">
      <el-table-column fixed sortable prop="id" label="ID" />
      <el-table-column sortable sort-by="time" label="发布时间" width="200">
        <template slot-scope="scope">
          {{ t2s(new Date(scope.row.time)) }}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="title" label="标题" width="200" />
      <el-table-column prop="content" label="正文" width="600" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEditBtn(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDeleteBtn(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="公告详情" :visible.sync="dialogVisible">
      <el-form :model="selectedNoti">
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker v-model="selectedNoti.time" type="datetime" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio v-model="selectedNoti.type" label="作业提交">作业提交</el-radio>
          <el-radio v-model="selectedNoti.type" label="作业DDL">作业DDL</el-radio>
          <el-radio v-model="selectedNoti.type" label="教务处通知">教务处通知</el-radio>
          <el-radio v-model="selectedNoti.type" label="课程安排变动">课程安排变动</el-radio>
          <el-radio v-model="selectedNoti.type" label="防疫">防疫</el-radio>
          <el-radio v-model="selectedNoti.type" label="紧急">紧急</el-radio>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="selectedNoti.title" />
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="selectedNoti.content" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCommitBtn">确 定</el-button>
      </div>
    </el-dialog>
    <el-button
      v-if="!dialogVisible"
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
import { getNotiList, newNoti, editNoti, deleteNoti } from '@/api/noti';

export default {
  data() {
    return {
      notiList: [],
      mode: 'new',
      selectedNoti: null,
      emptyNoti: {
        id: null,
        title: '',
        time: null,
        content: '',
        type: ''
      },
      dialogVisible: false,
      formLabelWidth: '120px'
    };
  },
  methods: {
    t2s,
    initNotiList() {
      getNotiList().then(res => {
        this.notiList = res.data.map(x => {
          return { ...x, time: new Date(x.time).toISOString() };
        });
      });
    },
    handleEditBtn(row) {
      console.log(row);
      this.mode = 'edit';
      this.selectedNoti = { ...row };
      this.dialogVisible = true;
    },
    handleDeleteBtn(row) {
      deleteNoti(row.id)
        .then(res => {
          this.initNotiList();
          this.$alert(res.message, '', {
            confirmButtonText: '确定',
            type: 'success'
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleCommitBtn() {
      if (this.selectedNoti.time.constructor === Date) {
        this.selectedNoti = {
          ...this.selectedNoti,
          time: this.selectedNoti.time.toISOString()
        };
      }
      console.log('即将提交：', this.selectedNoti);
      const action = this.mode === 'new' ? newNoti : editNoti;
      action(this.selectedNoti)
        .then(res => {
          this.initNotiList();
          this.$alert(res.message, '', {
            confirmButtonText: '确定',
            type: 'success'
          });
          this.dialogVisible = false;
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleNewBtn() {
      this.mode = 'new';
      this.selectedNoti = { ...this.emptyNoti };
      this.dialogVisible = true;
    }
  },
  created() {
    this.selectedNoti = { ...this.emptyNoti };
    this.initNotiList();
  }
};
</script>
