<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户收藏表管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="id" label="ID" align="center" width="100"></el-table-column>
        <el-table-column prop="aucId" label="拍品id"></el-table-column>
        <el-table-column prop="userId" label="用户id"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.page"
          :page-size="query.size"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchUserStarList, deleteUserStarMes } from '../api/userStar'

export default {
  name: 'userStarList',
  data() {
    return {
      query: {
        page: 1,
        size: 10,
      },
      tableData: [],
      pageTotal: 0,
      form: {},
      idx: -1,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData() {
      const result = await fetchUserStarList(this.query)

      this.tableData = result.value
      this.pageTotal = result.pageTotal || 50
    },
    // 删除操作
    handleDelete(index) {
      let id = this.tableData[index]['id']

      // 二次确认删除
      this.$confirm(`确定要删除id为${id}这条数据吗？`, '提示', {
        type: 'warning',
      })
        .then(async () => {
          const result = await deleteUserStarMes({ id: id })

          if (result.code === -1) {
            this.$message.success('删除成功')
            this.tableData.splice(index, 1)
          } else {
            this.$message.error('删除失败')
          }
          this.getData()
        })
        .catch(() => {})
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'page', val)
      this.getData()
    },
  },
}
</script>

<style lang='less' scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
