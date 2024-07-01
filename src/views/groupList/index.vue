<template>
  <div class="pageContainer" :class="{ 'show-std-list': showStdList }">
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
            <span @click="showGroupDetail(scope.row)">
              {{ scope.row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Descriptioin" align="center">
          <template slot-scope="scope">
            {{ scope.row.description }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Count" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.members_num }} </span>
          </template>
        </el-table-column>
        <el-table-column label="Creator" width="115" align="center">
          <template slot-scope="scope">
            {{ scope.row.creator }}
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

    </div>
    <div>
      <el-button
        type="text"
        class="button-create"
        @click="handleCreate"
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
              <el-select v-model="form.students[index].id" filterable placeholder="please select" class="add-box">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id"
                  :visible.sync="addVisible"
                />
              </el-select>
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
        :title="selectedGroup.name"
        :visible.sync="informationDialogVisible"
        custom-class="dialog-box"
      >
        <div class="groupdesc-conatiner">
          {{ selectedGroup.description }}
        </div>
        <div class="groupmember-container">
          <div class="groupmemberName-container">Group member</div>
          <div class="gropmemberMain-container">
            <div v-for="(member, index) in memberList" :key="index" class="groupmemberBox">
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
                    fill="#EAB365"
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
              <div class="memberName-conatiner">{{ member.username }}</div>
              <div class="memberEmail-container">
                {{ member.email }}
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
        v-if="showStdList"
        :title="selectedGroup.name"
        :visible.sync="informationDialogVisible"
        custom-class="dialog-box"
      >
        <div class="groupdesc-conatiner">
          {{ selectedGroup.description }}
        </div>
        <div class="groupmember-container">
          <div class="groupmemberName-container">Group member</div>
          <div class="gropmemberMain-container">
            <div v-for="(member, index) in memberList" :key="index" class="groupmemberBox">
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
                    fill="#EAB365"
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
              <div class="memberName-conatiner">{{ member.username }}</div>
              <div class="memberEmail-container">
                {{ member.email }}
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
            @click="handleDelete"
          >Delete Group</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :title="selectedGroup.name"
        :visible.sync="groupStatusVisible"
        custom-class="dialog-box"
      >
        <div class="groupdesc-conatiner">
          {{ selectedGroup.description }}
        </div>
        <div class="groupmember-container">
          <div class="groupmemberName-container">Group member</div>
          <div class="gropmemberMain-container">
            <div v-for="(member, index) in memberList" :key="index" class="groupmemberBox">
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
                    fill="#EAB365"
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
              <div class="memberName-conatiner">{{ member.username }}</div>
              <div class="memberEmail-container">
                {{ member.email }}
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
            @click="handleLeave"
          >Leave Group</el-button>
          <el-button
            v-if="checkCreator || showStdList"
            type="primary"
            class="confirm-box"
            @click="handleDelete"
          >Delete Group</el-button>
        </div>
      </el-dialog>
    </div>
    <div
      v-permission="['administrator', 'coordinator', 'tutor']"
      class="stdList-container"
    >
      <el-table
        v-loading="stdListLoading"
        :data="stdList"
        element-loading-text="Loading"
        fit
        highlight-current-row
      >
        <el-table-column label="Students without Group">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import { groupListAPI, stdListAPI, createGroupAPI, groupDetailAPI, joinGroupAPI, leaveGroupAPI, deleteGroupAPI } from '@/api/groupList'
import { getInfo } from '@/api/user'
export default {
  name: 'GroupList',
  components: { Pagination },
  directives: { permission },
  data() {
    return {
      list: [],
      stdList: null,
      listLoading: true,
      stdListLoading: true,
      filename: '',
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      selectedGroup: {
        name: '',
        description: '',
        id: null,
        creator_id: null
      },
      memberList: [],
      options: [],
      key: 1, // 为了能每次切换权限的时候重新初始化指令

      dialogFormVisible: false,
      informationDialogVisible: false,
      groupStatusVisible: false,
      addVisible: false,
      form: {
        name: '',
        description: '',
        students: []
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapGetters(['id']),
    showStdList() {
      // 假设 checkPermission 是一个检查当前用户权限的函数
      return this.checkPermission(['administrator', 'coordinator', 'tutor'])
    },

    checkCreator() {
      return this.selectedGroup.creator_id === this.$store.state.user.id
    }
  },
  created() {
    this.fetchData()
    this.fetchStdData()
  },
  mounted() {
    console.log(
      '验证',
      this.checkPermission(['administrator', 'coordinator', 'tutor'])
    )
    console.log('this.$store.state', this.$store.state)
  },
  methods: {
    // 切换权限
    checkPermission,
    async fetchData() {
      this.listLoading = true
      console.log('Try to get the group list')
      try {
        const params = {
          page: this.listQuery.page,
          limit: this.listQuery.limit
        }
        const response = await groupListAPI(params)
        console.log('The group data looks like:', response)
        if (response.code === 200) {
          console.log('@@@@get the group list', response.groups)
          this.list = response.groups
          this.total = response.groups.total || 0
        } else {
          this.$message({
            message: 'Failed to fetch group data.',
            type: 'error'
          })
        }
      } catch (error) {
        console.error('Failed to fetch group data', error)
        this.$message({
          message: 'Failed to fetch group data.',
          type: 'error'
        })
      } finally {
        this.listLoading = false
      }
    },
    async fetchStdData() {
      this.stdListLoading = true
      const { users } = await stdListAPI()
      this.stdList = users
      this.options = users
      this.stdListLoading = false
    },
    // 跳转页面
    handlejump(row, column, event) {
      console.log('row', row)
      console.log('column', column)
      console.log('event', event)
    },
    async handleConfirm() {
      const groupData = {
        name: this.form.name,
        description: this.form.description,
        members: [this.$store.state.user.id]
      }
      const group = {
        name: this.form.name,
        description: this.form.description
      }
      this.selectedGroup = group
      const response = await getInfo(this.$store.state.user.id)
      console.log('Creato infomation', response)
      const member = {
        username: response.data.username,
        email: response.data.email,
        id: response.data.id
      }
      this.memberList = [member]
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
    },
    async handAdminConfirm() {
      const group = {
        name: this.form.name,
        description: this.form.description
      }
      this.selectedGroup = group
      console.log(this.form.students)
      const studentIds = this.form.students.map(student => student.id)
      const responses = await Promise.all(studentIds.map(id => getInfo(id)))
      this.memberList = responses.map(response => ({
        username: response.data.username,
        email: response.data.email,
        id: response.data.id
      }))
      const groupData = {
        name: this.form.name,
        description: this.form.description,
        members: studentIds
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
      this.addVisible = false
    },
    async handleJoin() {
      console.log('Handl the Join function and current is the group', this.selectedGroup.id)
      this.informationDialogVisible = false
      console.log('New memeber list', this.memberlist)
      const response = await joinGroupAPI(this.selectedGroup.id, this.$store.state.user.id)
      console.log('Join response', response)
      const listdata = await groupDetailAPI(this.selectedGroup.id)
      console.log('current response for the specific group', listdata)
      this.memberList = listdata.result.members
      this.groupStatusVisible = true
      this.fetchData()
    },
    async handleLeave() {
      const response = await leaveGroupAPI(this.selectedGroup.id, this.$store.state.user.id)
      console.log('Join response', response)
      this.groupStatusVisible = false
      this.fetchData()
    },
    async handleDelete() {
      console.log('handle delete option')
      const response = await deleteGroupAPI(this.selectedGroup.id)
      console.log('Delete response', response)
      this.groupStatusVisible = false
      this.informationDialogVisible = false
      this.fetchData()
    },
    addStudent() {
      this.addVisible = true
      this.form.students.push({ name: '' })
    },
    async showGroupDetail(group) {
      console.log('!!!Try to get detailed of the group')
      this.selectedGroup = group
      console.log('######ID', group.id)
      const response = await groupDetailAPI(group.id)
      console.log('current response for the specific group', response)
      this.memberList = response.result.members
      const user = this.$store.state.user.id
      let result = 0
      response.result.members.forEach(member => {
        if (user === member.id) {
          result = 1
        }
      })
      if (result === 0) {
        this.informationDialogVisible = true
      } else {
        this.groupStatusVisible = true
      }
    },
    handleCreate() {
      console.log('Click the create button')
      this.dialogFormVisible = true
    }
  }
}
</script>
<style>
.app-main {
  display: grid;
  grid-template-rows: 1fr;
  padding: 0;
  position: relative;
}

.pageContainer{
  width: 100%;
  height: 100%;
  display:flex;
}
.pageContainer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("./mainbackground.jpg");
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  opacity: 0.6;
  z-index: -1;
}
.list-container {
  margin-top: 50px;
  margin-left: 50px;
  margin-right:50px;
  width: 92%; /* 默认宽度 */
  background-color: transparent !important;
  z-index:10;
  position:relative;

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
  background-color: #C88A42;
  border-radius: 10px;
  border: 3px solid #f1f1f1;
}
.stdList-container::-webkit-scrollbar-thumb:hover {
  background-color: #C88A42;
}
.pagination-container {
  margin: 0px !important;
  padding-top: 10px;
  background-color: transparent !important;
}
.el-table {
  border: 1.8px solid #C88A42 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  overflow: hidden;
  background-color: transparent !important;
}

.el-table .el-table__body-wrapper table tr td {
  border-bottom: 1px dashed #EAB365 !important;
  background-color: transparent !important;
}
.el-table .el-table__body-wrapper table tr {
  border-bottom: 1px dashed #EAB365;
  background-color: transparent !important;
}
.el-table .el-table__header-wrapper table th {
  border-bottom: 1px dashed #EAB365;
  background-color: #f0f0f0;
  color: #C88A42 !important;
  font-size: 16px !important;
}

/* 分页按钮样式 */
.el-pagination .el-pager .number,
.el-pagination .el-pager .more,
.el-pagination button {
  background-color: #EAB365 !important;
  color: #ffffff !important;
}
.el-pagination .el-pager .number.active {
  background-color: #EAB365 !important;
  color: #ffffff !important;
}
.el-pagination .el-pager .number:hover,
.el-pagination button:hover {
  background-color: #C88A42 !important;
  color: #ffffff !important;
}
/*Style for the create group part */
.groupname-box .el-textarea__inner {
  height: 40px !important;
  border: 1px solid #C88A42 !important;
}
.description-box .el-textarea__inner {
  height: 200px !important;
  border: 1px solid #C88A42 !important;
}

.add-box .el-input__inner,
.add-box .el-select .el-input__inner {
  height: 35px !important;
  border: 1px solid #C88A42 !important;
  width: 100% !important;
  box-sizing: border-box;
  margin-bottom: 4px;
}
.el-select-dropdown__item.selected {
  color: #C88A42 !important;
  font-weight: bold;
}
.add-box .el-input__inner:focus,
.add-box .el-select .el-input__inner:focus {
  border-color: #C88A42 !important;
  box-shadow: none;
}

.add-box .el-input__inner:hover,
.add-box .el-select .el-input__inner:hover {
  border-color: #C88A42 !important;
}

.add-box .el-select .el-input__inner {
  width: 100% !important;
  padding-right: 30px !important;
}

.confirm-box {
  background-color: #C88A42 !important;
  border-color: #C88A42 !important;
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
  color: #C88A42 !important;
}

.label-color .el-form-item__label {
  color: #C88A42 !important;
  font-weight: bold;
}

.cancel-box {
  color: #C88A42 !important;
  border: 1px solid #C88A42 !important;
}

.cancel-box:focus,
.cancel-box:hover {
  background-color: #EAB365;
}
.cancel-box:active {
  background-color: #EAB365;
}
.dialog-box {
  border: 1.5px solid #C88A42 !important;
  border-radius: 20px !important;
  background-image: url("./dialogbackground.jpg");
  background-size: cover;
  width: 550px;
}
/*Style for group information part */
.groupdesc-conatiner {
  height: 30px;
  width: 90%;
  margin-top: -40px;
  color: #C88A42;
  font-size: 14px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.groupmember-container {
  height: 300px;
  font-size: 12px;
  border: 1px solid #EAB365 !important;
  border-radius: 10px;
  margin-top: 20px;
  padding: 5px;
  display: grid;
  grid-template-rows: 20px auto;
}

.groupmemberName-container {
  height: 100%;
  color: #C88A42;
  font-weight: bold;
  grid-row: 1/2;
}
.gropmemberMain-container {
  margin-top: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  grid-row: 2/3;
  gap:10px;
}

.groupmemberBox {
  display: grid;
  grid-template-rows: 50% auto;
  grid-template-columns: 15% auto;
  border: 1px dashed #EAB365 !important;
  height: 40px;
  width: 70%;
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
  color: #C88A42;
}

.memberEmail-container {
  grid-row: 2/3;
  grid-column: 2/3;
  color: #C88A42;
}

.add-button {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #EAB365 !important;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  border: none;
  color: #C88A42;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
}
.add-button:focus,
.add-button:hover {
  background-color: #EAB365;
}

.add-button:active {
  background-color: #EAB365;
}

.add-button::after {
  content: none;
}

.add-button::-moz-focus-inner {
  border: 0;
}

.button-create {
    background-color: #C88A42;
    color: #ffffff;
    border-radius: 10%;
    width: 120px;
    height: 40px;
    right: 60px;
    bottom:60px;
    position: absolute;
    z-index: 100;
    &:hover {
      background-color: #EAB365;
    }
  }

.button-create:focus,
.button-create:hover {
  background-color: #EAB365;
  color: #ffffff;
}

.button-create:active {
  background-color: #EAB365;
  color: #ffffff;
}
</style>

