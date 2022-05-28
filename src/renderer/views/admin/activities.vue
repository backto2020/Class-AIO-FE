<template>
  <div style="margin: 20px;">
    <!-- 活动表管理 -->
    <el-table :data="actiList" border style="width: 100%">
      <el-table-column fixed sortable prop="id" label="ID" />
      <el-table-column sortable sort-by="begin" label="开始时间">
        <template slot-scope="scope">
          {{ scope.row.begin.slice(0, 19).replace('T', ' ') }}
        </template>
      </el-table-column>
      <el-table-column sortable sort-by="end" label="结束时间">
        <template slot-scope="scope">
          {{ scope.row.end.slice(0, 19).replace('T', ' ') }}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="title" label="标题" />
      <el-table-column label="签到情况">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.login != 1"
            @click="handleCheckLoginBtn(scope.row.id)"
            type="text"
            size="small"
          >
            {{ scope.row.login === 1 ? '查看签到情况' : '无需签到' }}
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

    <!-- 新活动或修改活动表单 -->
    <el-dialog title="活动详情" :visible.sync="dialogVisible">
      <el-form :model="selectedActi">
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-date-picker v-model="selectedActi.begin" type="datetime" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="结束时间" :label-width="formLabelWidth">
          <el-date-picker v-model="selectedActi.end" type="datetime" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio v-model="selectedActi.type" label="班会活动">班会活动</el-radio>
          <el-radio v-model="selectedActi.type" label="班集体活动">班集体活动</el-radio>
          <el-radio v-model="selectedActi.type" label="学校长期活动">学校长期活动</el-radio>
          <el-radio v-model="selectedActi.type" label="长期大作业">长期大作业</el-radio>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="selectedActi.title" />
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="selectedActi.content" />
        </el-form-item>
        <el-form-item label="是否需要签到" :label-width="formLabelWidth">
          <el-radio v-model="selectedActi.login" :label="1">需要签到</el-radio>
          <el-radio v-model="selectedActi.login" :label="0">无需签到</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCommitBtn">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 签到情况表 -->
    <el-dialog v-if="loginStatus != null" title="签到情况" :visible.sync="loginStatusVisible">
      <h3>未签到：</h3>
      <el-table :data="loginStatus.unlogin">
        <el-table-column sortable property="sid" label="学号" />
        <el-table-column property="name" label="姓名" />
      </el-table>
      <h3>已签到：</h3>
      <el-table :data="loginStatus.logined">
        <el-table-column sortable property="sid" label="学号" />
        <el-table-column property="name" label="姓名" />
        <el-table-column sortable sort-by="time" label="签到时间">
          <template slot-scope="scope">
            {{ scope.row.time.slice(0, 19).replace('T', ' ') }}
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
import { getActiList, newActi, editActi, deleteActi, getActiLoginStatus } from '@/api/acti';

export default {
  data() {
    return {
      actiList: [],
      mode: 'new',
      selectedActi: null,
      emptyActi: {
        id: null,
        title: '',
        begin: null,
        end: null,
        content: '',
        type: '',
        login: 0
      },
      dialogVisible: false,
      loginStatusVisible: false,
      loginStatus: null,
      formLabelWidth: '120px'
    };
  },
  methods: {
    initActiList() {
      getActiList().then(res => {
        this.actiList = res.data.map(x => {
          return {
            ...x,
            login: x.login === 1 || x.login === 2 ? 1 : 0,
            begin: new Date(x.begin).toISOString(),
            end: new Date(x.end).toISOString()
          };
        });
      });
    },
    handleCheckLoginBtn(id) {
      getActiLoginStatus(id).then(res => {
        this.loginStatus = res.data;
        this.loginStatusVisible = true;
      });
    },
    handleEditBtn(row) {
      console.log(row);
      this.mode = 'edit';
      this.selectedActi = { ...row };
      this.dialogVisible = true;
    },
    handleDeleteBtn(row) {
      deleteActi(row.id)
        .then(res => {
          this.initActiList();
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
      if (this.selectedActi.begin.constructor === Date) {
        this.selectedActi = {
          ...this.selectedActi,
          begin: this.selectedActi.begin.toISOString(),
          end: this.selectedActi.end.toISOString()
        };
      }
      console.log('即将提交：', this.selectedActi);
      const action = this.mode === 'new' ? newActi : editActi;
      action(this.selectedActi)
        .then(res => {
          this.initActiList();
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
      this.selectedActi = { ...this.emptyActi };
      this.dialogVisible = true;
    }
  },
  created() {
    this.selectedActi = { ...this.emptyActi };
    this.initActiList();
  }
};
</script>
