<template>
  <div class="student">
    <el-button type="primary"
               @click="addStudent">新增同学</el-button>
    <el-table :data="tableData"
              style="width: 1200px">
      <el-table-column prop="id"
                       label="编号"
                       width="60">
      </el-table-column>
      <el-table-column prop="ctime"
                       label="日期"
                       width="180">
      </el-table-column>
      <el-table-column prop="title"
                       label="班级"
                       width="130">
      </el-table-column>
      <el-table-column prop="author"
                       label="姓名"
                       width="80">
      </el-table-column>
      <el-table-column prop="source"
                       label="地址">
      </el-table-column>
      <el-table-column prop="content"
                       label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   layout="total, sizes, prev, pager, next, jumper"
                   :page-sizes="[10, 20, 30]"
                   :page-size="pageSize">
    </el-pagination>
    <Dialog :isDialog="dialogVisible"
            @closeD="dialogVisible=false"
            @resetList="getData()" />
    <Detail :isDetail="detailVisible"
            @closeDetail="detailVisible=false"
            :studentDetail="stuDetail"
            @resetList="getData()" />
  </div>
</template>

<script>
import Dialog from "./components/Dialog"
import Detail from "./components/Detail"
import { getList,delStudent } from './api'
import moment from 'moment'
export default {
  components: {
    Dialog,
    Detail
  },
  data () {
    return {
      tableData: [

      ],
      dialogVisible: false,
      detailVisible: false,
      currentPage: 1,
      total: 10,
      pageSize: 10,
      stuDetail: {}
    }
  },
  methods: {
    addStudent () {
      this.dialogVisible=true
    },

    handleEdit (v,i) {
      this.detailVisible=true
      this.stuDetail=i
    },
    handleDelete (v,i) {
      this.$confirm('此操作将永久删除该学生信息, 是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { errCode }=await delStudent({ id: i.id })
        if(errCode===0) {
          this.$message({
            type: 'success',
            message: '删除信息成功!'
          });
          this.getData()
        } else {
          this.$message.error('删除失败')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange (v) {
      this.pageSize=v;
      this.getData()
    },
    handleCurrentChange (v) {
      this.currentPage=v
      this.getData()
    },
    async getData () {
      let { total,data }=await getList({ currentPage: this.currentPage,pageSize: this.pageSize })
      this.total=total
      data.forEach(v => {
        v.ctime=moment(v.ctime).format('YYYY-MM-DD HH:MM:SS')
      })
      this.tableData=data.reverse()
    }
  },
  created () {
    this.getData()
  },
}
</script>

<style lang="less" scoped>
</style>