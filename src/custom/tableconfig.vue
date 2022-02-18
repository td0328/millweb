<template>
  <div style="height: 100%;width: 100%;">
    <div style="padding-bottom: 20px;width: 100%;">
      <div style="background-color: #ffffff;width: 100%;height: 100%;height: 65px;">
        <el-form :inline="true" :rules="dataLinkRules" :model="dataLink" ref="dataLink" class="demo-form-inline" style="text-align: left;position: relative;top:50%;left: 10px;transform:translateY(-50%);">
          <el-form-item prop="address" label="IP地址" style="margin-bottom:0px;vertical-align:middle;">
            <el-input style="width: 130px;" v-model="dataLink.address" placeholder="IP地址"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="数据库名" style="margin-bottom:0px;vertical-align:middle;">
            <el-input style="width: 130px;" v-model="dataLink.name" placeholder="数据库名"></el-input>
          </el-form-item>
          <el-form-item prop="user" label="用户名" style="margin-bottom:0px;vertical-align:middle;">
            <el-input style="width: 130px;" v-model="dataLink.user" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码" style="margin-bottom:0px;vertical-align:middle;">
            <el-input style="width: 130px;" v-model="dataLink.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:0px;vertical-align:middle;">
            <el-button type="primary" @click="onDataLink('dataLink')" style="margin-right: 25px;float: right;">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="height:calc(100% - 85px);">
      <el-row :gutter="20" style="height: 100%">
        <el-col :span="8" style="height: 100%">
          <div class="grid-content bg-purple">
            <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                style="width: 100%;height: 100%;">
              <el-table-column property="name" label="表名" >
              </el-table-column>
              <el-table-column property="title" label="标题">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="8" style="height: 100%">
          <div class="grid-content bg-purple">
            <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                style="width: 100%;height: 100%;">
              <el-table-column property="name" label="列名" >
              </el-table-column>
              <el-table-column property="title" label="标题">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "tableconfig",
  data(){
    return {
      tableData:[],
      dataLink:{
        address:'',
        name:'',
        user:'',
        password:''
      },
      dataLinkRules: {
        address:[
          { required: true, message: '请输入ip地址', trigger: 'blur'},
        ],
        name:[
          { required: true, message: '请输入库名', trigger: 'blur'},
        ],
        user:[
          { required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur'},
        ]

      }
    }
  },
  methods:{
    onDataLink(dataLink) {
      this.$refs[dataLink].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  height: 100%;
}
</style>