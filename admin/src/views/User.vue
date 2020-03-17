<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户表管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="userId" label="userId" width="150" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" width="100"></el-table-column>
        <el-table-column prop="password" label="用户密码"></el-table-column>
        <el-table-column prop="name" label="用户昵称"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50"></el-table-column>
        <el-table-column prop="avatarPath" label="用户头像路径"></el-table-column>
        <el-table-column prop="roleId" label="用户权限"></el-table-column>
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
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="用户头像路径">
          <el-input v-model="form.avatarPath"></el-input>
        </el-form-item>
        <el-form-item label="用户权限">
          <el-input v-model="form.roleId"></el-input>
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
import { fetchUserList, updateUserMes, deleteUser } from '../api/user'

export default {
  name: 'userList',
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
      const result = await fetchUserList(this.query)

      this.tableData = result.value
      this.pageTotal = result.pageTotal || 50
    },
    // 删除操作
    handleDelete(index) {
      let uname = this.tableData[index]['username']

      // 二次确认删除
      this.$confirm(`确定要删除username为${uname}这条数据吗？`, '提示', {
        type: 'warning',
      })
        .then(async () => {
          const result = await deleteUser({ username: uname })

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
    // 新增
    handleAdd() {
      this.editVisible = true
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index
      this.form = row
      this.editVisible = true
    },
    // 保存编辑
    async saveEdit() {
      let result = await updateUserMes(this.form)

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
