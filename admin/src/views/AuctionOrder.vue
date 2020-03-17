<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 拍品订单表管理
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
        <el-table-column prop="id" label="订单号" width="150" align="center"></el-table-column>
        <el-table-column prop="aucId" label="拍品id" width="150" align="center"></el-table-column>
        <el-table-column prop="userId" label="用户id"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
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

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="id">
          <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="form.state"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchAuctionOrderList, updateAuctionOrderMes, deleteAuctionOrderMes } from '../api/auctionOrder'

export default {
  name: 'auctionOrderList',
  data() {
    return {
      query: {
        page: 1,
        size: 10,
      },
      tableData: [],
      editVisible: false,
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
      const result = await fetchAuctionOrderList(this.query)

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
          const result = await deleteAuctionOrderMes({ id: id })

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
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index
      this.form = row
      this.editVisible = true
    },
    // 保存编辑
    async saveEdit() {
      let result = await updateAuctionOrderMes(this.form)

      if (result.code === -1) {
        this.$message.success('保存成功')
      } else {
        this.$message.error('修改失败')
      }
      this.getData()
      this.editVisible = false
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
