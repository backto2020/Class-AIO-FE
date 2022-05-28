<template>
  <div>
    <el-card v-for="info in commitList" :key="info.id" class="commit-card">
      <div slot="header" class="clearfix">
        <span>{{ info.title }}</span>
        <el-button
          :disabled="info.begin > new Date() || new Date() > info.end"
          style="float: right; padding: 3px 0"
          type="text"
          @click="chooseItem(info.id)"
        >
          {{
            info.begin <= new Date() && new Date() <= info.end ? '提交' : '不在提交时间段'
          }}
        </el-button>
      </div>
      <div v-if="typeof info.begin !== 'undefined'" class="commit-time">
        {{ t2s(info.begin) }} - {{ t2s(info.end) }}
      </div>
      <div class="commit-content">{{ info.content }}</div>
      <el-dialog title="提交文件" :visible.sync="dialogFormVisible">
        <el-upload
          drag
          action="#"
          multiple
          :limit="10"
          :file-list="fileList"
          :auto-upload="false"
          :on-change="uploadChange"
          :on-remove="uploadRemove"
          :on-exceed="uploadExceed"
          :http-request="commitFile"
          style="width: 360px; margin: 0 auto"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击选取</em>
            （支持多选）
          </div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png/pdf/doc/docx/zip文件，单个文件不超过10MB，不能超过10个文件。
          </div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitFile(info.id)">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import t2s from '../../utils/t2s';
import { getCommitList, logCommit } from '../../api/commit';
export default {
  methods: {
    t2s,
    initCommitList() {
      getCommitList().then(res => {
        this.commitList = res.data.map(x => {
          return {
            ...x,
            begin: new Date(x.begin),
            end: new Date(x.end)
          };
        });
      });
    },
    chooseItem(id) {
      this.dialogFormVisible = true;
      this.commitId = id;
    },
    uploadChange(file, fileList) {
      // 10MB check
      if (file.size > 10485760) {
        fileList.pop();
        const errMsg = `你上传的${file.name}，该文件大于10MB，请重新上传。`;
        this.$alert(errMsg, '上传错误', {
          confirmButtonText: '确定',
          type: 'error'
        });
        return false;
      }
      const filenameDuplicated = this.fileList.find(item => {
        return item.name === file.name;
      });
      if (filenameDuplicated) {
        fileList.pop();
        const errMsg = `你上传的${file.name}，该文件有重名文件，请重新上传。`;
        this.$alert(errMsg, '上传错误', {
          confirmButtonText: '确定',
          type: 'error'
        });
        return false;
      }
      this.fileList = JSON.parse(JSON.stringify(fileList));
      this.uploadList.push(file);
    },
    uploadRemove(file, fileList) {
      this.fileList = JSON.parse(JSON.stringify(fileList));
      this.uploadList.forEach((item, index) => {
        if (item.name === file.name) {
          this.uploadList.splice(index, 1);
        }
      });
    },
    uploadExceed(files, fileList) {
      this.$alert('最多只能上传10个文件！', '上传错误', {
        confirmButtonText: '确定',
        type: 'warning'
      });
    },
    commitFile(id) {
      const formData = new FormData();
      this.uploadList.forEach((item, index) => {
        console.warn(item);
        formData.append(item.name, item.raw);
      });
      logCommit(this.commitId, formData)
        .then(res => {
          console.log(res);
          this.$alert(res.message, { type: 'success' }).then(() => {
            this.dialogFormVisible = false;
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  data() {
    return {
      commitList: null,
      dialogFormVisible: false,
      fileList: [],
      uploadList: [],
      commitId: -1
    };
  },
  created() {
    this.initCommitList();
  }
};
</script>
<style scoped>
.commit-card {
  margin: 30px;
}
.commit-time {
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
