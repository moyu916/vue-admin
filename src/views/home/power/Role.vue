<template>
  <div class="role">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <div slot="header" class="add">
        <el-button type="primary">添加角色</el-button>
      </div>
      <!-- 角色列表区域 -->
      <el-table :data="rolelist" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']" :gutter="10" v-for="(item1, i1) in scope.row.children" :key="item1.id">
              <!-- 一级权限 -->
              <el-col :span="6">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级权限 -->
              <el-col :span="18">
                <!-- 通过 for 循环 嵌套渲染二级权限 -->
                <el-row :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" closable @close="removeRightById(scope.row, item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>

              </el-col>
            </el-row>
            <!-- <pre>
              {{scope.row}}
            </pre> -->
            
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed">
      <!-- 树形控件 -->
      <!-- <el-tree :data="rightslist" :props="treeProps" show-checkbox  default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree> -->
      <li-tree :data="rightslist"  :prop="treeProps" showCheckbox ref="treeRef" :default_checked_keys="defKeys"
                @on-toggle-expand="handleToggleExpand" 
                @on-check-change="handleCheckChange"
                ></li-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getRolelist_req, deleteAuth_req, getAuthTree_req, allotAuth_req } from '@/network/authority'
import LiTree from '@/components/tree/LiTree.vue'
export default {
  components: { LiTree },
  name: 'Role',
  data() {
    return {
      // 所有角色列表数据
      rolelist: [],
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      // 所有权限的数据
      rightslist: [],
      // 树形控件的属性绑定对象
      // treeProps: {
      //   label: 'authName',
      //   children: 'children'
      // },
      treeProps: 'authName',
      // 默认选中的节点Id值数组
      defKeys: [],
      // 当前即将分配权限的角色id
      roleId: '',

      // 提交checked数据
      keys: []
    }
  },
  created() {
    this.getRolelist()
  },
  methods: {
        handleToggleExpand (data) {
            console.log(data);
        },
        handleCheckChange (data) {
            console.log(data);
            if(data.checked) {
              this.keys.push(data.id)
            }
            else{
              this.keys.splice(this.keys.indexOf(data.id),1)
            }
        },
        // // 非第三级节点的 被动选中
        // handleFaChecked (data) {
        //   this.keys.push(data.id)
        // },
    // 获取所有角色的列表
    async getRolelist() {
      const { data: res } = await getRolelist_req()
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.rolelist = res.data
      
      // console.log(this.rolelist)
    },
    // 根据Id删除对应的权限
    async removeRightById(roleId, rightId) {
      // 弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除！')
      }

      const { data: res } = await deleteAuth_req(roleId, rightId)

      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败！')
      }

      // this.getRolesList()
      roleId.children = res.data      
    },
    // 展示分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role.id

      const { data: res } = await getAuthTree_req()

      if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败！')
      }

      // 把获取到的权限数据保存到 data 中
      this.rightslist = res.data
      // console.log(this.rightslist)

      // 递归获取三级节点的Id
      this.getLeafKeys(role, this.defKeys)  
      this.keys = this.defKeys    

      this.setRightDialogVisible = true
      // console.log(this.defKeys)
    },
    // 通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys 数组中
    getLeafKeys(node, arr) {
      // 如果当前 node 节点不包含 children 属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }

      node.children.forEach(item => this.getLeafKeys(item, arr))
    },    

    // 监听分配权限对话框的关闭事件
    setRightDialogClosed() {
      this.defKeys = []
    },
    
    // 点击为角色分配权限
    async allotRights() {
      // const keys = [
      //   ...this.$refs.treeRef.getCheckedKeys(),
      //   ...this.$refs.treeRef.getHalfCheckedKeys()
      // ]

      const idStr = this.keys.join(',')
      console.log(idStr)

      
      const { data: res } = await allotAuth_req(this.roleId, {rids: idStr})
      // console.log(res)

      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败！')
      }

      this.$message.success('分配权限成功！')
      this.getRolelist()
      this.setRightDialogVisible = false      
      
    }    
  }
}
</script>

<style lang="sass" scoped>
.el-card
  margin-top: 15px
  .add
    text-align: left
  .el-tag
    margin: 15px 5px

.bdtop 
  border-top: 1px solid #eee

.bdbottom 
  border-bottom: 1px solid #eee

.vcenter 
  display: flex
  align-items: center
</style>