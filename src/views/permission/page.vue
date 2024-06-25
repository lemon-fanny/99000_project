<!--<template>-->
<!--  <div class="app-container">-->
<!--    <switch-roles @change="handleRolesChange" />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import SwitchRoles from './components/SwitchRoles'-->

<!--export default {-->
<!--  name: 'PagePermission',-->
<!--  components: { SwitchRoles },-->
<!--  methods: {-->
<!--    handleRolesChange() {-->
<!--      this.$router.push({ path: '/permission/index?' + +new Date() })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<template>
  <div>
    <p>Your roles: {{ roles }}</p>
    <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">
      Admin can see this
      <el-tag class="permission-sourceCode" type="info">
        v-if="checkPermission(['admin'])
      </el-tag>
    </el-tab-pane>

    <el-tab-pane v-if="checkPermission(['coordinator'])" label="Coordinator">
      Coordinator can see this
      <el-tag class="permission-sourceCode" type="info">
        v-if="checkPermission(['coordinator'])
      </el-tag>
    </el-tab-pane>

    <el-tab-pane v-if="checkPermission(['student'])" label="Student">
      Student can see this
      <el-tag class="permission-sourceCode" type="info">
        v-if="checkPermission(['student'])
      </el-tag>
    </el-tab-pane>

    <el-tab-pane v-if="checkPermission(['tutor'])" label="Tutor">
      Tutor can see this
      <el-tag class="permission-sourceCode" type="info">
        v-if="checkPermission(['tutor'])
      </el-tag>
    </el-tab-pane>

    <el-tab-pane v-if="checkPermission(['client'])" label="Client">
      Client can see this
      <el-tag class="permission-sourceCode" type="info">
        v-if="checkPermission(['client'])
      </el-tag>
    </el-tab-pane>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'

export default {
  computed: {
    roles() {
      return this.$store.getters.roles
    }
  },
  methods: {
    checkPermission
  }
}
</script>
