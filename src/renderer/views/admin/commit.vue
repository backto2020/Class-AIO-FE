<template>
  <div style="margin: 20px;">
    <!-- 提交表管理 -->
    <el-table :data="commitList" border style="width: 100%">
      <el-table-column fixed sortable prop="id" label="ID" />
      <el-table-column sortable sort-by="begin" label="开始时间">
        <template slot-scope="scope">
          {{ t2s(new Date(scope.row.begin)) }}
        </template>
      </el-table-column>
      <el-table-column sortable sort-by="end" label="结束时间">
        <template slot-scope="scope">
          {{ t2s(new Date(scope.row.end)) }}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="title" label="标题" />
      <el-table-column label="提交情况">
        <template slot-scope="scope">
          <el-button @click="handleCheckLogBtn(scope.row.id)" type="text" size="small">
            查看提交情况
          </el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEditBtn(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDeleteBtn(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新提交或修改提交表单 -->
    <el-dialog title="提交详情" :visible.sync="dialogVisible">
      <el-form :model="selectedCommit">
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="selectedCommit.begin"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="结束时间" :label-width="formLabelWidth">
          <el-date-picker v-model="selectedCommit.end" type="datetime" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio v-model="selectedCommit.type" label="作业文件">作业文件</el-radio>
          <el-radio v-model="selectedCommit.type" label="其他文件">其他文件</el-radio>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="selectedCommit.title" />
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="selectedCommit.content" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCommitBtn">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 提交情况表 -->
    <el-dialog v-if="logStatus != null" title="提交情况" :visible.sync="logStatusVisible">
      <h3>未提交：</h3>
      <el-table :data="logStatus.uncommit">
        <el-table-column sortable property="sid" label="学号" />
        <el-table-column property="name" label="姓名" />
      </el-table>
      <h3>已提交：</h3>
      <el-table :data="logStatus.committed">
        <el-table-column sortable property="sid" label="学号" />
        <el-table-column property="name" label="姓名" />
        <el-table-column sortable sort-by="time" label="最后一次提交时间">
          <template slot-scope="scope">
            {{ t2s(new Date(scope.row.time)) }}
          </template>
        </el-table-column>
      </el-table>
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
import { getCommitList, newCommit, editCommit, deleteCommit, getCommitStatus } from '@/api/commit';

export default {
  data() {
    return {
      commitList: [],
      mode: 'new',
      selectedCommit: null,
      emptyCommit: {
        id: null,
        title: '',
        begin: null,
        end: null,
        content: '',
        type: ''
      },
      dialogVisible: false,
      logStatusVisible: false,
      logStatus: null,
      formLabelWidth: '120px'
    };
  },
  methods: {
    t2s,
    initCommitList() {
      getCommitList().then(res => {
        this.commitList = res.data.map(x => {
          return {
            ...x,
            begin: new Date(x.begin).toISOString(),
            end: new Date(x.end).toISOString()
          };
        });
      });
    },
    handleCheckLogBtn(id) {
      getCommitStatus(id).then(res => {
        this.logStatus = res.data;
        this.logStatusVisible = true;
      });
    },
    handleEditBtn(row) {
      console.log(row);
      this.mode = 'edit';
      this.selectedCommit = { ...row };
      this.dialogVisible = true;
    },
    handleDeleteBtn(row) {
      deleteCommit(row.id)
        .then(res => {
          this.initCommitList();
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
      if (this.selectedCommit.begin.constructor === Date) {
        this.selectedCommit = {
          ...this.selectedCommit,
          begin: this.selectedCommit.begin.toISOString(),
          end: this.selectedCommit.end.toISOString()
        };
      }
      console.log('即将提交：', this.selectedCommit);
      const commiton = this.mode === 'new' ? newCommit : editCommit;
      commiton(this.selectedCommit)
        .then(res => {
          this.initCommitList();
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
      this.selectedCommit = { ...this.emptyCommit };
      this.dialogVisible = true;
    }
  },
  created() {
    this.selectedCommit = { ...this.emptyCommit };
    this.initCommitList();
  }
};
</script>
