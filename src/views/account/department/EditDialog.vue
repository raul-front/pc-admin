<template>
  <el-dialog :title="isUpdate ? '修改权限' : '添加权限'" v-model="thisVisible" width="600px">
    <el-form ref="editFormRef" :model="editForm" :rules="editFormRule" label-width="100px" v-loading="editFormLoading">
      <el-form-item label="部门名称：" prop="name">
        <el-input v-model.trim="editForm.name" placeholder="请填写部门名称"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="order">
        <el-input-number v-model="editForm.order" :min="1" :max="120" :precision="0"></el-input-number>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <r-select-button-group v-model="editForm.status" :list="useStopStatusList"></r-select-button-group>
      </el-form-item>
      <el-form-item label="备注：" prop="ramark">
        <el-input v-model.trim="editForm.ramark" placeholder="请填写"></el-input>
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
import { addDepartment, updateDepartment } from 'api/account'
import { useStopStatusData } from '@/filter/const'
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
      name: '',
      order: 1,
      status: 1,
      remark: '',
    }
    const editFormRule = {
      name: [
        { required: true, type: 'string', message: '请填写部门名称', trigger: 'blur' },
      ],
      order: [
        { required: true, type: 'number', message: '请填写排序', trigger: 'blur' },
      ],
      status: [
        { required: true, type: 'number', message: '请选择状态', trigger: 'change' },
      ],
    }

    const handleAddData = (data) => {
      // 这里传过来的是form数据，可以重新组装
      return addDepartment(data)
    }
    const handleUpdateData = (id, data) => {
      return updateDepartment(id, data)
    }
    // 可选函数，用于初始化update数据
    const handleInitUpdateData = (data) => {
      return data
    }

    const useStopStatusList = constDataToArray(useStopStatusData, null, true)

    const {
      editFormRef,
      thisVisible,
      editForm,
      isUpdate,
      editFormLoading,
      submitBtnLoading,
      handleCloseDialog,
      handleSubmitForm,
    } = useTableEditDialog({ props, emit, defaultForm, handleInitUpdateData, handleAddData, handleUpdateData })

    return {
      useStopStatusList,
      editFormRef,
      thisVisible,
      isUpdate,
      editForm,
      editFormRule,
      editFormLoading,
      submitBtnLoading,
      handleCloseDialog,
      handleSubmitForm,
    }
  },
}
</script>
<style lang="scss">
</style>
