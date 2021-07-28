<template>
  <el-dialog :title="isUpdate ? '修改权限' : '添加权限'" v-model="thisVisible" width="600px">
    <el-form ref="editFormRef" :model="editForm" :rules="editFormRule" label-width="100px" v-loading="editFormLoading">
      <el-form-item label="权限类型：" prop="type">
        <r-select-button-group v-model="editForm.type" :list="accessTypeList"></r-select-button-group>
      </el-form-item>
      <el-form-item label="权限名称：" prop="name">
        <el-input v-model.trim="editForm.name" placeholder="请填写权限名称"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单：" prop="parentLabel">
        <el-select v-model="editForm.parentLabel" placeholder="请选择">
          <el-option value="null">
            <el-tree :data="treeData" @node-click="handleNodeClick"></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序：" prop="order">
        <el-input-number v-model="editForm.order" :min="1" :max="120" :precision="0"></el-input-number>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <r-select-button-group v-model="editForm.status" :list="accessStatusList"></r-select-button-group>
      </el-form-item>
      <el-form-item label="权限标识：" prop="tag">
        <el-input v-model.trim="editForm.tag" placeholder="请填写权限标识">
          <template #prepend>{{}}_</template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitForm" :loading="submitBtnLoading">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import useTableEditDialog from 'lisa/hooks/useTableEditDialog'
import { addUser, updateUser, getUser } from 'api/template'
import { accessTypeData } from '@/filter/const'
import { constDataToArray } from 'lisa/utils/func'

export default {
  props: {
    visible: Boolean,
    editData: Object,
    id: [Number, String],
  },
  emits: ['editSuccess', 'update:visible'],
  setup (props, { emit }) {
    const defaultForm = {
      action: 'add',
      type: 1,
      name: '',
      parentValue: '',
      parentLabel: '',
      order: 1,
      status: 1,
      tag: '',
    }
    const editFormRule = {
      type: [
        { required: true, type: 'number', message: '请选择菜单类型', trigger: 'change' },
      ],
      name: [
        { required: true, type: 'string', message: '请填写权限名称', trigger: 'blur' },
      ],
      parentLabel: [
        { required: true, type: 'string', message: '请选择父级菜单', trigger: 'change' },
      ],
      order: [
        { required: true, type: 'number', message: '请填写排序', trigger: 'blur' },
      ],
      status: [
        { required: true, type: 'number', message: '请选择状态', trigger: 'blur' },
      ],
      tag: [
        { required: true, type: 'string', message: '请填写权限标识', trigger: 'blur' },
      ],
    }

    const handleAddData = (data) => {
      // 这里传过来的是form数据，可以重新组装
      return addUser(data)
    }
    const handleUpdateData = (id, data) => {
      return updateUser(id, data)
    }
    // 可选函数，用于初始化update数据
    const handleInitUpdateData = (data) => {
      return data
    }
    const handleGetDetail = (id) => {
      return getUser(id).then(res => {
        // 这里可以处理数据，可以直接调handleInitUpdateData就不用传进入了
        return res.data
      })
    }

    const accessTypeList = constDataToArray(accessTypeData, null, true)
    const accessStatusList = [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ]

    const {
      editFormRef,
      thisVisible,
      editForm,
      isUpdate,
      editFormLoading,
      submitBtnLoading,
      handleCloseDialog,
      handleSubmitForm,
    } = useTableEditDialog({ props, emit, defaultForm, handleInitUpdateData, handleAddData, handleUpdateData, handleGetDetail })

    const handleNodeClick = (item) => {
      console.log('vv', item.value)
      editForm.value.parentValue = item.value
      editForm.value.parentLabel = item.label
    }

    return {
      accessTypeList,
      accessStatusList,
      editFormRef,
      thisVisible,
      isUpdate,
      editForm,
      editFormRule,
      editFormLoading,
      submitBtnLoading,
      handleCloseDialog,
      handleSubmitForm,

      handleNodeClick,
      treeData: [{
        label: '首页',
        value: 'Home',
      }, {
        label: '员工管理',
        value: 'Account',
        children: [
          {
            label: '部门',
            value: 'Department',
            children: [{
              label: '添加',
              value: 'Add',
            }, {
              label: '修改',
              value: 'Update',
            }],
          },
          {
            label: '员工',
            value: 'Employee',
            children: [{
              label: '添加',
              value: 'Add',
            }, {
              label: '修改',
              value: 'Update',
            }],
          },
          {
            label: '权限',
            value: 'Access',
            children: [{
              label: '添加',
              value: 'Add',
            }, {
              label: '修改',
              value: 'Update',
            }],
          },
        ],
      }, {
        label: '模板页面',
        value: 'Template',
        children: [{
          label: '列表页',
          value: 'List',
          children: [{
            label: '添加',
            value: 'Add',
          }],
        }],
      }],
    }
  },
}
</script>
<style lang="scss">

.el-select-dropdown__item{
  height: auto;
}
.el-select-dropdown__item:hover{
  background: transparent;
}
.is-current>.el-tree-node__content{
  background: $color-primary-light !important;
  color: #fff !important;
}

</style>
