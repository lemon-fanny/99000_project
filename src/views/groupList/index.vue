<template>
  <div class="app-main" :class="{ 'show-std-list': showStdList }">
    <div class="list-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="loading"
        fit
        highlight-current-row
        @row-click="handlejump"
      >
        <el-table-column label="GroupName" width="120">
          <template slot-scope="scope">
            {{ scope.row.GroupName }}
          </template>
        </el-table-column>
        <el-table-column label="Descriptioin" align="center">
          <template slot-scope="scope">
            {{ scope.row.Descriptioin }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Count" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.Count }} </span>
          </template>
        </el-table-column>
        <el-table-column label="Creator" width="115" align="center">
          <template slot-scope="scope">
            {{ scope.row.Creator }}
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          layout=" prev, pager, next"
          :limit.sync="listQuery.limit"
          @pagination="fetchData"
        />
      </div>
      <div>
        <el-button
          type="text"
          class="button-create"
          @click="dialogFormVisible = true"
        >Create Group</el-button>
        <el-dialog
          v-if="!showStdList"
          title="Create Group"
          :visible.sync="dialogFormVisible"
          custom-class="dialog-box"
        >
          <el-form :model="form" label-position="top">
            <el-form-item
              label="Group Name"
              :label-width="formLabelWidth"
              class="label-color"
            >
              <el-input
                v-model="form.name"
                type="textarea"
                class="groupname-box"
              />
            </el-form-item>
            <el-form-item
              label="Description"
              :label-width="formLabelWidth"
              class="label-color"
            >
              <el-input
                v-model="form.description"
                type="textarea"
                class="description-box"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              class="cancel-box"
              @click="dialogFormVisible = false"
            >Cancel</el-button>
            <el-button
              type="primary"
              class="confirm-box"
              @click="handleConfirm"
            >Confirm</el-button>
          </div>
        </el-dialog>
        <el-dialog
          v-if="showStdList"
          title="Admin Create Group"
          :visible.sync="dialogFormVisible"
          custom-class="dialog-box"
        >
          <el-form :model="form" label-position="top">
            <el-form-item
              label="Group Name "
              :label-width="formLabelWidth"
              class="label-color"
            >
              <el-input
                v-model="form.name"
                type="textarea"
                class="groupname-box"
              />
            </el-form-item>
            <el-form-item
              label="Add Student "
              :label-width="formLabelWidth"
              class="label-color"
            >
              <div v-for="(student, index) in form.students" :key="index">
                <el-input
                  v-model="form.student"
                  type="textarea"
                  class="add-box"
                  :visible.sync="addVisible"
                />
              </div>
            </el-form-item>
            <el-button
              type="primary"
              class="add-button"
              @click="addStudent"
            >+</el-button>
            <el-form-item
              label="Description"
              :label-width="formLabelWidth"
              class="label-color"
            >
              <el-input
                v-model="form.description"
                type="textarea"
                class="description-box"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              class="cancel-box"
              @click="dialogFormVisible = false"
            >Cancel</el-button>
            <el-button
              type="primary"
              class="confirm-box"
              @click="handAdminConfirm"
            >Confirm</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="Accusefive"
          :visible.sync="informationDialogVisible"
          custom-class="dialog-box"
        >
          <div class="groupdesc-conatiner">
            A group that want to join project P37
          </div>
          <div class="groupmember-container">
            <div class="groupmemberName-container">Group member</div>
            <div class="gropmemberMain-container">
              <div class="groupmemberBox">
                <div class="memberImage-conatiner">
                  <svg
                    t="1719158592610"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8492"
                    width="32"
                    height="32"
                  >
                    <path
                      d="M1024 544c0 265.12-214.944 480-480 480h-64C214.912 1024 0 809.12 0 544v-64C0 214.912 214.912 0 480 0h64c265.056 0 480 214.912 480 480v64z"
                      fill="#9f8373"
                      p-id="8493"
                      data-spm-anchor-id="a313x.search_index.0.i21.60433a81o4pBO6"
                      class="selected"
                    />
                    <path
                      d="M512.032 160a216.896 216.896 0 0 0-216.64 216.64 216.896 216.896 0 0 0 216.64 216.608c119.424 0 216.672-97.248 216.672-216.608A216.96 216.96 0 0 0 512.032 160z"
                      fill="#ffffff"
                      p-id="8494"
                      data-spm-anchor-id="a313x.search_index.0.i22.60433a81o4pBO6"
                      class=""
                    />
                    <path
                      d="M678.976 588.256c-46.112 36.512-103.584 59.104-166.944 59.104s-120.768-22.656-167.04-59.104c-87.584 55.776-148.544 153.696-156.928 267.104 30.656 4.16 85.248 8.64 163.104 8.64h321.568c77.92 0 132.512-4.48 163.232-8.672-8.32-113.44-69.312-211.296-156.992-267.072z"
                      fill="#ffffff"
                      p-id="8495"
                      data-spm-anchor-id="a313x.search_index.0.i23.60433a81o4pBO6"
                      class=""
                    />
                  </svg>
                </div>
                <div class="memberName-conatiner">MaoMao</div>
                <div class="memberEmail-container">
                  z54441377@ad.unsw.edu.au
                </div>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button
              class="cancel-box"
              @click="informationDialogVisible = false"
            >Exit</el-button>
            <el-button
              type="primary"
              class="confirm-box"
              @click="handleJoin"
            >Join Group</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="Accusefive"
          :visible.sync="groupStatusVisible"
          custom-class="dialog-box"
        >
          <div class="groupdesc-conatiner">
            A group that want to join project P37
          </div>
          <div class="groupmember-container">
            <div class="groupmemberName-container">Group member</div>
            <div class="gropmemberMain-container">
              <div class="groupmemberBox">
                <div class="memberImage-conatiner">
                  <svg
                    t="1719158592610"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8492"
                    width="32"
                    height="32"
                  >
                    <path
                      d="M1024 544c0 265.12-214.944 480-480 480h-64C214.912 1024 0 809.12 0 544v-64C0 214.912 214.912 0 480 0h64c265.056 0 480 214.912 480 480v64z"
                      fill="#9f8373"
                      p-id="8493"
                      data-spm-anchor-id="a313x.search_index.0.i21.60433a81o4pBO6"
                      class="selected"
                    />
                    <path
                      d="M512.032 160a216.896 216.896 0 0 0-216.64 216.64 216.896 216.896 0 0 0 216.64 216.608c119.424 0 216.672-97.248 216.672-216.608A216.96 216.96 0 0 0 512.032 160z"
                      fill="#ffffff"
                      p-id="8494"
                      data-spm-anchor-id="a313x.search_index.0.i22.60433a81o4pBO6"
                      class=""
                    />
                    <path
                      d="M678.976 588.256c-46.112 36.512-103.584 59.104-166.944 59.104s-120.768-22.656-167.04-59.104c-87.584 55.776-148.544 153.696-156.928 267.104 30.656 4.16 85.248 8.64 163.104 8.64h321.568c77.92 0 132.512-4.48 163.232-8.672-8.32-113.44-69.312-211.296-156.992-267.072z"
                      fill="#ffffff"
                      p-id="8495"
                      data-spm-anchor-id="a313x.search_index.0.i23.60433a81o4pBO6"
                      class=""
                    />
                  </svg>
                </div>
                <div class="memberName-conatiner">MaoMao</div>
                <div class="memberEmail-container">
                  z54441377@ad.unsw.edu.au
                </div>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button
              class="cancel-box"
              @click="groupStatusVisible = false"
            >Exit</el-button>
            <el-button
              v-if="!showStdList"
              type="primary"
              class="confirm-box"
              @click="groupStatusVisible = false"
            >Leave Group</el-button>
            <el-button
              type="primary"
              class="confirm-box"
              @click="groupStatusVisible = false"
            >Delete Group</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div v-permission="['admin']" class="stdList-container">
      <el-table
        v-loading="stdListLoading"
        :data="stdList"
        element-loading-text="Loading"
        fit
        highlight-current-row
      >
        <el-table-column label="Students without Group">
          <template slot-scope="scope">
            {{ scope.row.studentName }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import { groupListAPI, stdListAPI, createGroupAPI } from '@/api/groupList'
export default {
  name: 'GroupList',
  components: { Pagination },
  directives: { permission },
  data() {
    return {
      list: null,
      stdList: null,
      listLoading: true,
      stdListLoading: true,
      filename: '',
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      key: 1, // 为了能每次切换权限的时候重新初始化指令

      dialogFormVisible: false,
      informationDialogVisible: false,
      groupStatusVisible: false,
      addVisible: false,
      form: {
        name: '',
        description: '',
        students: [{ name: '' }]
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    showStdList() {
      // 假设 checkPermission 是一个检查当前用户权限的函数
      return this.checkPermission(['admin'])
    }
  },
  created() {
    this.fetchData()
    this.fetchStdData()
  },
  mounted() {
    console.log('验证', this.checkPermission(['admin']))
  },
  methods: {
    // 切换权限
    checkPermission,
    async fetchData() {
      this.listLoading = true
      const { data } = await groupListAPI(this.listQuery)
      this.list = data.items
      this.total = data.total || 0
      this.listLoading = false
    },
    async fetchStdData() {
      this.stdListLoading = true
      const { data } = await stdListAPI()
      this.stdList = data.items
      this.stdListLoading = false
    },
    // 跳转页面
    handlejump(row, column, event) {
      console.log('row', row)
      console.log('column', column)
      console.log('event', event)
    },
    handleConfirm() {
      const groupData = {
        name: this.form.name,
        description: this.form.description
      }
      createGroupAPI(groupData)
        .then(response => {
          this.$message({
            message: 'Group created successfully!',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.fetchData() // Refresh the group list after creation
        })
        .catch(error => {
          let errorMessage = 'Failed to create group.'
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message
          }
          this.$message({
            message: errorMessage,
            type: 'error'
          })
        })
      this.dialogFormVisible = false
      this.informationDialogVisible = true
    },
    handAdminConfirm() {
      const groupData = {
        name: this.form.name,
        description: this.form.description,
        students: this.form.students
      }
      createGroupAPI(groupData)
        .then(response => {
          this.$message({
            message: 'Group created successfully!',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.fetchData() // Refresh the group list after creation
        })
        .catch(error => {
          let errorMessage = 'Failed to create group.'
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message
          }
          this.$message({
            message: errorMessage,
            type: 'error'
          })
        })
      this.dialogFormVisible = false
      this.groupStatusVisible = true
      this.addVisible = false
    },
    handleJoin() {
      this.informationDialogVisible = false
      this.groupStatusVisible = true
    },
    addStudent() {
      this.addVisible = true
      this.form.students.push({ name: '' })
    }
  }
}
</script>

<style>
.app-main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  position: relative;
}

.app-main::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("./leaves.jpg");
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  opacity: 0.6;
  z-index: -1;
}
.list-container {
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
  width: 100%; /* 默认宽度 */
  background-color: transparent !important;
  .button-create {
    background-color: #85563e;
    color: #ffffff;
    border-radius: 10%;
    width: 120px;
    height: 40px;
    right: 10px;
    margin-top: -10px;
    margin-right: 80px;
    position: absolute;
    &:hover {
      background-color: #9f8373;
    }
  }
}
.stdList-container {
  margin-top: 50px;
  display: none;
  margin-left: -5px;
  height: 460px;
  overflow-y: auto;
  background-color: transparent !important;
}
.show-std-list .list-container {
  width: 75%;
}
.show-std-list .stdList-container {
  display: block;
  width: 25%;
  margin-left: 20px;
}
/* Scrollbar styles */
.stdList-container::-webkit-scrollbar {
  width: 12px;
}
.stdList-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.stdList-container::-webkit-scrollbar-thumb {
  background-color: #9f8373;
  border-radius: 10px;
  border: 3px solid #f1f1f1;
}
.stdList-container::-webkit-scrollbar-thumb:hover {
  background-color: #85563e;
}
.pagination-container {
  margin: 0px !important;
  padding-top: 10px;
  background-color: transparent !important;
}
.el-table {
  border: 1px solid #85563e !important;
  border-radius: 20px;
  overflow: hidden;
  background-color: transparent !important;
}

.el-table .el-table__body-wrapper table tr td {
  border-bottom: 1px dashed #9f8373 !important;
  background-color: transparent !important;
}
.el-table .el-table__body-wrapper table tr {
  border-bottom: 1px dashed #9f8373;
  background-color: transparent !important;
}
.el-table .el-table__header-wrapper table th {
  border-bottom: 1px dashed #9f8373;
  background-color: #f0f0f0;
  color: #85563e !important;
  font-size: 16px !important;
}

/* 分页按钮样式 */
.el-pagination .el-pager .number,
.el-pagination .el-pager .more,
.el-pagination button {
  background-color: #9f8373 !important;
  color: #ffffff !important;
}
.el-pagination .el-pager .number.active {
  background-color: #6f2f0a !important;
  color: #ffffff !important;
}
.el-pagination .el-pager .number:hover,
.el-pagination button:hover {
  background-color: #85563e !important;
  color: #ffffff !important;
}
/*Style for the create group part */
.groupname-box .el-textarea__inner {
  height: 40px !important;
  border: 1px solid #85563e !important;
}
.description-box .el-textarea__inner {
  height: 200px !important;
  border: 1px solid #85563e !important;
}

.add-box .el-textarea__inner {
  height: 20px !important;
  border: 1px solid #85563e !important;
}
.confirm-box {
  background-color: #85563e !important;
  border-color: #85563e !important;
  color: #ffffff !important;
}

.dialog-box .el-dialog__header {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.dialog-box .el-dialog__header .el-dialog__title {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: #85563e !important;
}

.label-color .el-form-item__label {
  color: #85563e !important;
  font-weight: bold;
}

.cancel-box {
  color: #85563e !important;
  border: 1px solid #85563e !important;
}

.cancel-box:focus,
.cancel-box:hover {
  background-color: #9f8373;
}
.cancel-box:active {
  background-color: #9f8373;
}
.dialog-box {
  border: 1.5px solid #85563e !important;
  border-radius: 20px !important;
  background-image: url("./background.jpg");
  background-size: cover;
  width: 550px;
}
/*Style for group information part */
.groupdesc-conatiner {
  height: 30px;
  width: 90%;
  margin-top: -40px;
  color: #85563e;
  font-size: 14px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.groupmember-container {
  height: 280px;
  font-size: 12px;
  border: 1px solid #9f8373 !important;
  border-radius: 10px;
  margin-top: 20px;
  padding: 5px;
  display: grid;
  grid-template-rows: 20px auto;
}

.groupmemberName-container {
  height: 100%;
  color: #85563e;
  font-weight: bold;
  grid-row: 1/2;
}
.gropmemberMain-container {
  margin-top: 10px;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  grid-row: 2/3;
}

.groupmemberBox {
  display: grid;
  grid-template-rows: 50% auto;
  grid-template-columns: 15% auto;
  border: 1px dashed #9f8373 !important;
  height: 40px;
  width: 80%;
  border-radius: 5px;
}

.memberImage-conatiner {
  grid-row: 1/3;
  grid-column: 1/2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.memberName-conatiner {
  grid-row: 1/2;
  grid-column: 2/3;
  color: #85563e;
}

.memberEmail-container {
  grid-row: 2/3;
  grid-column: 2/3;
  color: #85563e;
}

.add-button {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #9f8373 !important;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  border: none;
  color: #85563e;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
}
.add-button:focus,
.add-button:hover {
  background-color: #9f8373;
}

.add-button:active {
  background-color: #7a4b3b;
}

.add-button::after {
  content: none;
}

.add-button::-moz-focus-inner {
  border: 0;
}
</style>
