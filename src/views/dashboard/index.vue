<template>
  <div class="dashboard-container">
    <component :is="currentRoleComponent" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import coordinatorDashboard from './coordinator'
import studentDashboard from './student'
import tutorDashboard from './tutor'
import clientDashboard from './client'

export default {
  name: 'Dashboard',
  components: {
    adminDashboard,
    coordinatorDashboard,
    studentDashboard,
    tutorDashboard,
    clientDashboard
  },
  data() {
    return {
      currentRoleComponent: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    this.setCurrentRoleComponent()
  },
  methods: {
    setCurrentRoleComponent() {
      if (this.roles.includes('admin')) {
        this.currentRoleComponent = 'adminDashboard'
      } else if (this.roles.includes('coordinator')) {
        this.currentRoleComponent = 'coordinatorDashboard'
      } else if (this.roles.includes('student')) {
        this.currentRoleComponent = 'studentDashboard'
      } else if (this.roles.includes('tutor')) {
        this.currentRoleComponent = 'tutorDashboard'
      } else if (this.roles.includes('client')) {
        this.currentRoleComponent = 'clientDashboard'
      }
    }
  }
}
</script>

<style>
.dashboard-container {
  padding: 20px;
}
</style>
