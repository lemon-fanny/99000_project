<template>
  <div class="admin-dashboard">
    <h3 class="centered-title">Administrator Dashboard</h3>
    <div class="dashboard-buttons">
      <div class="dashboard-container">
        <el-button class="dashboard-button" type="primary">
          <div>
            <div class="button-title">Project Management</div>
            <div class="button-description">View and manage projects</div>
          </div>
        </el-button>
      </div>
      <div class="dashboard-container">
        <el-button class="dashboard-button" type="primary">
          <div>
            <div class="button-title">Group Management</div>
            <div class="button-description">View and manage group</div>
          </div>
        </el-button>
      </div>
      <div class="dashboard-container">
        <el-button class="dashboard-button" type="primary">
          <div>
            <div class="button-title">Personal Profile</div>
            <div class="button-description">Edit your personal information</div>
          </div>
        </el-button>
      </div>
      <div class="dashboard-container">
        <el-button class="dashboard-button" type="primary">
          <div>
            <div class="button-title">Set</div>
            <div class="button-description">Managing User Identities</div>
          </div>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard'
}
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  background-color: #ffffff;
}

.centered-title {
  text-align: center;
}

.dashboard-buttons {
  margin-top: 20px;
}

.dashboard-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.dashboard-button {
  width: 100%;
  max-width: 66%;
  background-color: #ffffff;
  border: 1px solid #6f2f0a;
  color: #6f2f0a;
  text-align: left;
  border-radius: 0; /* 移除圆角 */
  height: 80px; /* 适当增加按钮高度 */
}

.button-title {
  font-size: 18px;
  font-weight: bold;
  color: #5c1e01; /* 更深的棕色 */
}

.button-description {
  font-size: 14px;
  color: #a66a54; /* 浅棕色 */
}
</style>
