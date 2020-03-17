<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 拍品表管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>-->
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="aucId" label="拍品id" width="150" align="center"></el-table-column>
        <el-table-column prop="name" label="拍品名称"></el-table-column>
        <el-table-column prop="price" label="拍品价格"></el-table-column>
        <el-table-column prop="provider" label="供应用户"></el-table-column>
        <el-table-column prop="state" label="拍品状态" width="50"></el-table-column>
        <el-table-column prop="ownerId" label="所有权用户id"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <!-- <el-table-column label="头像(查看大图)" align="center">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.thumb"
              :preview-src-list="[scope.row.thumb]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>-->
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
        <el-form-item label="拍品id">
          <el-input v-model="form.aucId"></el-input>
        </el-form-item>
        <el-form-item label="拍品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="拍品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="供应用户">
          <el-input v-model="form.provider"></el-input>
        </el-form-item>
        <el-form-item label="拍品状态">
          <el-input v-model="form.state"></el-input>
        </el-form-item>
        <el-form-item label="所有权用户id">
          <el-input v-model="form.ownerId"></el-input>
        </el-form-item>
        <el-date-picker
          v-model="form"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-form-item label="结束时间">
          <el-input v-model="form.endTime"></el-input>
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
import { fetchAuctionList, updateAuctionMes, deleteAuctionMes } from '../api/auction'

export default {
  name: 'auction',
  data() {
    return {
      query: {
        page: 1,
        size: 10,
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      sTime: {},
      eTime: {},
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData() {
      const result = await fetchAuctionList(this.query)

      this.tableData = result.value
      this.pageTotal = result.pageTotal || 50
    },
    // 删除操作
    handleDelete(index) {
      let aucId = this.tableData[index]['aucId']

      // 二次确认删除
      this.$confirm(`确定要删除aucId为${aucId}这条数据吗？`, '提示', {
        type: 'warning',
      })
        .then(async () => {
          const result = await deleteAuctionMes({ aucId: aucId })

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
    // // 触发搜索按钮
    // handleSearch() {
    //   this.$set(this.query, 'pageIndex', 1)
    //   this.getData()
    // },
    // // 多选操作
    // handleSelectionChange(val) {
    //   this.multipleSelection = val
    // },
    // delAllSelection() {
    //   const length = this.multipleSelection.length

    //   let str = ''

    //   this.delList = this.delList.concat(this.multipleSelection)
    //   for (let i = 0; i < length; i++) {
    //     str += `${this.multipleSelection[i].name} `
    //   }
    //   this.$message.error(`删除了${str}`)
    //   this.multipleSelection = []
    // },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index
      this.form = row
      this.editVisible = true
    },
    // 保存编辑
    async saveEdit() {
      let result = await updateAuctionMes(this.form)

      console.log(result)
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
