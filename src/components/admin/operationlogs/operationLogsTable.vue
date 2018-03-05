<template>
  <div>
    <table class="table table-hover">
      <thead class="table-active">
        <th>序号</th>
        <th>操作时间</th>
        <th>描述</th>
      </thead>
      <tbody v-if="operationLogs.length > 0">
        <tr v-for="operationLog of operationLogs" :key="operationLog.id">
          <td>{{operationLog.id}}</td>
          <td>{{operationLog.operationDate | transformTime}}</td>
          <td>{{operationLog.remark}}</td>
        </tr>
      </tbody>
      <tbody v-if="operationLogs.length === 0">
        <tr>
          <td colspan="3" class="text-center">没有数据</td>
        </tr>
      </tbody>
    </table>

    <div v-if="totalPage > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage($event)"
        :page-count="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'operation-logs-table',
  props: {
    totalPage: Number,
    operationLogs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    changePage (val) {
      this.currentPage = val
      this.$emit('selectPage', this.currentPage)
    }
  }
}
</script>

<style>

</style>
