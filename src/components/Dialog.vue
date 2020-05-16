<template>
  <div class="dialog">
    <el-dialog title="新增同学"
               :visible.sync="isDialog"
               width="40%"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               style="width:300px"
               label-width="60px">
        <el-form-item label="班级"
                      prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="名字"
                      prop="author">
          <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>
        <el-form-item label="地址"
                      prop="source">
          <el-input v-model="ruleForm.source"></el-input>
        </el-form-item>
        <el-form-item label="备注"
                      prop="content">
          <el-input v-model="ruleForm.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary"
                   @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addStudent } from '@/api'
export default {
  props: ['isDialog'],
  data () {
    const checkTitle=(rule,val,callback) => {
      let reg=/^[\u4E00-\u9FA5A-Za-z0-9]{1,10}$/
      if(!val) {
        callback(new Error('班级不能为空'))
      } else if(!reg.test(val)) {
        callback(new Error('1~10位 (中文、英文、数字、不包括符号)'))
      } else {
        callback()
      }
    }
    const checkAuthor=(rule,val,callback) => {
      let reg=/^[\u4E00-\u9FA5A-Za-z0-9]{1,10}$/
      if(!val) {
        callback(new Error('姓名不能为空'))
      } else if(!reg.test(val)) {
        callback(new Error('1~10位 (中文、英文、数字、不包括符号)'))
      } else {
        callback()
      }
    }
    const checkSource=(rule,val,callback) => {
      let reg=/^[\u4E00-\u9FA5A-Za-z0-9]+$/
      if(!val) {
        callback(new Error('地址不能为空'))
      } else if(!reg.test(val)) {
        callback(new Error('中文、英文、数字但不包括下划线等符号'))
      } else {
        callback()
      }
    }
    const checkContent=(rule,val,callback) => {
      let reg=/^[\u4E00-\u9FA5A-Za-z0-9]+$/
      if(!val) {
        callback(new Error('备注不能为空'))
      } else if(!reg.test(val)) {
        callback(new Error('中文、英文、数字但不包括下划线等符号'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        title: { required: true,validator: checkTitle,trigger: 'blur' },
        author: { required: true,validator: checkAuthor,trigger: 'blur' },
        source: { required: true,validator: checkSource,trigger: 'blur' },
        content: { required: true,validator: checkContent,trigger: 'blur' }
      },
      ruleForm: {
        title: '',
        author: '',
        source: '',
        content: '',
      },
      dialogVisible: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeD')
    },
    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        if(valid) {
          let { errCode,msg }=await addStudent(this.ruleForm)
          if(errCode===0) {
            this.$message({ message: '恭喜你，添加成功',type: 'success' })
            this.$refs.ruleForm.resetFields()
            this.$emit('resetList')
          }
        } else {
          this.$message.error('请正确输入内容')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>