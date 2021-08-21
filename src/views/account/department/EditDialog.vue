<template>
  <el-dialog :title="isUpdate ? '修改部门' : '添加部门'" v-model="thisVisible" width="600px">
    <el-form ref="editFormRef" :model="editForm" :rules="editFormRule" label-width="100px" v-loading="editFormLoading">
      <el-form-item label="部门名称：" prop="name">
        <el-input v-model.trim="editForm.name" placeholder="请填写部门名称"></el-input>
      </el-form-item>
      sss-{{editForm.parentId}}
      <el-form-item label="上级部门：" prop="parentLabel">
        <el-select v-model="editForm.parentLabel"
          style="width: 100%;"
          clearable placeholder="请选择"
          @clear="handleClearParent">
          <el-option value="null">
            <el-tree :data="treeData"
              ref="treeRef"
              highlight-current
              node-key="id"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"></el-tree>
              <!-- :current-node-key="editForm.parentId" -->
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input-number v-model="editForm.sort" :min="1" :max="120" :precision="0"></el-input-number>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <r-select-button-group v-model="editForm.status" :list="useStopStatusList"></r-select-button-group>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model.trim="editForm.remark" placeholder="请填写"></el-input>
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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
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
    const store = useStore()

    const treeRef = ref(null)
    const defaultForm = {
      action: 'add',
      name: '',
      parentId: '',
      parentLabel: '',
      sort: 1,
      status: 1,
      remark: '',
    }
    const editFormRule = {
      name: [
        { required: true, type: 'string', message: '请填写部门名称', trigger: 'blur' },
      ],
      sort: [
        { required: true, type: 'number', message: '请填写排序', trigger: 'blur' },
      ],
      status: [
        { required: true, type: 'number', message: '请选择状态', trigger: 'change' },
      ],
    }

    const handleAddData = (form) => {
      // 这里传过来的是form数据，可以重新组装
      const data = {
        name: form.name,
        parentId: form.parentId || null,
        sort: form.sort,
        status: form.status,
        remark: form.remark,
      }
      return addDepartment(data)
    }
    const handleUpdateData = (id, form) => {
      const data = {
        name: form.name,
        parentId: form.parentId || null,
        sort: form.sort,
        status: form.status,
        remark: form.remark,
      }
      return updateDepartment(id, data)
    }
    // 可选函数，用于初始化update数据
    const handleInitUpdateData = (data) => {
      // 设置选中父菜单，顶级需要设置为 null
      setTreeCurrent(data.parentId || null)
      return data
    }
    // 打开添加弹框做一些操作
    const handleInitAddData = () => {
      setTreeCurrent(null)
    }

    // 设置当前选中的树节点
    const setTreeCurrent = (nodeId) => {
      treeRef.value && treeRef.value.setCurrentKey(nodeId, true)
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
    } = useTableEditDialog({ props, emit, defaultForm, handleInitAddData, handleInitUpdateData, handleAddData, handleUpdateData })

    const treeData = computed(() => {
      return store.state.resource.departmentTree
    })
    const handleNodeClick = (item) => {
      console.log('item', item)
      editForm.value.parentId = item.id
      editForm.value.parentLabel = item.label
    }
    const handleClearParent = () => {
      editForm.value.parentId = ''
      editForm.value.parentLabel = ''
      setTreeCurrent(null)
    }

    return {
      treeRef,
      treeData,
      handleNodeClick,
      handleClearParent,

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
