<template>
  <div style="margin: 20px;">
    <el-table :data="userList" border style="width: 100%;">
      <el-table-column fixed sortable prop="sid" label="学号" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="gender" label="性别" />
      <!-- <el-table-column prop="birthday" label="生日" /> -->
      <el-table-column prop="admin" label="管理权限" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEditBtn(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDeleteBtn(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户详情" :visible.sync="dialogVisible">
      <el-form :model="selectedUser">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="selectedUser.sid" />
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="selectedUser.username" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="selectedUser.password" />
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="selectedUser.name" />
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-input v-model="selectedUser.avatar" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="selectedUser.gender" label="男">男</el-radio>
          <el-radio v-model="selectedUser.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-date-picker v-model="selectedUser.birthday" type="date" placeholder="选择出生日期" />
        </el-form-item>
        <el-form-item label="学院" :label-width="formLabelWidth">
          <el-input v-model="selectedUser.school" />
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth">
          <el-input v-model="selectedUser.major" />
        </el-form-item>
        <el-form-item label="年级" :label-width="formLabelWidth">
          <el-input v-model="selectedUser.grade" />
        </el-form-item>
        <el-form-item label="管理权限" :label-width="formLabelWidth">
          <el-radio v-model="selectedUser.admin" :label="1">管理员</el-radio>
          <el-radio v-model="selectedUser.admin" :label="0">非管理员</el-radio>
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
import { getUserList, newUser, editUser, deleteUser } from '@/api/user';

export default {
  data() {
    return {
      userList: [],
      mode: 'new',
      selectedUser: null,
      emptyUser: {
        sid: null,
        username: '',
        password: '',
        name: '',
        avatar: '',
        gender: '',
        birthday: null,
        school: '智能工程学院',
        major: '交通工程',
        grade: 2019,
        admin: 0
      },
      dialogVisible: false,
      formLabelWidth: '120px'
    };
  },
  methods: {
    initUserList() {
      getUserList().then(res => {
        this.userList = res.data.map(x => {
          return { ...x, birthday: new Date(x.birthday) };
        });
      });
    },
    handleEditBtn(row) {
      console.log(row);
      this.mode = 'edit';
      this.selectedUser = { ...row };
      this.dialogVisible = true;
    },
    handleDeleteBtn(row) {
      deleteUser(row.sid)
        .then(res => {
          this.initUserList();
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
      if (this.selectedUser.birthday.constructor === Date) {
        this.selectedUser = {
          ...this.selectedUser,
          birthday: this.selectedUser.birthday.toISOString().split('T')[0]
        };
      }
      console.log('即将提交：', this.selectedUser);
      const action = this.mode === 'new' ? newUser : editUser;
      action(this.selectedUser)
        .then(res => {
          this.initUserList();
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
      this.selectedUser = { ...this.emptyUser };
      this.dialogVisible = true;
    }
  },
  created() {
    this.selectedUser = { ...this.emptyUser };
    this.initUserList();
  }
};
</script>
